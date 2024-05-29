import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';

// @desc    Add items to cart
// @route   POST /api/cart
// @access  Private
const addCartItems = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || cartItems.length === 0) {
    res.status(400);
    throw new Error('No cart items');
  } else {
    const cart = new Cart({
      cartItems,
      user: req.user._id,
    });

    const createdCart = await cart.save();
    res.status(201).json(createdCart);
  }
});

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

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;

  const cart = await Cart.findById(req.params.id);

  if (cart) {
    cart.cartItems = cartItems || cart.cartItems;
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

// @desc    Delete cart item
// @route   DELETE /api/cart/:id/item/:itemId
// @access  Private
const deleteCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);

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
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    res.json(cart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

// @desc    Get all carts
// @route   GET /api/cart
// @access  Private/Admin
const getCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find({}).populate('user', 'id name');
  res.json(carts);
});

export { addCartItems, getCartById, updateCartItem, deleteCartItem, getMyCart, getCarts };
