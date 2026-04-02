const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// ---------------------------------------------------------------------------
// POST /api/contact — Submit a contact form message
// ---------------------------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // ── Validate required fields ──
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required (name, email, message)',
            });
        }

        // ── Validate email format ──
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address',
            });
        }

        // ── Save contact message to MongoDB ──
        const contact = await Contact.create({
            name,
            email,
            message,
        });

        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully! We will get back to you soon.',
            contact: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                message: contact.message,
                createdAt: contact.createdAt,
            },
        });
    } catch (error) {
        console.error('Contact form error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
});

module.exports = router;
