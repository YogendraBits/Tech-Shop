import asyncHandler from 'express-async-handler';
import Address from '../models/addressModel.js';

// @desc    Get addresses
// @route   GET /api/addresses
// @access  Private
const getAddresses = asyncHandler(async (req, res) => {
    const addresses = await Address.find({ user: req.user._id });
    res.json(addresses);
});

// @desc    Create address
// @route   POST /api/addresses
// @access  Private
const createAddress = asyncHandler(async (req, res) => {
    const { address, city, postalCode, country } = req.body;

    const newAddress = new Address({
        user: req.user._id,
        address,
        city,
        postalCode,
        country,
    });

    const createdAddress = await newAddress.save();
    res.status(201).json(createdAddress);
});

// @desc    Update address
// @route   PUT /api/addresses/:id
// @access  Private
const updateAddress = asyncHandler(async (req, res) => {
    const { address, city, postalCode, country } = req.body;

    const addressToUpdate = await Address.findById(req.params.id);

    if (!addressToUpdate) {
        res.status(404);
        throw new Error('Address not found');
    }

    if (addressToUpdate.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    addressToUpdate.address = address;
    addressToUpdate.city = city;
    addressToUpdate.postalCode = postalCode;
    addressToUpdate.country = country;

    const updatedAddress = await addressToUpdate.save();
    res.json(updatedAddress);
});

// @desc    Delete address
// @route   DELETE /api/addresses/:id
// @access  Private
const deleteAddress = asyncHandler(async (req, res) => {
    const addressToDelete = await Address.findById(req.params.id);

    if (!addressToDelete) {
        res.status(404);
        throw new Error('Address not found');
    }

    if (addressToDelete.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await addressToDelete.remove();
    res.json({ message: 'Address removed' });
});

export { getAddresses, createAddress, updateAddress, deleteAddress };
