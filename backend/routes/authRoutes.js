const express = require('express');
const router = express.Router();
const { registerUser, loginUser, socialAuth } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/social', socialAuth);

module.exports = router;
