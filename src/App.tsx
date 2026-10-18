/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Scroll restoration helper
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, search]);

  return null;
};

export default function App() {
  return (
    <LanguageProvider>
      <FavoritesProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#1E2024] antialiased selection:bg-[#C59B63]/25 selection:text-[#121316]">
            {/* Sticky Navigation */}
            <Navbar />

            {/* Main Routed Content */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/:id" element={<PropertyDetailsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Fallback route */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>

            {/* Premium Editorial Footer */}
            <Footer />
          </div>
        </Router>
      </FavoritesProvider>
    </LanguageProvider>
  );
}
