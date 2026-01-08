import express from 'express';

import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import { addCategory,getAllCategories,updateCategory,deleteCategory } from '../controllers/categoryController.js';
import upload from '../middlewares/multer.js';
const categoryRoutes = express.Router();
categoryRoutes.post("/add", adminOnly, upload.single("image"), addCategory);
categoryRoutes.get("/all", getAllCategories);
categoryRoutes.put("/update/:id", adminOnly, upload.single("image"), updateCategory);
categoryRoutes.delete("/delete/:id", adminOnly, deleteCategory);
export default categoryRoutes;