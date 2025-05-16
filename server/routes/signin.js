const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // نموذج المستخدم
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // تحقق من وجود البريد وكلمة المرور
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    // البحث عن المستخدم بالبريد الإلكتروني
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // التحقق من صحة كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // توليد توكن JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
