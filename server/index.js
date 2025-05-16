// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // يسمح لكل المواقع (أو تحدد الأصل لو تحب)
app.use(bodyParser.json());

// بيانات مستخدمين وهميين
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123', // في الواقع لازم تكون مشفرة (hashed)
  },
];

// API تسجيل الدخول
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // تحقق من البيانات
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // لو البيانات صحيحة نرجع توكن وهمي (في الحقيقة تستخدم JWT أو مشابه)
  const token = 'dummy-token-for-user-' + user.id;

  res.json({ token });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
