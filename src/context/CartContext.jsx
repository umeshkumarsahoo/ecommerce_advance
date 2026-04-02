import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user, isAuthenticated } = useAuth();
    
    // Convert backend item mapping back to frontend format
    const mapBackendToFrontend = (item) => ({
        id: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity
    });

    // 1. Initial Load: Merge local storage or load from DB
    useEffect(() => {
        const fetchDbCart = async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/carts/${user.id}`);
                const data = await res.json();
                if (data.success && data.cart) {
                    setCartItems(data.cart.items.map(mapBackendToFrontend));
                }
            } catch (err) {
                console.error("Failed to load cart from DB:", err);
            }
        };

        if (isAuthenticated && user?.id) {
            // Load from MongoDB
            fetchDbCart();
        } else {
            // Load from Local Storage (Guest)
            const savedCart = localStorage.getItem('luxuryCart');
            if (savedCart) setCartItems(JSON.parse(savedCart));
        }
    }, [isAuthenticated, user?.id]);

    // 2. Persist local storage for Guests
    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('luxuryCart', JSON.stringify(cartItems));
        }
    }, [cartItems, isAuthenticated]);

    /**
     * Add item to cart
     */
    const addToCart = async (product) => {
        // Optimistic UI Update
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        // DB Sync
        if (isAuthenticated && user?.id) {
            try {
                await fetch(`http://localhost:5001/api/carts/${user.id}/add`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product })
                });
            } catch (err) {
                console.error("Failed to sync cart add:", err);
            }
        }
    };

    /**
     * Remove item from cart
     */
    const removeFromCart = async (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));

        if (isAuthenticated && user?.id) {
            try {
                await fetch(`http://localhost:5001/api/carts/${user.id}/remove/${productId}`, {
                    method: 'DELETE'
                });
            } catch (err) {
                console.error("Failed to sync cart remove:", err);
            }
        }
    };

    /**
     * Update item quantity
     */
    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) {
            return removeFromCart(productId);
        }

        setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));

        if (isAuthenticated && user?.id) {
            try {
                await fetch(`http://localhost:5001/api/carts/${user.id}/update`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId, quantity })
                });
            } catch (err) {
                console.error("Failed to sync cart quantity:", err);
            }
        }
    };

    /**
     * Clear entire cart
     */
    const clearCart = async () => {
        setCartItems([]);

        if (isAuthenticated && user?.id) {
            try {
                await fetch(`http://localhost:5001/api/carts/${user.id}/clear`, {
                    method: 'DELETE'
                });
            } catch (err) {
                console.error("Failed to sync cart clear:", err);
            }
        } else {
            localStorage.removeItem('luxuryCart');
        }
    };

    // Calculate totals based on local state (to remain instantly responsive)
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cartSubtotal > 50000 ? 0 : 499; // Free shipping over ₹50,000
    const cartTotal = cartSubtotal + shipping;

    const value = {
        cartItems,
        cartCount,
        cartSubtotal,
        shipping,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
