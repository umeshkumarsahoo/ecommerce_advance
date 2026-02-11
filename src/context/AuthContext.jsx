import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * ============================================================================
 * AuthContext - Manages authentication state for the luxury eCommerce app
 * ============================================================================
 * 
 * HARDCODED CREDENTIALS (Demo Only):
 * 
 * EXCLUSIVE MEMBER:
 *   - Username: "vip"
 *   - Password: "vip123"
 *   - Features: Exclusive member access, priority support, 20% discounts
 * 
 * STANDARD MEMBER:
 *   - Username: "user"
 *   - Password: "user123"
 *   - Features: Standard member, can upgrade to Exclusive
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
        membershipTier: 'Exclusive',
        benefits: [
            'Free Express Shipping',
            'Early Access to Collections',
            'Exclusive Member Discount (20%)',
            'Priority Customer Support',
            'Complimentary Gift Wrapping',
            'Exclusive VIP Events Access'
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
    // UPGRADE TO EXCLUSIVE FUNCTION
    // Allows non-Exclusive users to upgrade their membership
    // ---------------------------------------------------------------------------
    const upgradeToExclusive = () => {
        if (!user) return { success: false, error: 'Must be logged in to upgrade' };

        // Get Exclusive benefits from database
        const exclusiveBenefits = USERS_DATABASE.vip.benefits;

        // Update user with Exclusive status
        const upgradedUser = {
            ...user,
            isVIP: true,
            membershipTier: 'Exclusive',
            benefits: exclusiveBenefits
        };

        // Update state and persist
        setUser(upgradedUser);
        localStorage.setItem('luxuryUser', JSON.stringify(upgradedUser));

        return { success: true };
    };

    // ---------------------------------------------------------------------------
    // DOWNGRADE FROM EXCLUSIVE FUNCTION
    // Allows Exclusive users to cancel and return to Standard membership
    // ---------------------------------------------------------------------------
    const downgradeFromExclusive = () => {
        if (!user) return { success: false, error: 'Must be logged in to downgrade' };

        // Get Standard benefits from database
        const standardBenefits = USERS_DATABASE.user.benefits;

        // Revert user to Standard status
        const downgradedUser = {
            ...user,
            isVIP: false,
            membershipTier: 'Standard',
            benefits: standardBenefits
        };

        // Update state and persist
        setUser(downgradedUser);
        localStorage.setItem('luxuryUser', JSON.stringify(downgradedUser));

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
        upgradeToExclusive,
        downgradeFromExclusive
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
