import SubCategory from '../models/SubCategory';
import Category from '../models/Category';
import { Request, Response } from 'express';

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, category } = req.body;

    // בדיקה שהקטגוריה קיימת
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
       res.status(400).json({ error: 'Category does not exist' });
         return;
    }

    // בדיקה שאין כבר תת-קטגוריה כזו לאותה קטגוריה
    let subCategory = await SubCategory.findOne({ name, category });
    if (subCategory) {
       res.status(200).json(subCategory);
       return;
    }

    subCategory = new SubCategory({ name, category });
    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (err) {
    res.status(400).json({ error: 'Create sub-category failed', details: err });
  }
};
export const getSubCategories = async (req: Request, res: Response) => {
  const { categoryId } = req.query;
  const filter = categoryId ? { category: categoryId } : {};
  const subCategories = await SubCategory.find(filter).populate('category');
  res.json(subCategories);
};

export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await SubCategory.findByIdAndDelete(id);
    res.status(200).json({ message: 'SubCategory deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete sub-category failed', details: err });
  }
};