const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/carts');
const wishlistRoutes = require('./routes/wishlists');
const reviewRoutes = require('./routes/reviews');

/**
 * App Configuration
 */
const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Database connection string MONGO_URI is missing from .env');
}

/**
 * Middleware Setup
 */
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
}));
app.use(express.json());

/**
 * API Routes
 */
app.use('/api/auth/password', require('./routes/password'));
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

/**
 * Health Check Endpoint
 */
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: 'BECANÉ Jewelry API Service is operational 🚀',
        version: '1.0.0'
    });
});

/**
 * Database Connectivity & Server Initialization
 */
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connection established');
        app.listen(PORT, () => {
            console.log(`🚀 BECANÉ Server is live on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failure:', err.message);
        process.exit(1);
    });

