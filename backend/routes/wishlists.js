const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Wishlist = require('../models/Wishlist');

// Middleware to validate userId
const validateUserId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).json({ success: false, message: 'Invalid User ID format' });
    }
    next();
};

// ---------------------------------------------------------------------------
// GET /api/wishlists/:userId — Fetch user's wishlist
// ---------------------------------------------------------------------------
router.get('/:userId', validateUserId, async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ userId: req.params.userId });
        if (!wishlist) {
            wishlist = await Wishlist.create({ userId: req.params.userId, items: [] });
        }
        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        console.error('Fetch wishlist error:', error.message);
        res.status(500).json({ success: false, message: 'Server error fetching wishlist' });
    }
});

// ---------------------------------------------------------------------------
// POST /api/wishlists/:userId/toggle — Add or remove an item
// ---------------------------------------------------------------------------
router.post('/:userId/toggle', validateUserId, async (req, res) => {
    try {
        const { product } = req.body;
        const productId = String(product.id); // Normalize to string
        let wishlist = await Wishlist.findOne({ userId: req.params.userId });

        if (!wishlist) {
            wishlist = new Wishlist({ userId: req.params.userId, items: [] });
        }

        const itemIndex = wishlist.items.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
            wishlist.items.splice(itemIndex, 1);
        } else {
            wishlist.items.push({
                productId,
                name: product.name,
                price: product.price,
                category: product.category || '',
                image: product.image || product.images?.[0] || ''
            });
        }

        await wishlist.save();
        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        console.error('Toggle wishlist error:', error.message);
        res.status(500).json({ success: false, message: 'Server error toggling wishlist' });
    }
});

// ---------------------------------------------------------------------------
// DELETE /api/wishlists/:userId/remove/:productId — Force remove
// ---------------------------------------------------------------------------
router.delete('/:userId/remove/:productId', validateUserId, async (req, res) => {
    try {
        const normalizedId = String(req.params.productId);
        let wishlist = await Wishlist.findOne({ userId: req.params.userId });
        if (!wishlist) return res.status(404).json({ success: false, message: 'Wishlist not found' });

        wishlist.items = wishlist.items.filter(item => item.productId !== normalizedId);
        await wishlist.save();

        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        console.error('Remove wishlist error:', error.message);
        res.status(500).json({ success: false, message: 'Server error removing from wishlist' });
    }
});

module.exports = router;
