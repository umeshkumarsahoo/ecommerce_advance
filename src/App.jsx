import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JournalPage from './pages/JournalPage';
import ShopByStoryPage from './pages/ShopByStoryPage';
import ManifestoPage from './pages/ManifestoPage';

/**
 * App Component - Main Application Router
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/stories" element={<ShopByStoryPage />} />
        <Route path="/manifesto" element={<ManifestoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
