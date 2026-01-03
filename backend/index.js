import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';



connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});