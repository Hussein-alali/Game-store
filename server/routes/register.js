const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('age').isInt({ min: 13 }).withMessage('Age must be at least 13'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('country').notEmpty().withMessage('Country is required')
];

// Regular user registration
router.post('/', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, username, email, password, age, gender, country } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email: email },
        { username: username }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken' 
      });
    }

    // Create new user (always as non-admin)
    const user = new User({
      fullName,
      username,
      email,
      password,
      age,
      gender,
      country,
      isAdmin: false // Ensure regular registration creates non-admin users
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Admin route to create users (including admins)
router.post('/admin/create', auth, admin, registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, username, email, password, age, gender, country, isAdmin } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email: email },
        { username: username }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken' 
      });
    }

    // Create new user (can be admin if specified)
    const user = new User({
      fullName,
      username,
      email,
      password,
      age,
      gender,
      country,
      isAdmin: !!isAdmin // Convert to boolean, default is false if not specified
    });

    await user.save();
    res.status(201).json({ 
      message: 'User created successfully',
      isAdmin: user.isAdmin
    });

  } catch (error) {
    console.error('Admin user creation error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

module.exports = router;
