import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute — Wrapper that guards routes behind authentication
 * 
 * If user is NOT logged in:
 *   → Redirect to /login with `state.from` so LoginPage can redirect back
 * 
 * If user IS logged in:
 *   → Render children normally
 * 
 * Usage in App.jsx:
 *   <Route path="/dashboard" element={
 *       <ProtectedRoute><DashboardPage /></ProtectedRoute>
 *   } />
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Save current location so user can be redirected back after login
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default ProtectedRoute;
