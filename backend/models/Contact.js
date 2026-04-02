const mongoose = require('mongoose');

/**
 * Contact Schema — BECANÉ eCommerce
 * 
 * Stores contact form submissions from the Contact page
 */
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied'],
        default: 'new',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);
