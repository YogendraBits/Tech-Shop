import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';

// @desc    Add items to cart
// @route   POST /api/cart
// @access  Private
const addCartItems = async (req, res) => {
  const { cartItem } = req.body;

  try {
      const userCart = await Cart.findOne({ user: req.user._id });
      if (userCart) {
          // User's cart exists, add the item
          userCart.cartItems.push(cartItem);
          await userCart.save();
          return res.status(200).json({ message: 'Cart item added successfully' });
      } else {
          // Create a new cart if none exists
          const newCart = new Cart({
              user: req.user._id,
              cartItems: [cartItem],
          });
          await newCart.save();
          return res.status(201).json({ message: 'Cart created and item added successfully' });
      }
  } catch (error) {
      console.error('Error adding item to cart:', error);
      return res.status(500).json({ message: error.message });
  }
};



// @desc    Get cart by id
// @route   GET /api/cart/:id
// @access  Private
const getCartById = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id).populate('user', 'name email');

  if (cart) {
    res.json(cart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

// @desc    Update cart item
// @route   PUT /api/cart/:id
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body); // Log request body
  console.log("User ID:", req.user._id); // Log user ID

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
      console.log("Cart found:", cart); // Log found cart
      const item = cart.cartItems.find(item => item._id.toString() === req.params.id);
      console.log("Item to update:", item); // Log item to update

      if (item) {
          item.qty = Number(req.body.qty); // Update the quantity
          await cart.save(); // Save changes to the cart
          res.json(cart); // Return updated cart
      } else {
          res.status(404);
          throw new Error('Item not found in cart');
      }
  } else {
      res.status(404);
      throw new Error('Cart not found');
  }
});




// @desc    Delete cart item
// @route   DELETE /api/cart/:cartId/item/:itemId
// @access  Private
const deleteCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.cartId); 

  if (cart) {
      cart.cartItems = cart.cartItems.filter(
          (item) => item._id.toString() !== req.params.itemId.toString()
      );

      const updatedCart = await cart.save(); 
      res.json(updatedCart); 
  } else {
      res.status(404);
      throw new Error('Cart not found');
  }
});





// @desc    Get logged in user cart
// @route   GET /api/cart/mycart
// @access  Private
const getMyCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product', 'name image price');

  // If cart does not exist, create a new empty cart for the user
  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      cartItems: [],
    });
    await cart.save();
  }

  res.json(cart);
});



// @desc    Get all carts
// @route   GET /api/cart
// @access  Private/Admin
const getCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find({}).populate('user', 'id name');
  res.json(carts);
});

export { addCartItems, getCartById, updateCartItem, deleteCartItem, getMyCart, getCarts };
