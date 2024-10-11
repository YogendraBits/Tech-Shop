import express from 'express'
import { 
  addCartItems, 
  getCartById, 
  updateCartItem, 
  deleteCartItem, 
  getMyCart, 
  getCarts 
} from '../controllers/cartControllers.js'
import { protect , admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .post(protect, addCartItems)
  .get(protect, admin, getCarts)

router.route('/mycart')
  .get(protect, getMyCart)

router.route('/:id')
  .get(protect, getCartById)
  .put(protect, updateCartItem)

router.route('/:cartId/item/:itemId')
  .put(protect, updateCartItem)
  .delete(protect, deleteCartItem); 
export default router 