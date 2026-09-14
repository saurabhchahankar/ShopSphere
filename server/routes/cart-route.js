import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
import { addToCart, clearCart, deleteCart, getCart, updateCartQuantity } from '../controllers/cart-controller.js';

const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.put('/update', authMiddleware, updateCartQuantity);
router.delete('/remove/:productId', authMiddleware, deleteCart);
router.delete('/clear', authMiddleware, clearCart);

export default router;