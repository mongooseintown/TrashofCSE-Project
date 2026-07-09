const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  socialAuth, 
  getUserProfile, 
  updateUserProfile,
  updateHeartbeat,
  getActiveUsers,
  logoutUser
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/social', socialAuth);

// Active users tracking (Protected)
router.post('/heartbeat', protect, updateHeartbeat);
router.get('/active-users', protect, getActiveUsers);
router.post('/logout', protect, logoutUser);

// Profile routes (Protected)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
