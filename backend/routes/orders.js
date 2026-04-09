const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

/**
 * GET /api/orders/:userId/coins
 * Retrieve the current SuperCoin balance for a specific user.
 * 
 * NOTE: This route is placed above /:userId to prevent being caught by the generic ID parameter.
 */
router.get('/:userId/coins', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('superCoins');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, superCoins: user.superCoins || 0 });
    } catch (error) {
        console.error('Fetch coins error:', error.message);
        res.status(500).json({ success: false, message: 'Server error fetching coins' });
    }
});

/**
 * GET /api/orders/:userId
 * Fetch the complete order history for a user, sorted by most recent first.
 */
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Fetch orders error:', error.message);
        res.status(500).json({ success: false, message: 'Server error retrieving orders' });
    }
});

/**
 * POST /api/orders/:userId/place
 * Place a new order and manage SuperCoin transactions.
 * 
 * Logic:
 * 1. Generate a unique Order Number (ORD-XXXXXXX-YYYY).
 * 2. Calculate newly earned coins (1% of total; 2% for VIPs).
 * 3. Create the Order record.
 * 4. Update the user's SuperCoin balance (Add earned, subtract redeemed).
 */
router.post('/:userId/place', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { items, subtotal, discount, coinDiscount, shipping, total, shippingAddress } = req.body;

        // Generate a random human-readable order identifier
        const orderNumber = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString().slice(-4);

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        // SuperCoin Earning Calculation: Base (1%) vs VIP (2%)
        const baseCoinsEarned = Math.floor(total / 100);
        const coinsEarned = user.isVIP ? baseCoinsEarned * 2 : baseCoinsEarned;

        // Create initial order entry
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

        // Update User's coin wallet
        const currentCoins = user.superCoins || 0;
        const redeemedCoins = coinDiscount || 0;
        const newCoinBalance = currentCoins + coinsEarned - redeemedCoins;
        
        user.superCoins = Math.max(0, newCoinBalance);
        await user.save();

        res.status(201).json({ 
            success: true, 
            order: newOrder, 
            superCoins: user.superCoins 
        });
    } catch (error) {
        console.error('Order placement failure:', error.message);
        res.status(500).json({ success: false, message: 'Critical server error during order processing' });
    }
});

module.exports = router;

