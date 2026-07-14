const Material = require('../models/Material');
const Notification = require('../models/Notification');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

// Course display labels
const COURSE_LABELS = {
  eee: 'EEE-2421',
  ca: 'CSE-3523 (CA)',
  compiler: 'CSE-3527 (Compiler)',
  sad: 'CSE-3611 (SAD)'
};

// Content type display labels
const TYPE_LABELS = {
  pdf: "Sir's PDF",
  handnote: 'Handnote',
  slides: 'Slides',
  'topper-note': 'Topper Note',
  suggestion: 'Suggestion',
  'pq-solve': 'Prev. Question Solve'
};

// @desc    Get materials filtered by course, segment, status
// @route   GET /api/materials
// @access  Private
exports.getMaterials = async (req, res) => {
  try {
    const filter = {};
    if (req.query.course) filter.course = req.query.course;
    if (req.query.segment) filter.segment = req.query.segment;
    if (req.query.examType) filter.examType = req.query.examType;
    if (req.query.contentType) filter.contentType = req.query.contentType;

    const isPrivileged = req.user.isAdmin || req.user.isModerator;

    // Standard users can only fetch approved materials
    if (req.query.status && isPrivileged) {
      filter.status = req.query.status;
    } else if (!isPrivileged) {
      filter.status = 'approved';
    } else {
      // By default for privileged users, get approved unless specified
      if (!req.query.course && !req.query.segment) {
        // dashboard review queue check
        filter.status = req.query.status || 'approved';
      } else {
        filter.status = 'approved';
      }
    }

    const materials = await Material.find(filter)
      .populate('uploadedBy', 'fullName email')
      .sort({ createdAt: -1 });

    res.json(materials);
  } catch (error) {
    console.error('Get materials error:', error);
    res.status(500).json({ message: 'Server error retrieving materials', error: error.message });
  }
};

// @desc    Create a new material upload
// @route   POST /api/materials
// @access  Private
exports.createMaterial = async (req, res) => {
  try {
    const { course, examType, segment, contentType, title, description } = req.body;
    const files = req.files;

    if (!course || !examType || !segment || !contentType || !title) {
      // Clean up uploaded files in local temp if validation fails
      if (files && files.length > 0) {
        files.forEach(f => { if (fs.existsSync(f.path)) fs.unlinkSync(f.path); });
      }
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one file' });
    }

    const isPrivileged = req.user.isAdmin || req.user.isModerator;
    const status = isPrivileged ? 'approved' : 'pending';

    const uploadedFiles = [];

    // Upload each local file to Cloudinary
    for (const file of files) {
      const fileExt = path.extname(file.originalname).toLowerCase();
      const isPdf = fileExt === '.pdf';
      const fileType = isPdf ? 'pdf' : 'image';

      try {
        const folder = `trashofcse/${course}/seg${segment}`;
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder,
          resource_type: 'auto',
          public_id: `${contentType}_${Date.now()}`
        });

        uploadedFiles.push({
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          filename: file.originalname,
          fileType
        });
      } catch (uploadErr) {
        console.error('Cloudinary single file upload error:', uploadErr);
      } finally {
        // Delete local temp file
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }

    if (uploadedFiles.length === 0) {
      return res.status(500).json({ message: 'Failed to upload files to cloud storage' });
    }

    const material = await Material.create({
      course,
      examType,
      segment,
      contentType,
      title,
      description: description || '',
      files: uploadedFiles,
      status,
      uploadedBy: req.user._id
    });

    // Auto-create notification if approved immediately
    if (status === 'approved') {
      try {
        const courseLabel = COURSE_LABELS[course] || course.toUpperCase();
        const typeLabel = TYPE_LABELS[contentType] || contentType;
        await Notification.create({
          type: 'upload',
          title: `New ${typeLabel} Added!`,
          message: `${title} — ${courseLabel} Segment ${segment}`,
          category: courseLabel
        });
      } catch (notifErr) {
        console.error('Auto notification failed:', notifErr);
      }
    }

    res.status(201).json(material);
  } catch (error) {
    console.error('Create material error:', error);
    res.status(500).json({ message: 'Server error creating material', error: error.message });
  }
};

// @desc    Update material status (Approve / Reject)
// @route   PUT /api/materials/:id/status
// @access  Admin/Moderator Only
exports.updateMaterialStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const material = await Material.findById(req.params.id).populate('uploadedBy', 'fullName');
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    if (status === 'rejected') {
      // Clean up Cloudinary files
      for (const file of material.files) {
        if (file.publicId) {
          try {
            await cloudinary.uploader.destroy(file.publicId);
          } catch (e) {
            console.error('Cloudinary destroy error:', e);
          }
        }
      }
      await Material.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Contribution rejected and deleted', id: req.params.id });
    }

    // Approve
    material.status = 'approved';
    await material.save();

    // Create Notification on approval
    try {
      const courseLabel = COURSE_LABELS[material.course] || material.course.toUpperCase();
      const typeLabel = TYPE_LABELS[material.contentType] || material.contentType;
      await Notification.create({
        type: 'upload',
        title: `New ${typeLabel} Added!`,
        message: `${material.title} (Contributor: ${material.uploadedBy.fullName}) — ${courseLabel} Segment ${material.segment}`,
        category: courseLabel
      });
    } catch (notifErr) {
      console.error('Approval notification failed:', notifErr);
    }

    res.json(material);
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error updating status', error: error.message });
  }
};

// @desc    Delete a material
// @route   DELETE /api/materials/:id
// @access  Private (Owner, Admin or Moderator)
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    const isPrivileged = req.user.isAdmin || req.user.isModerator;
    const isOwner = material.uploadedBy.toString() === req.user._id.toString();

    if (!isPrivileged && !isOwner) {
      return res.status(403).json({ message: 'Unauthorized to delete this material' });
    }

    // Clean up Cloudinary files
    for (const file of material.files) {
      if (file.publicId) {
        try {
          await cloudinary.uploader.destroy(file.publicId);
        } catch (e) {
          console.error('Cloudinary destroy error:', e);
        }
      }
    }

    await Material.findByIdAndDelete(req.params.id);
    res.json({ message: 'Material deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Delete material error:', error);
    res.status(500).json({ message: 'Server error deleting material', error: error.message });
  }
};
