import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext(null);

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [superCoins, setSuperCoins] = useState(0);
    const { user, isAuthenticated } = useAuth();

    // 1. Initial Load
    useEffect(() => {
        const fetchDbOrders = async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/orders/${user.id}`);
                const data = await res.json();
                if (data.success) {
                    setOrders(data.orders);
                    setSuperCoins(user?.superCoins || 0); // Pull directly from user auth object initially
                }
            } catch (err) {
                console.error("Failed to load orders from DB:", err);
            }
        };

        if (isAuthenticated && user?.id) {
            // Load from MongoDB
            fetchDbOrders();
        } else {
            // Load from Local Storage (Guest)
            const savedOrders = localStorage.getItem('becane_orders');
            const savedCoins = localStorage.getItem('becane_supercoins');
            if (savedOrders) setOrders(JSON.parse(savedOrders));
            if (savedCoins) setSuperCoins(parseInt(savedCoins, 10));
        }
    }, [isAuthenticated, user?.id, user?.superCoins]);


    /**
     * Place a new order
     */
    const placeOrder = async (orderData) => {
        const finalAmount = orderData.total || 0;
        const discountAmount = orderData.discount || 0;
        const coinDiscount = orderData.coinDiscount || 0;
        
        let newOrder;

        if (isAuthenticated && user?.id) {
            // ── LOGGED IN: Save to Database ──
            try {
                const res = await fetch(`http://localhost:5001/api/orders/${user.id}/place`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });
                const data = await res.json();
                
                if (data.success) {
                    newOrder = data.order;
                    setOrders(prev => [newOrder, ...prev]);
                    setSuperCoins(data.superCoins); // Update coins directly from backend response
                } else {
                    throw new Error(data.message || 'Failed to place order');
                }
            } catch (err) {
                console.error("Failed to sync order:", err);
                throw err;
            }

        } else {
            // ── GUEST: Save to Local Storage ──
            const orderNumber = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString().slice(-4);
            const baseCoins = Math.floor(finalAmount / 100);
            
            newOrder = {
                id: Date.now().toString(),
                orderNumber,
                items: orderData.items,
                subtotal: orderData.subtotal,
                discount: discountAmount,
                coinDiscount,
                shipping: orderData.shipping || 0,
                total: finalAmount,
                status: 'Processing',
                date: new Date().toISOString(),
                shippingAddress: orderData.shippingAddress,
                coinsEarned: baseCoins
            };

            setOrders(prev => {
                const updatedOrders = [newOrder, ...prev];
                localStorage.setItem('becane_orders', JSON.stringify(updatedOrders));
                return updatedOrders;
            });

            setSuperCoins(prev => {
                const newCoins = Math.max(0, prev + baseCoins - coinDiscount);
                localStorage.setItem('becane_supercoins', newCoins.toString());
                return newCoins;
            });
        }

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
