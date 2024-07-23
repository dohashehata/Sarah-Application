import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/searchApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default dbConnection;
