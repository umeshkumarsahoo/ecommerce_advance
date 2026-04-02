const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// ---------------------------------------------------------------------------
// GET /api/wishlists/:userId — Fetch user's wishlist
// ---------------------------------------------------------------------------
router.get('/:userId', async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ userId: req.params.userId });
        if (!wishlist) {
            wishlist = await Wishlist.create({ userId: req.params.userId, items: [] });
        }
        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        console.error('Fetch wishlist error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ---------------------------------------------------------------------------
// POST /api/wishlists/:userId/toggle — Add or remove an item
// ---------------------------------------------------------------------------
router.post('/:userId/toggle', async (req, res) => {
    try {
        const { product } = req.body;
        let wishlist = await Wishlist.findOne({ userId: req.params.userId });

        if (!wishlist) {
            wishlist = new Wishlist({ userId: req.params.userId, items: [] });
        }

        const itemIndex = wishlist.items.findIndex(item => item.productId === product.id);

        if (itemIndex > -1) {
            // Remove item
            wishlist.items.splice(itemIndex, 1);
        } else {
            // Add item
            wishlist.items.push({
                productId: product.id,
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
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ---------------------------------------------------------------------------
// DELETE /api/wishlists/:userId/remove/:productId — Force remove
// ---------------------------------------------------------------------------
router.delete('/:userId/remove/:productId', async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ userId: req.params.userId });
        if (!wishlist) return res.status(404).json({ success: false, message: 'Wishlist not found' });

        wishlist.items = wishlist.items.filter(item => item.productId !== req.params.productId);
        await wishlist.save();

        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        console.error('Remove wishlist error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
