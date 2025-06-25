import Category from '../models/Category';
import SubCategory from '../models/SubCategory';
import { Request, Response } from 'express';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    let category = await Category.findOne({ name });
    if (category) {
      // כבר קיימת - מחזירים אותה
      res.status(200).json(category);
      return;
    }
    category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: 'Create category failed', details: err });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // מחיקת כל תתי-הקטגוריות של הקטגוריה
    await SubCategory.deleteMany({ category: id });
    // מחיקת הקטגוריה עצמה
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category and its subcategories deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete category failed', details: err });
  }
};