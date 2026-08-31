import express from 'express';
import { createProduct, getProducts } from '../controllers/products-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';
import adminMiddleware from '../middleware/admin-middleware.js';
const router = express.Router();

router.get('/', getProducts);
router.post('/', authMiddleware, adminMiddleware, createProduct);

export default router;