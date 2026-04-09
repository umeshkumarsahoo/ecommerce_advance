const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * POST /api/auth/register
 * Register a new user with validation for email uniqueness and password strength.
 */
router.post('/register', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // Basic presence validation
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required (name, email, mobile, password)',
            });
        }

        // Check for existing account
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'An account with this email already exists',
            });
        }

        // Business Logic Validation: 10-digit mobile
        if (!/^[0-9]{10}$/.test(mobile)) {
            return res.status(400).json({
                success: false,
                message: 'Mobile number must be exactly 10 digits',
            });
        }

        // Password Security Policies
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

        const user = await User.create({ name, email, mobile, password });

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
                superCoins: user.superCoins,
            },
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'An account with this email already exists',
            });
        }
        console.error('Registration error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error during registration.',
        });
    }
});

/**
 * POST /api/auth/login
 * Authenticate user credentials and return profile data.
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both username (email) and password',
            });
        }

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
                superCoins: user.superCoins,
            },
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error during login.',
        });
    }
});

/**
 * POST /api/auth/upgrade
 * Promote user to VIP status with enhanced benefits.
 */
router.post('/upgrade', async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'userId is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.isVIP = true;
        user.membershipTier = 'Exclusive';
        user.benefits = [
            'Free Express Shipping',
            'Early Access to Collections',
            'Exclusive Member Discount (20%)',
            'Priority Customer Support',
            'Complimentary Gift Wrapping',
            'Exclusive VIP Events Access',
        ];
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Upgraded to Exclusive membership!',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                memberSince: user.memberSince,
                membershipTier: user.membershipTier,
                isVIP: user.isVIP,
                benefits: user.benefits,
                superCoins: user.superCoins,
            },
        });
    } catch (error) {
        console.error('Upgrade error:', error.message);
        res.status(500).json({ success: false, message: 'Server error during upgrade' });
    }
});

/**
 * POST /api/auth/downgrade
 * Revert user to Standard membership tier.
 */
router.post('/downgrade', async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'userId is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.isVIP = false;
        user.membershipTier = 'Standard';
        user.benefits = ['Standard Shipping', 'Member-Only Promotions'];
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Downgraded to Standard membership.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                memberSince: user.memberSince,
                membershipTier: user.membershipTier,
                isVIP: user.isVIP,
                benefits: user.benefits,
                superCoins: user.superCoins,
            },
        });
    } catch (error) {
        console.error('Downgrade error:', error.message);
        res.status(500).json({ success: false, message: 'Server error during downgrade' });
    }
});

module.exports = router;

