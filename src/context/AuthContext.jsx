import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * AuthContext - Manages authentication state for the luxury eCommerce app
 * 
 * HARDCODED CREDENTIALS (Demo Only):
 * Username: "od"
 * Password: "password"
 */

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for existing session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('luxuryUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    /**
     * Login with hardcoded credentials
     * @param {string} username 
     * @param {string} password 
     * @returns {{ success: boolean, error?: string }}
     */
    const login = (username, password) => {
        // Hardcoded credentials check
        if (username === 'od' && password === 'password') {
            const userData = {
                id: 1,
                username: 'od',
                name: 'VIP Member',
                email: 'vip@lumiere.com',
                memberSince: '2024'
            };
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('luxuryUser', JSON.stringify(userData));
            return { success: true };
        }
        return { success: false, error: 'Invalid credentials. Please try again.' };
    };

    /**
     * Logout - Clear auth state
     */
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('luxuryUser');
    };

    const value = {
        user,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
