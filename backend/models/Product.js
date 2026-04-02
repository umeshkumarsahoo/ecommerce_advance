const mongoose = require('mongoose');

/**
 * Product Schema — BECANÉ eCommerce
 * Maps to the existing frontend product structure
 */
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    gender: {
        type: String,
        required: true,
        enum: ['Men', 'Women'],
    },
    category: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    brand: {
        type: String,
        trim: true,
        default: 'BECANÉ'
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    sizes: {
        type: [String],
        default: []
    },
    images: {
        type: [String],
        default: []
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
