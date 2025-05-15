import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const MONGODB_URI = 'mongodb+srv://web1:web1@cluster0.jvxlrpl.mongodb.net/gamestore?retryWrites=true&w=majority';
    
    await mongoose.connect(MONGODB_URI, {
      dbName: 'gamestore',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000
    });

    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
};


export default connectDB;