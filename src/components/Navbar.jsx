import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import gsap from 'gsap'; // Reserved for future complex menu animations

/**
 * Navbar.jsx
 * 
 * DESIGN PHILOSOPHY:
 * The navigation bar serves as the "anchor" of the luxury experience. 
 * Unlike standard headers, it floats above the content, letting the imagery underneath
 * bleed through. This transparency creates depth and immersion.
 * 
 * TECHNICAL APPROACH:
 * - We use a `scrolled` state to detect when the user has moved down the page.
 * - Glassmorphism (blur + semi-transparent bg) is applied only on scroll to ensure
 *   maximum legibility when content passes under navigation.
 * - CSS transitions handle the smooth morphing from transparent to glass.
 */

const Navbar = () => {
  const location = useLocation();
  // We can use isHome to apply different styles if needed (e.g. transparent on home, solid elsewhere)
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll Listener: Optimize performance by avoiding heavy calculations in the loop
  useEffect(() => {
    const handleScroll = () => {
      // Toggle state only when crossing the threshold to minimize re-renders
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Future: Add GSAP timeline here for a full-screen menu reveal
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* 
        Container Structure: 
        We use 'flex-between' to push the logo and actions to the edges,
        centering the navigation links visually if possible, or keeping a clean layout.
      */}
      <div className={`navbar-container container flex-between`} style={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        // Smooth transition for the background change
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        // Dynamic styles based on state
        background: scrolled ? 'rgba(12, 12, 12, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        height: scrolled ? '80px' : '100px',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent'
      }}>

        {/* LOGO: Serif typography acts as the primary brand stamp */}
        <Link to="/" className="navbar-brand text-display-md font-serif" style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          position: 'relative',
          zIndex: 1002
        }}>
          BECANÉ.
        </Link>

        {/* 
          DESKTOP NAVIGATION: 
          Simple text links with a rigorous hover effect. 
          Hidden on mobile to preserve minimalism.
        */}
        <nav className="navbar-links desktop-only" style={{ display: 'flex', gap: '3rem' }}>
          <NavLink to="/journal" label="Journal" />
          <NavLink to="/stories" label="Stories" />
          <NavLink to="/manifesto" label="Philosophy" />
          <NavLink to="/collections" label="Collections" />
          <NavLink to="/contact" label="Contact" />
        </nav>

        {/* 
          ACTIONS: 
          Functional links (Account, Cart) kept separate to distinct
          utility from discovery.
        */}
        <div className="navbar-actions" style={{ display: 'flex', gap: '2rem', zIndex: 1002 }}>
          <Link to="/login" className="text-meta hover-underline">Account</Link>
          <Link to="/cart" className="text-meta hover-underline">Cart (0)</Link>
        </div>
      </div>

      {/* Mobile Menu Styling Hook */}
      <style>{`
          @media (max-width: 768px) {
              .desktop-only { display: none !important; }
              /* Mobile menu icon would go here */
          }
      `}</style>
    </header>
  );
};

// Sub-component for clean, repetitive link rendering
const NavLink = ({ to, label }) => (
  <Link to={to} className="nav-link text-meta hover-underline" style={{ fontSize: '0.8rem', letterSpacing: '0.15em' }}>
    {label}
  </Link>
);

export default Navbar;
