import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * CartContext - Manages shopping cart state for the luxury eCommerce app
 * 
 * Features:
 * - Add/remove items
 * - Update quantities
 * - Calculate totals
 * - Persist to localStorage
 */

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

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('luxuryCart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('luxuryCart', JSON.stringify(cartItems));
    }, [cartItems]);

    /**
     * Add item to cart
     */
    const addToCart = (product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    /**
     * Remove item from cart
     */
    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    /**
     * Update item quantity
     */
    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    /**
     * Clear entire cart
     */
    const clearCart = () => {
        setCartItems([]);
    };

    // Calculated values
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cartSubtotal > 500 ? 0 : 25; // Free shipping over $500
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
