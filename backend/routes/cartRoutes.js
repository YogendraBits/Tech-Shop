import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  addCartItems,
  getCartById,
  updateCartItem,
  deleteCartItem,
  getMyCart,
  getCarts,
} from '../controllers/cartControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Limit cart operations (e.g., 50 requests per hour)
const cartLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
  message: 'Too many cart requests, please try again later.',
});

router.route('/')
  .post(protect, cartLimiter, addCartItems)
  .get(protect, admin, cartLimiter, getCarts);

router.route('/mycart').get(protect, cartLimiter, getMyCart);

router.route('/:id')
  .get(protect, cartLimiter, getCartById)
  .put(protect, cartLimiter, updateCartItem);

router.route('/:cartId/item/:itemId')
  .put(protect, cartLimiter, updateCartItem)
  .delete(protect, cartLimiter, deleteCartItem);

export default router;
