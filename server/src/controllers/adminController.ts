
import User from '../models/User';
import { Request, Response } from 'express';
import { getUsers, deleteUser } from './userController';
import { getPrompts, deletePrompt } from './promptController';
import { createCategory, getCategories, deleteCategory } from './categoryController';
import { createSubCategory, getSubCategories, deleteSubCategory } from './subCategoryController';

// יצירת מנהל חדש או שדרוג משתמש רגיל למנהל
export const createAdminUser = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body;
    let user = await User.findOne({ phone });
    if (user) {
      if (user.name !== name) {
        res.status(400).json({ error: 'מספר טלפון זה כבר קיים במערכת עם שם אחר. אנא בדוק את הפרטים.' });
        return;
      }
      if (user.role === "admin") {
        res.status(400).json({ error: 'המשתמש כבר מוגדר כמנהל.' });
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
    res.status(400).json({ error: 'יצירת מנהל נכשלה', details: err });
  }
};

export { getUsers, deleteUser, getPrompts, deletePrompt, createCategory, getCategories, deleteCategory, createSubCategory, getSubCategories, deleteSubCategory };