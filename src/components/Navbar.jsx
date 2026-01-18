import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * Navbar - "The Header"
 * 
 * Minimal luxury navigation with:
 * - Brand logo (left)
 * - Navigation links (center - desktop only)
 * - Dark/Light toggle + Login (right)
 * - Mobile hamburger menu
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode on body
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <>
      <nav
        className={`fixed-top w-100 px-4 px-md-5 py-3 py-md-4 d-flex justify-content-between align-items-center`}
        style={{
          zIndex: 1000,
          transition: 'background-color 0.5s, backdrop-filter 0.5s',
          backgroundColor: scrolled ? 'rgba(243, 243, 243, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          color: scrolled ? '#111' : 'white',
          mixBlendMode: scrolled ? 'normal' : 'difference'
        }}
      >
        {/* Left: Brand */}
        <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>
          <span className="font-serif h5 h4-md mb-0" style={{ letterSpacing: '-0.02em', fontWeight: 600 }}>
            BECANE.
          </span>
        </a>

        {/* Center: Desktop Menu */}
        <div className="d-none d-lg-flex gap-5 position-absolute start-50 translate-middle-x">
          {['Collection', 'Journal', 'About'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-decoration-none text-uppercase"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: 'inherit'
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="d-flex align-items-center gap-3 gap-md-4">
          {/* Dark/Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="btn btn-link p-0 text-decoration-none"
            style={{ color: 'inherit', fontSize: '0.7rem', letterSpacing: '0.1em' }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Login - Desktop */}
          <a
            href="#login"
            className="text-decoration-none text-uppercase d-none d-md-block"
            style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'inherit' }}
          >
            Login
          </a>

          {/* Mobile Menu Button */}
          <button
            className="btn btn-link p-0 d-lg-none"
            onClick={() => setMenuOpen(true)}
            style={{ color: 'inherit' }}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`position-fixed top-0 start-0 w-100 vh-100 d-flex flex-column justify-content-center align-items-center ${menuOpen ? 'visible' : 'invisible'}`}
        style={{
          zIndex: 1001,
          backgroundColor: 'var(--bg-color, #F3F3F3)',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.4s ease, visibility 0.4s ease'
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="position-absolute top-0 end-0 m-4 btn btn-link text-decoration-none display-4"
          style={{ color: 'var(--text-main, #111)' }}
          aria-label="Close menu"
        >
          ×
        </button>

        <nav className="d-flex flex-column gap-4 text-center">
          {['Collection', 'Journal', 'About', 'Login', 'Signup'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-decoration-none font-serif display-5"
              style={{ color: 'var(--text-main, #111)' }}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
