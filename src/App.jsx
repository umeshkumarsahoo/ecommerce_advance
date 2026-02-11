import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

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

// Components
import ScrollProvider from './components/ScrollProvider';
import NivoraNav from './components/NivoraNav'; // Updated Global Nav
import NivoraFooter from './components/NivoraFooter'; // Updated Global Footer
import Preloader from './components/Preloader';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/**
 * ConditionalNav - Only show nav/footer on pages that need it
 * Dashboard has its own sidebar, login/register have their own layout
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
 * Refactored to use Nivora Components globally and include Preloader
 */
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <AuthProvider>
        <CartProvider>
          <ScrollProvider>
            <ScrollToTop />

            <ConditionalLayout>
              <main className="min-h-screen">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/journal/:id" element={<JournalPage />} />
                  <Route path="/stories" element={<ShopByStoryPage />} />
                  <Route path="/stories/:id" element={<StoryDetailPage />} />
                  <Route path="/manifesto" element={<ManifestoPage />} />
                  <Route path="/collections" element={<CollectionsPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
            </ConditionalLayout>

          </ScrollProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

