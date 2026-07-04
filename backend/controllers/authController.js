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
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data received' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
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
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
