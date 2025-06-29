import User from '../models/User';
import { Request, Response } from 'express';
import { getUsers, deleteUser } from './userController';
import { getPrompts, deletePrompt } from './promptController';
import { createCategory, getCategories, deleteCategory } from './categoryController';
import { createSubCategory, getSubCategories, deleteSubCategory } from './subCategoryController';

// Create a new admin or upgrade an existing user to admin
export const createAdminUser = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body;
    let user = await User.findOne({ phone });
    if (user) {
      if (user.name !== name) {
        res.status(400).json({ error: 'This phone number already exists in the system with a different name. Please check your details.' });
        return;
      }
      if (user.role === "admin") {
        res.status(400).json({ error: 'User is already an admin.' });
        return;
      }
      user.role = "admin";
      await user.save();
      res.status(200).json(user);
      return;
    }
    user = new User({ name, phone, role: "admin" });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create admin', details: err });
  }
};

export { getUsers, deleteUser, getPrompts, deletePrompt, createCategory, getCategories, deleteCategory, createSubCategory, getSubCategories, deleteSubCategory };