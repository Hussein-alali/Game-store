const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGO_URI;

    await mongoose.connect(MONGODB_URI, {
      dbName: 'gamestore',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000
    });

    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
