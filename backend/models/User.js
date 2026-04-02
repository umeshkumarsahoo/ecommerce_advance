const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema — BECANÉ eCommerce
 * 
 * Fields match the RegisterPage form + membership defaults
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        match: [/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [5, 'Password must be at least 5 characters'],
    },
    memberSince: {
        type: String,
        default: () => new Date().getFullYear().toString(),
    },
    isVIP: {
        type: Boolean,
        default: false,
    },
    membershipTier: {
        type: String,
        enum: ['Standard', 'Exclusive'],
        default: 'Standard',
    },
    benefits: {
        type: [String],
        default: ['Standard Shipping', 'Member-Only Promotions'],
    },
    superCoins: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true, // adds createdAt & updatedAt
});

// ---------------------------------------------------------------------------
// Pre-save hook — Hash password before saving to DB
// ---------------------------------------------------------------------------
userSchema.pre('save', async function (next) {
    // Only hash if password is new or modified
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// ---------------------------------------------------------------------------
// Instance method — Compare entered password with hashed password
// (useful later when implementing login)
// ---------------------------------------------------------------------------
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
