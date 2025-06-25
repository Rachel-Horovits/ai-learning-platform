import express from 'express';
import { createSubCategory, getSubCategories, deleteSubCategory} from '../controllers/subCategoryController';

const router = express.Router();

router.post('/', createSubCategory);
router.get('/', getSubCategories);
router.delete('/:id', deleteSubCategory);

export default router;