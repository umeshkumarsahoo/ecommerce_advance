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

// ---------------------------------------------------------------------------
// App Setup
// ---------------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Database connection string not configured');
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
}));
app.use(express.json());

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use('/api/auth/password', require('./routes/password'));
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'BECANÉ API is running 🚀' });
});

// ---------------------------------------------------------------------------
// Database Connection & Server Start
// ---------------------------------------------------------------------------
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    });
