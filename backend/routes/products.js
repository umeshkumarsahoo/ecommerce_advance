const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ---------------------------------------------------------------------------
// GET /api/products — Fetch all products
// ---------------------------------------------------------------------------
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}).sort({ id: 1 });
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error('Fetch products error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching products.',
        });
    }
});

// ---------------------------------------------------------------------------
// GET /api/products/:id — Fetch a single product by numeric id
// ---------------------------------------------------------------------------
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: Number(req.params.id) });
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error('Fetch product by id error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching product details.',
        });
    }
});

module.exports = router;
