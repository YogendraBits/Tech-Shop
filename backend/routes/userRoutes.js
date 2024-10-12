import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  authUsers,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUser,
  deleteUser,
  getUserById,
  updateUser,
  deleteOwnAccount,
} from '../controllers/userControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Limit login attempts (e.g., 5 attempts per 10 minutes)
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: 'Too many login attempts, please try again later.',
});

router.post('/login', loginLimiter, authUsers);

router.route('/')
  .post(registerUser)
  .get(protect, admin, getUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteOwnAccount);

router.route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
