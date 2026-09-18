import express from "express";
import { createOrder, getMyOrders } from "../controllers/order-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

router.post('/create', authMiddleware, createOrder);
router.get('/', authMiddleware, getMyOrders)

export default router;