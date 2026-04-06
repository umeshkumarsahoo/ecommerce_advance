const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

// ---------------------------------------------------------------------------
// GET /api/orders/:userId/coins — Fetch user's current SuperCoin balance
// IMPORTANT: This route MUST be defined BEFORE /:userId to avoid conflict
// ---------------------------------------------------------------------------
router.get('/:userId/coins', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('superCoins');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, superCoins: user.superCoins });
    } catch (error) {
        console.error('Fetch coins error:', error.message);
        res.status(500).json({ success: false, message: 'Server error fetching coins' });
    }
});

// ---------------------------------------------------------------------------
// GET /api/orders/:userId — Fetch all orders for a user
// ---------------------------------------------------------------------------
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Fetch orders error:', error.message);
        res.status(500).json({ success: false, message: 'Server error retrieving orders' });
    }
});

// ---------------------------------------------------------------------------
// POST /api/orders/:userId/place — Place a new order and update coins
// ---------------------------------------------------------------------------
router.post('/:userId/place', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { items, subtotal, discount, coinDiscount, shipping, total, shippingAddress } = req.body;

        const orderNumber = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString().slice(-4);

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const baseCoinsEarned = Math.floor(total / 100);
        const coinsEarned = user.isVIP ? baseCoinsEarned * 2 : baseCoinsEarned;

        const newOrder = await Order.create({
            userId,
            orderNumber,
            items,
            subtotal,
            discount,
            coinDiscount,
            shipping,
            total,
            shippingAddress,
            coinsEarned,
        });

        const newCoinBalance = (user.superCoins || 0) + coinsEarned - (coinDiscount || 0);
        user.superCoins = Math.max(0, newCoinBalance);
        await user.save();

        res.status(201).json({ success: true, order: newOrder, superCoins: user.superCoins });
    } catch (error) {
        console.error('Place order error:', error.message);
        res.status(500).json({ success: false, message: 'Server error placing order' });
    }
});

module.exports = router;
