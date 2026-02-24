import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

/**
 * OrderContext - Manages order history & SuperCoin balance
 *
 * SuperCoin Rules:
 *   - Earn 1 coin per ₹100 spent (VIP earns 2×)
 *   - Redeem: 1 coin = ₹1 discount
 *   - Balance starts at 0 for every new account
 *   - Persisted per-user in localStorage
 */

const OrderContext = createContext(null);

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};

// ---------------------------------------------------------------------------
// localStorage helpers – keyed by username so each account is independent
// ---------------------------------------------------------------------------
const storageKey = (username, suffix) => `becane_${username}_${suffix}`;

const loadJSON = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
};

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export const OrderProvider = ({ children }) => {
    const { user, isVIP } = useAuth();
    const [orders, setOrders] = useState([]);
    const [superCoins, setSuperCoins] = useState(0);

    // ── Load from localStorage whenever the logged-in user changes ──
    useEffect(() => {
        if (user?.username) {
            setOrders(loadJSON(storageKey(user.username, 'orders'), []));
            setSuperCoins(loadJSON(storageKey(user.username, 'coins'), 0));
        } else {
            setOrders([]);
            setSuperCoins(0);
        }
    }, [user?.username]);

    // ── Persist whenever data changes ──
    useEffect(() => {
        if (user?.username) {
            localStorage.setItem(storageKey(user.username, 'orders'), JSON.stringify(orders));
        }
    }, [orders, user?.username]);

    useEffect(() => {
        if (user?.username) {
            localStorage.setItem(storageKey(user.username, 'coins'), JSON.stringify(superCoins));
        }
    }, [superCoins, user?.username]);

    // ── Place order ──
    const placeOrder = (orderData, coinsRedeemed = 0) => {
        // Calculate coins earned: 1 per ₹100 (VIP = 2×)
        const baseCoins = Math.floor(orderData.total / 100);
        const coinsEarned = isVIP ? baseCoins * 2 : baseCoins;

        const newOrder = {
            ...orderData,
            id: `ORD-${Date.now()}`,
            orderNumber: `BCN-2026-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
            date: new Date().toISOString(),
            status: 'Processing',
            coinsEarned,
            coinsRedeemed,
        };

        setOrders(prev => [newOrder, ...prev]);
        setSuperCoins(prev => prev + coinsEarned - coinsRedeemed);

        return newOrder;
    };

    const value = {
        orders,
        superCoins,
        placeOrder,
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContext;
