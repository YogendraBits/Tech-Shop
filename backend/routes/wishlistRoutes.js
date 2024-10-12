import express from 'express';
import rateLimit from 'express-rate-limit';
import { protect } from '../middleware/authMiddleware.js';
import {
  addTowishlist,
  getWishlist,
  removeFromWishlist,
} from '../controllers/wishlistControllers.js';

const router = express.Router();

// Limit wishlist operations (e.g., 20 requests per hour)
const wishlistLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  message: 'Too many wishlist requests, please try again later.',
});

router.post('/', protect, wishlistLimiter, addTowishlist);
router.get('/', protect, wishlistLimiter, getWishlist);
router.delete('/:id', protect, wishlistLimiter, removeFromWishlist);

export default router;
