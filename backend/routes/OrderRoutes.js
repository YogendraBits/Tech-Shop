import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/OrderControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Limit order operations (e.g., 30 requests per hour)
const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  message: 'Too many order requests, please try again later.',
});

router.route('/')
  .post(protect, orderLimiter, addOrderItems)
  .get(protect, admin, orderLimiter, getOrders);

router.route('/myorders').get(protect, orderLimiter, getMyOrders);

router.route('/:id')
  .get(protect, orderLimiter, getOrderById);

router.route('/:id/pay')
  .put(protect, orderLimiter, updateOrderToPaid);

router.route('/:id/deliver')
  .put(protect, admin, orderLimiter, updateOrderToDelivered);

export default router;
