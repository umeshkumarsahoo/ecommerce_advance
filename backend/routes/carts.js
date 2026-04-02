const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// ---------------------------------------------------------------------------
// GET /api/carts/:userId — Fetch user's cart
// ---------------------------------------------------------------------------
router.get('/:userId', async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) {
            // Create empty cart if it doesn't exist
            cart = await Cart.create({ userId: req.params.userId, items: [] });
        }
        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Fetch cart error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ---------------------------------------------------------------------------
// POST /api/carts/:userId/add — Add item (or increase qty)
// ---------------------------------------------------------------------------
router.post('/:userId/add', async (req, res) => {
    try {
        const { product } = req.body;
        let cart = await Cart.findOne({ userId: req.params.userId });

        if (!cart) {
            cart = new Cart({ userId: req.params.userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId === product.id);

        if (itemIndex > -1) {
            // Item exists, increase quantity
            cart.items[itemIndex].quantity += 1;
        } else {
            // New item
            cart.items.push({
                productId: product.id,
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
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ---------------------------------------------------------------------------
// PUT /api/carts/:userId/update — Update quantity
// ---------------------------------------------------------------------------
router.put('/:userId/update', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: req.params.userId });

        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        if (quantity < 1) {
            // Remove instead
            cart.items = cart.items.filter(item => item.productId !== productId);
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
            }
        }

        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Update cart error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ---------------------------------------------------------------------------
// DELETE /api/carts/:userId/remove/:productId — Remove specific item
// ---------------------------------------------------------------------------
router.delete('/:userId/remove/:productId', async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.productId !== req.params.productId);
        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Remove from cart error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ---------------------------------------------------------------------------
// DELETE /api/carts/:userId/clear — Clear all items
// ---------------------------------------------------------------------------
router.delete('/:userId/clear', async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Clear cart error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
