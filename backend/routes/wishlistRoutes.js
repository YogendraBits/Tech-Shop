// wishlistRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; 
import {
    addTowishlist,
    getWishlist,
    removeFromWishlist,
} from '../controllers/wishlistControllers.js'; // Import all controller functions

const router = express.Router();

// Route to add a product to the wishlist
router.post('/', protect, addTowishlist); 

// Route to get all wishlist items for a user
router.get('/', protect, getWishlist); 

// Route to remove an item from the wishlist
router.delete('/:id', protect, removeFromWishlist);

export default router;
