const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // نموذج المستخدم (mongoose)
const jwt = require('jsonwebtoken'); // لو تريد تستخدم JWT (اختياري)

// مسار تسجيل مستخدم جديد
router.post('/', async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword, age, gender, country } = req.body;

    // تحقق من وجود كل الحقول
    if (!fullName || !username || !email || !password || !confirmPassword || !age || !gender || !country) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // تحقق من تطابق كلمة المرور
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // تحقق إذا كان المستخدم موجود أصلاً
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      age,
      gender,
      country,
    });

    await newUser.save();

    // توليد توكن JWT (يمكنك تخصيص السر)
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    // إرسال التوكن كرد
    res.status(201).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
