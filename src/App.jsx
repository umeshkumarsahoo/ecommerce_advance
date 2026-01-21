import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// Note: Framer Motion isn't in package.json, but user said "React functional components only" and "GSAP allowed".
// I should stick to GSAP or simple React.
// Actually, simple React Router is fine.
// I will just use standard routing.

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Ensure my styles are loaded

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JournalPage from './pages/JournalPage';
import ShopByStoryPage from './pages/ShopByStoryPage';
import ManifestoPage from './pages/ManifestoPage';
import CollectionsPage from './pages/CollectionsPage';
import ContactPage from './pages/ContactPage';

// Components
import ScrollProvider from './components/ScrollProvider';

/**
 * App Component - Main Application Router
 */
function App() {
  return (
    <BrowserRouter>
      <ScrollProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/stories" element={<ShopByStoryPage />} />
          <Route path="/manifesto" element={<ManifestoPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </ScrollProvider>
    </BrowserRouter>
  );
}

export default App;
