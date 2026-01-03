import mongoose from 'mongoose';
export const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected successfully");
    } catch (error) {
        console.log("Error while connecting to MongoDB", error);
    }
}