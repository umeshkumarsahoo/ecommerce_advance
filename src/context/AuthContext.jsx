import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * ============================================================================
 * AuthContext - Manages authentication state for the luxury eCommerce app
 * ============================================================================
 * 
 * HARDCODED CREDENTIALS (Demo Only):
 * 
 * VIP USER:
 *   - Username: "vip"
 *   - Password: "vip123"
 *   - Features: Exclusive member access, priority support, VIP discounts
 * 
 * NON-VIP USER:
 *   - Username: "user"
 *   - Password: "user123"
 *   - Features: Standard member, can upgrade to Pro/VIP
 * 
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// HARDCODED USER DATABASE
// In a real app, this would come from a backend API
// ---------------------------------------------------------------------------
const USERS_DATABASE = {
    vip: {
        id: 1,
        username: 'vip',
        password: 'vip123',
        name: 'Alexandra Sterling',
        email: 'alexandra@lumiere.com',
        memberSince: '2023',
        isVIP: true,
        membershipTier: 'VIP',
        benefits: [
            'Free Express Shipping',
            'Early Access to Collections',
            'Exclusive VIP Discounts (20%)',
            'Priority Customer Support',
            'Complimentary Gift Wrapping'
        ]
    },
    user: {
        id: 2,
        username: 'user',
        password: 'user123',
        name: 'Jordan Mitchell',
        email: 'jordan@example.com',
        memberSince: '2025',
        isVIP: false,
        membershipTier: 'Standard',
        benefits: [
            'Standard Shipping',
            'Member-Only Promotions'
        ]
    }
};

// ---------------------------------------------------------------------------
// Context Creation
// ---------------------------------------------------------------------------
const AuthContext = createContext(null);

/**
 * Custom hook to access auth context
 * Throws error if used outside of AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// ---------------------------------------------------------------------------
// Auth Provider Component
// ---------------------------------------------------------------------------
export const AuthProvider = ({ children }) => {
    // User state - null when not logged in
    const [user, setUser] = useState(null);

    // Computed authentication status
    const isAuthenticated = user !== null;

    // ---------------------------------------------------------------------------
    // Session Persistence - Check for existing session on mount
    // ---------------------------------------------------------------------------
    useEffect(() => {
        const savedUser = localStorage.getItem('luxuryUser');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
            } catch (error) {
                // Invalid JSON in localStorage - clear it
                localStorage.removeItem('luxuryUser');
            }
        }
    }, []);

    // ---------------------------------------------------------------------------
    // LOGIN FUNCTION
    // Validates credentials against our hardcoded database
    // ---------------------------------------------------------------------------
    const login = (username, password) => {
        // Convert username to lowercase for case-insensitive matching
        const normalizedUsername = username.toLowerCase().trim();

        // Look up user in our database
        const dbUser = USERS_DATABASE[normalizedUsername];

        // Validate credentials
        if (dbUser && dbUser.password === password) {
            // Create user data object (excluding password for security)
            const userData = {
                id: dbUser.id,
                username: dbUser.username,
                name: dbUser.name,
                email: dbUser.email,
                memberSince: dbUser.memberSince,
                isVIP: dbUser.isVIP,
                membershipTier: dbUser.membershipTier,
                benefits: dbUser.benefits
            };

            // Update state and persist to localStorage
            setUser(userData);
            localStorage.setItem('luxuryUser', JSON.stringify(userData));

            return { success: true };
        }

        // Invalid credentials
        return {
            success: false,
            error: 'Invalid username or password. Please try again.'
        };
    };

    // ---------------------------------------------------------------------------
    // LOGOUT FUNCTION
    // Clears auth state and removes session from localStorage
    // ---------------------------------------------------------------------------
    const logout = () => {
        setUser(null);
        localStorage.removeItem('luxuryUser');
    };

    // ---------------------------------------------------------------------------
    // UPGRADE TO VIP FUNCTION
    // Allows non-VIP users to upgrade their membership
    // ---------------------------------------------------------------------------
    const upgradeToVIP = (tier = 'VIP') => {
        if (!user) return { success: false, error: 'Must be logged in to upgrade' };

        // Get VIP benefits from database
        const vipBenefits = USERS_DATABASE.vip.benefits;

        // Update user with VIP status
        const upgradedUser = {
            ...user,
            isVIP: true,
            membershipTier: tier,
            benefits: vipBenefits
        };

        // Update state and persist
        setUser(upgradedUser);
        localStorage.setItem('luxuryUser', JSON.stringify(upgradedUser));

        return { success: true };
    };

    // ---------------------------------------------------------------------------
    // Context Value - All auth-related state and functions
    // ---------------------------------------------------------------------------
    const value = {
        user,
        isAuthenticated,
        isVIP: user?.isVIP || false,
        membershipTier: user?.membershipTier || null,
        login,
        logout,
        upgradeToVIP
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
