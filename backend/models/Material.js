const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String }, // Cloudinary public_id for deletion
  filename: { type: String, required: true },
  fileType: { type: String, enum: ['image', 'pdf'], default: 'image' }
});

const materialSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
    enum: ['eee', 'ca', 'compiler', 'sad']
  },
  examType: {
    type: String,
    required: true,
    enum: ['mid', 'final']
  },
  segment: {
    type: String,
    required: true,
    trim: true
  },
  contentType: {
    type: String,
    required: true,
    enum: ['pdf', 'handnote', 'slides', 'topper-note', 'suggestion', 'pq-solve']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  files: [fileSchema],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for segment-specific queries
materialSchema.index({ course: 1, segment: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model('Material', materialSchema);
