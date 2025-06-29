import Prompt from '../models/Prompt';
import User from '../models/User';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';
import { Request, Response } from 'express';
import { getAIResponse } from '../services/aiService';

export const createPrompt = async (req: Request, res: Response) => {
  try {
    const { user, category, subCategory, prompt } = req.body;

    // Check that the user exists
    const userExists = await User.findById(user);
    if (!userExists) {
      res.status(400).json({ error: 'User does not exist' });
      return;
    }

    // Check that the category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      res.status(400).json({ error: 'Category does not exist' });
      return;
    }

    // Check that the sub-category exists
    const subCategoryExists = await SubCategory.findById(subCategory);
    if (!subCategoryExists) {
      res.status(400).json({ error: 'SubCategory does not exist' });
      return;
    }

    // Check that the sub-category belongs to the category
    if (subCategoryExists.category.toString() !== category) {
      res.status(400).json({ error: 'SubCategory does not belong to the selected Category' });
      return;
    }

    // Check that the prompt is not empty
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    // Get the names of the category and sub-category
    const categoryDoc = await Category.findById(category);
    const subCategoryDoc = await SubCategory.findById(subCategory);

    // Build the full prompt for the AI
    const fullPrompt = `Topic: ${categoryDoc?.name}\nSubtopic: ${subCategoryDoc?.name}\nQuestion: ${prompt}`;

    // Call OpenAI
    const aiResponse = await getAIResponse(fullPrompt);

    const newPrompt = new Prompt({
      user,
      category,
      subCategory,
      prompt,
      response: aiResponse,
    });

    await newPrompt.save();
    res.status(201).json(newPrompt);
  } catch (err) {
    res.status(400).json({ error: 'Prompt failed', details: err });
  }
};

export const getPrompts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const prompts = await Prompt.find(userId ? { user: userId } : {})
      .populate('user', 'name phone')
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .sort({ createdAt: -1 }); 

    res.json(prompts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch prompts', details: err });
  }
};

export const deletePrompt = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Prompt.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ error: 'Prompt not found' });
      return;
    }
    res.status(200).json({ message: 'Prompt deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete prompt failed', details: err });
  }
};