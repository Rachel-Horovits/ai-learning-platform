// server/routes/adminRoutes.ts

import express from 'express';
import { adminMiddleware } from '../middleware/admin';
import * as adminController from '../controllers/adminController';

const router = express.Router();

router.use(adminMiddleware);

// Users
router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUser);

// Prompts
router.get('/prompts', adminController.getPrompts);
router.delete('/prompts/:id', adminController.deletePrompt);

// Categories
router.post('/categories', adminController.createCategory);
router.get('/categories', adminController.getCategories);
router.delete('/categories/:id', adminController.deleteCategory);

// Subcategories
router.post('/subcategories', adminController.createSubCategory);
router.get('/subcategories', adminController.getSubCategories);
router.delete('/subcategories/:id', adminController.deleteSubCategory);

// Admin-specific functions (like creating a new admin)
router.post('/users/admin', adminController.createAdminUser);

export default router;