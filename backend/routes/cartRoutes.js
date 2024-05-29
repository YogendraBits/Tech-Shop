import express from 'express'
import { 
  addCartItems, 
  getCartById, 
  updateCartItem, 
  deleteCartItem, 
  getMyCart, 
  getCarts 
} from '../controllers/cartControllers.js'
import { protect , admin } from '../middlewear/authMiddlewear.js'

const router = express.Router()

router.route('/')
  .post(protect, addCartItems)
  .get(protect, admin, getCarts)

router.route('/mycart')
  .get(protect, getMyCart)

router.route('/:id')
  .get(protect, getCartById)
  .put(protect, updateCartItem)

router.route('/:id/item/:itemId')
  .delete(protect, deleteCartItem)

export default router
