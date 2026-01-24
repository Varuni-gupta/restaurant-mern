import express from 'express';

import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import { addToCart,getCart,removeFromCart } from '../controllers/cartController.js';
import upload from '../middlewares/multer.js';
const cartRoutes = express.Router();
cartRoutes.post("/add", protect, addToCart);
cartRoutes.get("/get", protect, getCart);
cartRoutes.delete("/remove", protect, removeFromCart);
export default cartRoutes;