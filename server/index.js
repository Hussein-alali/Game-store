// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

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

// Routes
app.use('/api/upload', require('./routes/upload'));
app.use('/api/games', require('./routes/games'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/register', require('./routes/register'));
app.use('/api/signin', require('./routes/signin'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
