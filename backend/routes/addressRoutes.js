import express from 'express';
import rateLimit from 'express-rate-limit';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/addressController.js';

const router = express.Router();

// Limit address operations (e.g., 20 requests per hour)
const addressLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 requests per hour
  message: 'Too many address operations, please try again later.',
});

router.route('/')
  .get(protect, addressLimiter, getAddresses)
  .post(protect, addressLimiter, createAddress);

router.route('/:id')
  .put(protect, addressLimiter, updateAddress)
  .delete(protect, addressLimiter, deleteAddress);

export default router;
