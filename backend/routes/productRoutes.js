import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  updateProductReview,
  deleteProductReview,
} from '../controllers/productControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Limit review operations (e.g., 3 reviews per hour)
const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  message: 'Too many reviews, please try again later.',
});

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/:id/reviews')
  .post(protect, reviewLimiter, createProductReview);

router.route('/top').get(getTopProducts);

router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router.route('/:id/reviews/:reviewId')
  .put(protect, reviewLimiter, updateProductReview)
  .delete(protect, reviewLimiter, deleteProductReview);

export default router;
