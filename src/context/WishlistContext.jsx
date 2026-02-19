import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

/**
 * WishlistContext — Global wishlist state with localStorage persistence
 *
 * Features:
 * - Toggle items in/out of wishlist
 * - Check if an item is wishlisted
 * - Persist to localStorage
 * - Toast feedback on add/remove
 */

const WishlistContext = createContext(null);

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const { showToast } = useToast();

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('becane_wishlist');
        if (saved) {
            try {
                setWishlistItems(JSON.parse(saved));
            } catch {
                localStorage.removeItem('becane_wishlist');
            }
        }
    }, []);

    // Persist to localStorage on change
    useEffect(() => {
        localStorage.setItem('becane_wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    /**
     * Toggle a product in/out of the wishlist
     * @param {Object} product - { id, name, price, category, image }
     */
    const toggleWishlist = useCallback((product) => {
        setWishlistItems(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                showToast(`${product.name} removed from wishlist`, 'info');
                return prev.filter(item => item.id !== product.id);
            } else {
                showToast(`${product.name} added to wishlist`, 'success');
                return [...prev, {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    image: product.image || product.images?.[0] || '',
                }];
            }
        });
    }, [showToast]);

    /**
     * Check if a product is in the wishlist
     */
    const isWishlisted = useCallback((productId) => {
        return wishlistItems.some(item => item.id === productId);
    }, [wishlistItems]);

    /**
     * Remove a product from the wishlist (no toggle)
     */
    const removeFromWishlist = useCallback((productId) => {
        const item = wishlistItems.find(i => i.id === productId);
        setWishlistItems(prev => prev.filter(i => i.id !== productId));
        if (item) {
            showToast(`${item.name} removed from wishlist`, 'info');
        }
    }, [wishlistItems, showToast]);

    const wishlistCount = wishlistItems.length;

    const value = {
        wishlistItems,
        wishlistCount,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;
