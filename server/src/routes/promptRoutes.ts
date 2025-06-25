import express from 'express';
import { createPrompt, getPrompts, deletePrompt } from '../controllers/promptController';

const router = express.Router();

router.post('/', createPrompt);
router.get('/', getPrompts);
router.delete('/:id', deletePrompt);

export default router;