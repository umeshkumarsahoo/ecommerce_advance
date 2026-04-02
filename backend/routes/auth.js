const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ---------------------------------------------------------------------------
// POST /api/auth/register — Create a new user account
// ---------------------------------------------------------------------------
router.post('/register', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // ── Validate required fields ──
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required (name, email, mobile, password)',
            });
        }

        // ── Check if email already exists ──
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'An account with this email already exists',
            });
        }

        // ── Validate mobile: exactly 10 digits ──
        if (!/^[0-9]{10}$/.test(mobile)) {
            return res.status(400).json({
                success: false,
                message: 'Mobile number must be exactly 10 digits',
            });
        }

        // ── Validate password strength ──
        if (password.length < 5) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 5 characters long',
            });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one uppercase letter',
            });
        }
        if (!/[0-9]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one number',
            });
        }

        // ── Create user (password is hashed by pre-save hook) ──
        const user = await User.create({
            name,
            email,
            mobile,
            password,
        });

        // ── Return success (exclude password from response) ──
        res.status(201).json({
            success: true,
            message: 'Registration successful! You can now log in.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                memberSince: user.memberSince,
                membershipTier: user.membershipTier,
                isVIP: user.isVIP,
                benefits: user.benefits,
            },
        });
    } catch (error) {
        // Handle Mongoose duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'An account with this email already exists',
            });
        }

        console.error('Registration error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
});
// ---------------------------------------------------------------------------
// POST /api/auth/login — Authenticate an existing user
// ---------------------------------------------------------------------------
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both username (email) and password',
            });
        }

        // We use 'email' as the username in the frontend form
        const user = await User.findOne({ email: username.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Return user data (no password)
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                memberSince: user.memberSince,
                membershipTier: user.membershipTier,
                isVIP: user.isVIP,
                benefits: user.benefits,
            },
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
});

module.exports = router;
