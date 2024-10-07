// wishlistRoutes.js
import express from 'express';
import { protect } from '../middlewear/authMiddlewear.js'; // Ensure this middleware is correctly imported
import {
    addTowishlist,
    getWishlist,
    removeFromWishlist,
} from '../controllers/wishlistControllers.js'; // Import all controller functions

const router = express.Router();

// Route to add a product to the wishlist
router.post('/', protect, addTowishlist); // Call the controller function directly

// Route to get all wishlist items for a user
router.get('/', protect, getWishlist); // Call the controller function directly

// Route to remove an item from the wishlist
router.delete('/:id', protect, removeFromWishlist); // Call the controller function directly

export default router;
