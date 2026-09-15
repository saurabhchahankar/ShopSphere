import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, getRelatedProduct, updateProduct } from '../controllers/products-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';
import adminMiddleware from '../middleware/admin-middleware.js';
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById)
router.get('/:id/related', getRelatedProduct)
router.post('/', authMiddleware, adminMiddleware, createProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

export default router;