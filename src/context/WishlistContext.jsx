import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

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
    const { user, isAuthenticated } = useAuth();

    // Map backend format back to frontend format
    const mapBackendToFrontend = (item) => ({
        id: item.productId,
        name: item.name,
        price: item.price,
        category: item.category,
        image: item.image
    });

    // 1. Initial Load
    useEffect(() => {
        const fetchDbWishlist = async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/wishlists/${user.id}`);
                const data = await res.json();
                if (data.success && data.wishlist) {
                    setWishlistItems(data.wishlist.items.map(mapBackendToFrontend));
                }
            } catch (err) {
                console.error("Failed to load wishlist from DB:", err);
            }
        };

        if (isAuthenticated && user?.id) {
            fetchDbWishlist();
        } else {
            const saved = localStorage.getItem('becane_wishlist');
            if (saved) {
                try {
                    setWishlistItems(JSON.parse(saved));
                } catch {
                    localStorage.removeItem('becane_wishlist');
                }
            }
        }
    }, [isAuthenticated, user?.id]);

    // 2. Persist to localStorage for Guests
    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('becane_wishlist', JSON.stringify(wishlistItems));
        }
    }, [wishlistItems, isAuthenticated]);

    /**
     * Toggle a product in/out of the wishlist
     */
    const toggleWishlist = useCallback(async (product) => {
        // Optimistic UI updates
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

        // DB Sync
        if (isAuthenticated && user?.id) {
            try {
                await fetch(`http://localhost:5001/api/wishlists/${user.id}/toggle`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product })
                });
            } catch (err) {
                console.error("Failed to sync wishlist toggle:", err);
            }
        }
    }, [showToast, isAuthenticated, user?.id]);

    /**
     * Check if a product is in the wishlist
     */
    const isWishlisted = useCallback((productId) => {
        return wishlistItems.some(item => item.id === productId);
    }, [wishlistItems]);

    /**
     * Remove a product from the wishlist (no toggle)
     */
    const removeFromWishlist = useCallback(async (productId) => {
        const item = wishlistItems.find(i => i.id === productId);
        setWishlistItems(prev => prev.filter(i => i.id !== productId));
        if (item) {
            showToast(`${item.name} removed from wishlist`, 'info');
        }

        if (isAuthenticated && user?.id) {
            try {
                await fetch(`http://localhost:5001/api/wishlists/${user.id}/remove/${productId}`, {
                    method: 'DELETE'
                });
            } catch (err) {
                console.error("Failed to sync wishlist removal:", err);
            }
        }
    }, [wishlistItems, showToast, isAuthenticated, user?.id]);

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
