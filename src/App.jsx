import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';

// Styles
import './index.css';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JournalPage from './pages/JournalPage';
import ShopByStoryPage from './pages/ShopByStoryPage';
import ManifestoPage from './pages/ManifestoPage';
import CollectionsPage from './pages/CollectionsPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import StoryDetailPage from './pages/StoryDetailPage';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';
import WishlistPage from './pages/WishlistPage';

// Components
import ScrollProvider from './components/ScrollProvider';
import NivoraNav from './components/NivoraNav';
import NivoraFooter from './components/NivoraFooter';
import Preloader from './components/Preloader';
import ToastContainer from './components/ToastContainer';
import ProtectedRoute from './components/ProtectedRoute';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/**
 * ConditionalLayout - Only show nav/footer on pages that need it
 * Login/register have their own layout
 */
const ConditionalLayout = ({ children }) => {
  const { pathname } = useLocation();

  // Pages that have their own navigation/layout
  const hideNavPages = ['/login', '/register'];
  const shouldHideNav = hideNavPages.some(page => pathname.startsWith(page));

  return (
    <>
      {!shouldHideNav && <NivoraNav />}
      {children}
      {!shouldHideNav && <NivoraFooter />}
    </>
  );
};

/**
 * App Component - Main Application Router
 * Includes Preloader, Toast system, and Protected Routes
 */
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <WishlistProvider>
              <ScrollProvider>
                <ScrollToTop />
                <ToastContainer />

                <ConditionalLayout>
                  <main className="min-h-screen">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/dashboard" element={
                        <ProtectedRoute><DashboardPage /></ProtectedRoute>
                      } />
                      <Route path="/cart" element={
                        <ProtectedRoute><CartPage /></ProtectedRoute>
                      } />
                      <Route path="/payment" element={
                        <ProtectedRoute><PaymentPage /></ProtectedRoute>
                      } />
                      <Route path="/order-confirmation" element={
                        <ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>
                      } />
                      <Route path="/wishlist" element={
                        <ProtectedRoute><WishlistPage /></ProtectedRoute>
                      } />
                      <Route path="/journal" element={<JournalPage />} />
                      <Route path="/journal/:id" element={<JournalPage />} />
                      <Route path="/stories" element={<ShopByStoryPage />} />
                      <Route path="/stories/:id" element={<StoryDetailPage />} />
                      <Route path="/manifesto" element={<ManifestoPage />} />
                      <Route path="/collections" element={<CollectionsPage />} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>
                </ConditionalLayout>

              </ScrollProvider>
            </WishlistProvider>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

