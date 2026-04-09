const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');

/**
 * @route   GET /api/reviews/:productId
 * @desc    Get all reviews for a product
 */
router.get('/:productId', async (req, res) => {
    try {
        const productId = Number(req.params.productId);
        const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
        res.json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * @route   POST /api/reviews
 * @desc    Submit a new review and update product rating
 */
router.post('/', async (req, res) => {
    const { productId: rawProductId, userId, userName, rating, text } = req.body;
    const productId = Number(rawProductId);

    try {
        // 1. Save the new review
        const newReview = new Review({
            productId,
            userId,
            userName,
            rating,
            text,
        });
        await newReview.save();

        // 2. Recalculate average rating for the product
        const reviews = await Review.find({ productId });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        // 3. Update the Product document
        await Product.findOneAndUpdate(
            { id: productId },
            { rating: parseFloat(avgRating.toFixed(1)) }, // Round to 1 decimal place
            { new: true }
        );

        res.status(201).json({ success: true, review: newReview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
