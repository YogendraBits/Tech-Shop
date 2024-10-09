import express from 'express'
const router = express.Router();
import {getProducts, getProductById , deleteProduct , updateProduct ,createProduct , createProductReview , getTopProducts, updateProductReview } from '../controllers/productControllers.js'
import {protect , admin } from '../middlewear/authMiddlewear.js'


router.route('/').get(getProducts).post(protect , admin , createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/top').get(getTopProducts)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct) 

// Add this line in your routes
router.route('/:id/reviews/:reviewId').put(protect, updateProductReview);


export default router