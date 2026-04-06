const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/Cart');

// Middleware to validate userId
const validateUserId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).json({ success: false, message: 'Invalid User ID format' });
    }
    next();
};

// ---------------------------------------------------------------------------
// GET /api/carts/:userId — Fetch user's cart
// ---------------------------------------------------------------------------
router.get('/:userId', validateUserId, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) {
            cart = await Cart.create({ userId: req.params.userId, items: [] });
        }
        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Fetch cart error:', error.message);
        res.status(500).json({ success: false, message: 'Server error fetching cart' });
    }
});

// ---------------------------------------------------------------------------
// POST /api/carts/:userId/add — Add item (or increase qty)
// ---------------------------------------------------------------------------
router.post('/:userId/add', validateUserId, async (req, res) => {
    try {
        const { product } = req.body;
        const productId = String(product.id); // Normalize to string for consistent comparison
        let cart = await Cart.findOne({ userId: req.params.userId });

        if (!cart) {
            cart = new Cart({ userId: req.params.userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1;
        } else {
            cart.items.push({
                productId,
                name: product.name,
                price: product.price,
                image: product.image || product.images?.[0] || '',
                quantity: 1
            });
        }

        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Add to cart error:', error.message);
        res.status(500).json({ success: false, message: 'Server error adding to cart' });
    }
});

// ---------------------------------------------------------------------------
// PUT /api/carts/:userId/update — Update quantity
// ---------------------------------------------------------------------------
router.put('/:userId/update', validateUserId, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const normalizedId = String(productId);
        let cart = await Cart.findOne({ userId: req.params.userId });

        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        if (quantity < 1) {
            cart.items = cart.items.filter(item => item.productId !== normalizedId);
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId === normalizedId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
            }
        }

        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Update cart error:', error.message);
        res.status(500).json({ success: false, message: 'Server error updating cart' });
    }
});

// ---------------------------------------------------------------------------
// DELETE /api/carts/:userId/remove/:productId — Remove specific item
// ---------------------------------------------------------------------------
router.delete('/:userId/remove/:productId', validateUserId, async (req, res) => {
    try {
        const normalizedId = String(req.params.productId);
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.productId !== normalizedId);
        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Remove from cart error:', error.message);
        res.status(500).json({ success: false, message: 'Server error removing from cart' });
    }
});

// ---------------------------------------------------------------------------
// DELETE /api/carts/:userId/clear — Clear all items
// ---------------------------------------------------------------------------
router.delete('/:userId/clear', validateUserId, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.status(200).json({ success: true, message: 'Cart cleared' });
    } catch (error) {
        console.error('Clear cart error:', error.message);
        res.status(500).json({ success: false, message: 'Server error clearing cart' });
    }
});

module.exports = router;
