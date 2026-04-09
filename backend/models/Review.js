const mongoose = require('mongoose');

/**
 * Review Schema — BECANÉ eCommerce
 * Links a user's feedback to a specific product
 */
const reviewSchema = new mongoose.Schema({
    productId: {
        type: Number, // logical ID used throughout the project
        required: true,
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    text: {
        type: String,
        required: [true, 'Review text cannot be empty'],
        trim: true,
    },
    date: {
        type: String,
        default: () => new Date().toISOString().split('T')[0],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Review', reviewSchema);
