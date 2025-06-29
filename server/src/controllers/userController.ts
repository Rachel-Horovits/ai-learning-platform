import User from '../models/User';
import Prompt from '../models/Prompt';
import jwt from "jsonwebtoken";
import { Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export const registerOrLoginUser = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body as { name: string; phone: string };
    let user = await User.findOne({ phone });
    if (user) {
      if (user.name !== name) {
        console.log(`[${new Date().toISOString()}] Login failed: phone exists with different name (${phone})`);
        res.status(400).json({ error: 'מספר טלפון זה כבר קיים במערכת עם שם אחר. אנא בדוק את הפרטים.' });
        return;
      }
    } else {
      user = new User({ name, phone });
      await user.save();
      console.log(`[${new Date().toISOString()}] New user registered: ${phone}`);
    }
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "20m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({ user, accessToken });
  } catch (err) {
    console.log(`[${new Date().toISOString()}] Registration/Login failed: ${err}`);
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
    await Prompt.deleteMany({ user: id });
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