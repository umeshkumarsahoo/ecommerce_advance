import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

/**
 * ToastContext — Global notification system for the luxury eCommerce app
 * 
 * Usage:
 *   const { showToast } = useToast();
 *   showToast('Added to cart', 'success');   // green
 *   showToast('Item removed', 'info');        // blue
 *   showToast('Something went wrong', 'error'); // red
 */

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const MAX_TOASTS = 3;
const AUTO_DISMISS_MS = 3000;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const idCounter = useRef(0);

    /**
     * Show a toast notification
     * @param {string} message - Toast message
     * @param {'success'|'error'|'info'} type - Toast type for styling
     */
    const showToast = useCallback((message, type = 'info') => {
        const id = ++idCounter.current;

        setToasts(prev => {
            // If at max capacity, remove the oldest toast
            const updated = prev.length >= MAX_TOASTS ? prev.slice(1) : prev;
            return [...updated, { id, message, type, exiting: false }];
        });

        // Auto-dismiss after delay
        setTimeout(() => {
            dismissToast(id);
        }, AUTO_DISMISS_MS);
    }, []);

    /**
     * Dismiss a toast by ID (starts exit animation)
     */
    const dismissToast = useCallback((id) => {
        // Mark as exiting for animation
        setToasts(prev =>
            prev.map(t => t.id === id ? { ...t, exiting: true } : t)
        );
        // Remove after exit animation completes
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 400);
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastContext;
