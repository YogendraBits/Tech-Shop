import mongoose from 'mongoose';

const wishlistitemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product', // Reference to the Product model
    },
    name: {
        type: String, // Add this if you want to store product name
        required: true,
    },
    image: {
        type: String, // Add this if you want to store product image URL
        required: true,
    },
    price: {
        type: Number, // Add this if you want to store product price
        required: true,
    },
    quantity: {
        type: Number, // Quantity of the product in the wishlist
        required: true,
        default: 1, // Set a default value for quantity
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
});

const wishlistitems = mongoose.model('wishlistitems', wishlistitemSchema);

export default wishlistitems;
