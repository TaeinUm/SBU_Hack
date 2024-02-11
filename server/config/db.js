import mongoose from 'mongoose';

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI must be defined');
        process.exit(1);
    }
    
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // optional: specify additional connection options here
        });
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`MongoDB Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
