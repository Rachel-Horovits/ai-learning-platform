import User from '../models/User';
import Prompt from '../models/Prompt';
import { Request, Response } from 'express';

export const registerOrLoginUser = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body;
    let user = await User.findOne({ phone });
    if (user) {
      // משתמש קיים - מחזירים אותו (login)
      res.status(200).json(user);
      return;
    }
    // משתמש חדש - יוצרים אותו (sign up)
    user = new User({ name, phone });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Registration/Login failed', details: err });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // מחיקת כל ה-prompts של המשתמש
    await Prompt.deleteMany({ user: id });
    // מחיקת המשתמש עצמו
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
       res.status(404).json({ error: 'User not found' });
       return;
    }
    res.status(200).json({ message: 'User and their prompts deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete user failed', details: err });
  }
};