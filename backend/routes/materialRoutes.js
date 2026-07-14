const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { protect, privileged } = require('../middleware/authMiddleware');
const {
  getMaterials,
  createMaterial,
  updateMaterialStatus,
  deleteMaterial
} = require('../controllers/materialController');

// Ensure temp_uploads folder exists in the project workspace
const tempUploadsDir = path.join(__dirname, '../temp_uploads');
if (!fs.existsSync(tempUploadsDir)) {
  fs.mkdirSync(tempUploadsDir, { recursive: true });
}

// Multer upload configurations (stores files temporarily locally)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempUploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max limit per file
});

// GET: Fetch notes/materials
router.get('/', protect, getMaterials);

// POST: Upload notes/materials (supports multiple images or PDFs)
router.post('/', protect, upload.array('files', 15), createMaterial);

// PUT: Approve / Reject contributions (Admin/Moderator only)
router.put('/:id/status', protect, privileged, updateMaterialStatus);

// DELETE: Remove material
router.delete('/:id', protect, deleteMaterial);

module.exports = router;
