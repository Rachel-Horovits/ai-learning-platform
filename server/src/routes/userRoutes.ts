import express from 'express';
import { registerOrLoginUser, getUsers, deleteUser } from '../controllers/userController';

const router = express.Router();

router.post('/', registerOrLoginUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);

export default router;