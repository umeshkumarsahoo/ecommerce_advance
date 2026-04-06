import React, { createContext, useContext, useState, useEffect } from 'react';

// ---------------------------------------------------------------------------
// Benefit Constants — Used for upgrade/downgrade display
// ---------------------------------------------------------------------------
const EXCLUSIVE_BENEFITS = [
    'Free Express Shipping',
    'Early Access to Collections',
    'Exclusive Member Discount (20%)',
    'Priority Customer Support',
    'Complimentary Gift Wrapping',
    'Exclusive VIP Events Access',
];

const STANDARD_BENEFITS = [
    'Standard Shipping',
    'Member-Only Promotions',
];

// ---------------------------------------------------------------------------
// Context Creation
// ---------------------------------------------------------------------------
const AuthContext = createContext(null);

/**
 * Custom hook to access auth context
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
    const [user, setUser] = useState(null);
    const isAuthenticated = user !== null;

    // Session Persistence — Check for existing session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('luxuryUser');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                
                // CRITICAL: Validate that the ID is a valid MongoDB ObjectId (24 hex chars)
                // This prevents 500 errors from legacy IDs like "2" or "1"
                const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(parsedUser.id);
                
                if (isValidObjectId) {
                    setUser(parsedUser);
                } else {
                    console.warn("Legacy/Invalid User ID detected. Clearing session.");
                    localStorage.removeItem('luxuryUser');
                    setUser(null);
                }
            } catch {
                localStorage.removeItem('luxuryUser');
            }
        }
    }, []);

    // ---------------------------------------------------------------------------
    // LOGIN — Validates credentials against the MongoDB backend API
    // ---------------------------------------------------------------------------
    const login = async (username, password) => {
        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                localStorage.setItem('luxuryUser', JSON.stringify(data.user));
                return { success: true };
            } else {
                return { success: false, error: data.message || 'Invalid email or password.' };
            }
        } catch {
            return {
                success: false,
                error: 'Server connection failed. Please try again.',
            };
        }
    };

    // ---------------------------------------------------------------------------
    // LOGOUT — Clears auth state and removes session
    // ---------------------------------------------------------------------------
    const logout = () => {
        setUser(null);
        localStorage.removeItem('luxuryUser');
    };

    // ---------------------------------------------------------------------------
    // UPGRADE TO EXCLUSIVE — Persists to MongoDB
    // ---------------------------------------------------------------------------
    const upgradeToExclusive = async () => {
        if (!user) return { success: false, error: 'Must be logged in to upgrade' };

        try {
            const response = await fetch('http://localhost:5001/api/auth/upgrade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id }),
            });
            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                localStorage.setItem('luxuryUser', JSON.stringify(data.user));
                return { success: true };
            } else {
                return { success: false, error: data.message };
            }
        } catch {
            // Fallback: optimistic local update if server unreachable
            const upgradedUser = {
                ...user,
                isVIP: true,
                membershipTier: 'Exclusive',
                benefits: EXCLUSIVE_BENEFITS,
            };
            setUser(upgradedUser);
            localStorage.setItem('luxuryUser', JSON.stringify(upgradedUser));
            return { success: true };
        }
    };

    // ---------------------------------------------------------------------------
    // DOWNGRADE FROM EXCLUSIVE — Persists to MongoDB
    // ---------------------------------------------------------------------------
    const downgradeFromExclusive = async () => {
        if (!user) return { success: false, error: 'Must be logged in to downgrade' };

        try {
            const response = await fetch('http://localhost:5001/api/auth/downgrade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id }),
            });
            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                localStorage.setItem('luxuryUser', JSON.stringify(data.user));
                return { success: true };
            } else {
                return { success: false, error: data.message };
            }
        } catch {
            // Fallback: optimistic local update if server unreachable
            const downgradedUser = {
                ...user,
                isVIP: false,
                membershipTier: 'Standard',
                benefits: STANDARD_BENEFITS,
            };
            setUser(downgradedUser);
            localStorage.setItem('luxuryUser', JSON.stringify(downgradedUser));
            return { success: true };
        }
    };

    // ---------------------------------------------------------------------------
    // Context Value
    // ---------------------------------------------------------------------------
    const value = {
        user,
        isAuthenticated,
        isVIP: user?.isVIP || false,
        membershipTier: user?.membershipTier || null,
        login,
        logout,
        upgradeToExclusive,
        downgradeFromExclusive,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
