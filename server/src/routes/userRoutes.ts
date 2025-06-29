import express from 'express';
import { registerOrLoginUser, getUsers, deleteUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', registerOrLoginUser);
router.get('/', authMiddleware, getUsers);
router.delete('/:id', authMiddleware, deleteUser);

export default router;