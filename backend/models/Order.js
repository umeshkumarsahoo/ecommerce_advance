const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderNumber: {
        type: String,
        required: true,
        unique: true,
    },
    items: [{
        name: String,
        price: Number,
        quantity: Number,
        image: String,
    }],
    subtotal: Number,
    discount: Number,
    coinDiscount: Number,
    shipping: Number,
    total: Number,
    shippingAddress: {
        firstName: String,
        lastName: String,
        email: String,
        address: String,
        city: String,
        country: String,
        zip: String,
    },
    status: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing',
    },
    coinsEarned: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
