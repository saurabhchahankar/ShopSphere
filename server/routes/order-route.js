import express from "express";
import {
  cancelledOrder,
  createOrder,
  getAllOrders,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/order-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
import adminMiddleware from "../middleware/admin-middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.get("/", authMiddleware, getMyOrders);
router.get("/admin", authMiddleware, adminMiddleware, getAllOrders);
router.patch(
  "/:orderId/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus,
);
router.get("/:orderId", authMiddleware, getSingleOrder);
router.patch("/:orderId/cancel", authMiddleware, cancelledOrder);

export default router;
