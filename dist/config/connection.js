import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URI = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);
// Function to connect to MongoDB
// This function uses Mongoose to connect to the MongoDB database
export const connectDB = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }
        await mongoose.connect(MONGO_URI);
        console.log('Social Network API connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
