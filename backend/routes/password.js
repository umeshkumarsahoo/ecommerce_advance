const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ---------------------------------------------------------------------------
// POST /api/auth/password/reset - Simple password reset
// ---------------------------------------------------------------------------
router.post('/reset', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ success: false, message: 'Must provide email and new password' });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(404).json({ success: false, message: 'No account found with that email' });
        }

        if (newPassword.length < 5) {
            return res.status(400).json({ success: false, message: 'Password must be at least 5 characters' });
        }

        // Schema pre-save hook will hash this new password again automatically when saving
        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password successfully updated' });
    } catch (error) {
        console.error('Password reset error:', error.message);
        res.status(500).json({ success: false, message: 'Server error during password reset' });
    }
});

// ---------------------------------------------------------------------------
// POST /api/auth/password/update - Logged in user updates password
// ---------------------------------------------------------------------------
router.post('/update', async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Incorrect old password' });
        }

        if (newPassword.length < 5) {
            return res.status(400).json({ success: false, message: 'New password must be at least 5 characters' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password successfully updated' });
    } catch (error) {
        console.error('Update password error:', error.message);
        res.status(500).json({ success: false, message: 'Server error during password update' });
    }
});

module.exports = router;
