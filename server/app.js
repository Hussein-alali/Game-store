const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// السماح للفرونت إند بالوصول (React على بورت 3000)
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

connectDB();

app.get('/api/dbstatus', (req, res) => {
  res.json({
    status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    dbName: mongoose.connection.name,
    host: mongoose.connection.host
  });
});

// ربط الراوترات
app.use('/api/games', require('./routes/games'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));

// ميدل وير للأخطاء
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
