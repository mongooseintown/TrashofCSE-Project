const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_trashofcse_12345';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isAdminEmail = normalizedEmail === 'khaledbinnasir1714412140@gmail.com';
    const iiucEmailRegex = /^c\d+@ugrad\.iiuc\.ac\.bd$/i;

    // Validate admin password during registration
    if (isAdminEmail && password !== 'theorydestructor1029@#$%') {
      return res.status(400).json({ message: 'Incorrect admin registration password' });
    }

    // Strictly validate student domain emails for all other accounts
    if (!isAdminEmail && !iiucEmailRegex.test(normalizedEmail)) {
      return res.status(400).json({ 
        message: 'Only IIUC student email addresses (cXXXXXX@ugrad.iiuc.ac.bd) are allowed to create an account' 
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      fullName,
      email: normalizedEmail,
      password: hashedPassword,
      isAdmin: isAdminEmail
    });

    if (user) {
      // Generate token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
        semester: user.semester || '',
        department: user.department || '',
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data received' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter both email and password' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isAdminEmail = normalizedEmail === 'khaledbinnasir1714412140@gmail.com';
    const iiucEmailRegex = /^c\d+@ugrad\.iiuc\.ac\.bd$/i;

    // Validate email format
    if (!isAdminEmail && !iiucEmailRegex.test(normalizedEmail)) {
      return res.status(400).json({ 
        message: 'Invalid email format. Only IIUC student emails (cXXXXXX@ugrad.iiuc.ac.bd) are allowed' 
      });
    }

    // Auto-provision admin user if logging in with valid admin details and account doesn't exist
    if (isAdminEmail && password === 'theorydestructor1029@#$%') {
      let adminUser = await User.findOne({ email: normalizedEmail });
      if (!adminUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({
          fullName: 'Admin Khaled',
          email: normalizedEmail,
          password: hashedPassword,
          isAdmin: true
        });
      }
    }

    // Check for user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      semester: user.semester || '',
      department: user.department || '',
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// @desc    Authenticate/Register user via social credentials
// @route   POST /api/auth/social
// @access  Public
exports.socialAuth = async (req, res) => {
  try {
    const { email, fullName } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isAdminEmail = normalizedEmail === 'khaledbinnasir1714412140@gmail.com';
    const iiucEmailRegex = /^c\d+@ugrad\.iiuc\.ac\.bd$/i;

    // Strictly validate student domain emails for all other accounts
    if (!isAdminEmail && !iiucEmailRegex.test(normalizedEmail)) {
      return res.status(400).json({ 
        message: 'Only IIUC student email addresses (cXXXXXX@ugrad.iiuc.ac.bd) are allowed' 
      });
    }

    // Find or automatically create user
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('social_auth_bypass_placeholder_password_1029!', salt);
      user = await User.create({
        fullName: fullName || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        password: hashedPassword,
        isAdmin: isAdminEmail
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      semester: user.semester || '',
      department: user.department || '',
      token,
    });
  } catch (error) {
    console.error('Social Auth error:', error);
    res.status(500).json({ message: 'Server error during social authentication', error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
        department: user.department || '',
        semester: user.semester || '',
        createdAt: user.createdAt,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get Profile error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // If password update is requested
      if (req.body.password) {
        if (!req.body.currentPassword) {
          return res.status(400).json({ message: 'Please provide current password to update password' });
        }

        const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Incorrect current password' });
        }

        if (req.body.password.length < 6) {
          return res.status(400).json({ message: 'New password must be at least 6 characters long' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      user.fullName = req.body.fullName || user.fullName;
      user.department = req.body.department !== undefined ? req.body.department : user.department;
      user.semester = req.body.semester !== undefined ? req.body.semester : user.semester;

      const updatedUser = await user.save();

      // Generate refreshed token
      const token = jwt.sign({ id: updatedUser._id }, JWT_SECRET, { expiresIn: '30d' });

      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        department: updatedUser.department,
        semester: updatedUser.semester,
        token,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update Profile error:', error);
    res.status(500).json({ message: 'Server error updating profile', error: error.message });
  }
};
