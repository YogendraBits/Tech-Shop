import asyncHandler from 'express-async-handler'; // Import asyncHandler for error handling
import WishlistItem from '../models/wishlistModel.js'; // Ensure the model name is consistent
import Product from '../models/productModel.js'; // Import the Product model

// @desc    Add an item to the wishlist
// @route   POST /api/wishlist
// @access  Private
export const addTowishlist = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    // Validate the product ID
    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        // Check if the item already exists in the wishlist for the user
        const existingItem = await WishlistItem.findOne({
            userId: req.user._id,
            productId,
        });

        if (existingItem) {
            return res.status(400).json({ message: 'Item already in wishlist' });
        }

        // Fetch the product details to include in the wishlist
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create a new wishlist item
        const wishlistItem = new WishlistItem({
            userId: req.user._id,
            productId,
            name: product.name, // Add product name
            image: product.image, // Add product image URL
            price: product.price, // Add product price
            quantity, // Add quantity
        });

        // Save the item to the database
        const addedWishlistItem = await wishlistItem.save();

        // Respond with the newly added wishlist item
        res.status(201).json({
            message: 'Item added to wishlist',
            wishlistItem: addedWishlistItem,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @desc    Get all wishlist items for a user
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = asyncHandler(async (req, res) => {
    try {
        // Retrieve all wishlist items for the logged-in user
        const wishlistItems = await WishlistItem.find({ userId: req.user._id }).populate('productId');
        
        // Respond with the user's wishlist items
        res.status(200).json(wishlistItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @desc    Remove an item from the wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
export const removeFromWishlist = asyncHandler(async (req, res) => {
    try {
        // Find the wishlist item by ID and delete it
        const wishlistItem = await WishlistItem.findByIdAndDelete(req.params.id);

        // If the item does not exist, respond with a 404 status
        if (!wishlistItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Item removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Export all functions if using named exports
export default {
    addTowishlist,
    getWishlist,
    removeFromWishlist,
};
