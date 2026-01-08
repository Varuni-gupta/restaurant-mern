import Category from "../models/categoryModel.js";
import { v2 as cloudinary } from "cloudinary";
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !req.file) {
      return res.status(400).json({ message: "Name and image are required" });
    }
    const alreadyExists = await Category.findOne({ name });
    if (alreadyExists) {
      return res.status(409).json({ message: "Category already exists" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const newCategory = await Category.create({
      name,
      image: result.secure_url,
    });
    return res
      .status(201)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      category.image = result.secure_url;
    }
    if (name) {
      category.name = name;
    }
    await category.save();
    return res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
      console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
