import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
} from '../controllers/addressController.js';

const router = express.Router();

router.route('/').get(protect, getAddresses).post(protect, createAddress);
router
    .route('/:id')
    .put(protect, updateAddress)
    .delete(protect, deleteAddress);

export default router;
