import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer.jsx - "The Final Impression"
 * 
 * EDUCATIONAL NOTE:
 * A footer in luxury design is not a dumping ground for links. 
 * It is a structured summary of the brand.
 * 
 * DESIGN PATTERNS:
 * 1. Massive Brand Name: Placing the logo large and low opacity creates
 *    a "watermark" effect, reinforcing brand identity subtly.
 * 2. Grid Layout: 3-column layouts act as a stable foundation.
 * 3. Minimalist Inputs: The newsletter form is stripped of borders (except bottom)
 *    to feel less like a "form" and more like an "invitation".
 */

const Footer = () => {
    return (
        <footer className="footer section" style={{ background: '#080808', paddingTop: '6rem', paddingBottom: '3rem' }}>
            <div className="container">

                {/* 
                    BRAND WATERMARK
                    Low opacity (0.1) allows it to be huge without competing for attention.
                */}
                <div className="footer-top" style={{ marginBottom: '6rem' }}>
                    <h2 className="text-display-xl font-serif" style={{ opacity: 0.1, textAlign: 'center', userSelect: 'none' }}>BECANÉ</h2>
                </div>

                {/* 
                    NAVIGATION GRID
                    Uses CSS Grid for perfect alignment. On mobile, this stacks (handled in global CSS).
                */}
                <div className="footer-grid grid-cols-3 text-meta" style={{ marginBottom: '6rem', alignItems: 'start' }}>
                    <div className="footer-col">
                        <h4 style={{ color: '#fff', marginBottom: '1.5rem' }}>Navigation</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><Link to="/" className="hover-underline">Home</Link></li>
                            <li><Link to="/journal" className="hover-underline">Journal</Link></li>
                            <li><Link to="/stories" className="hover-underline">Stories</Link></li>
                            <li><Link to="/manifesto" className="hover-underline">Philosophy</Link></li>
                            <li><Link to="/collections" className="hover-underline">Collections</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 style={{ color: '#fff', marginBottom: '1.5rem' }}>Social</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><a href="#" className="hover-underline">Instagram</a></li>
                            <li><a href="#" className="hover-underline">Twitter / X</a></li>
                            <li><a href="#" className="hover-underline">LinkedIn</a></li>
                        </ul>
                    </div>

                    <div className="footer-col" style={{ textAlign: 'right' }}>
                        <h4 style={{ color: '#fff', marginBottom: '1.5rem' }}>Newsletter</h4>
                        {/* Minimalist Form Design */}
                        <div className="newsletter-form" style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', display: 'flex' }}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#fff',
                                    width: '100%',
                                    outline: 'none',
                                    fontFamily: 'var(--font-sans)'
                                }}
                            />
                            <button className="text-meta hover-underline">Join</button>
                        </div>
                    </div>
                </div>

                {/* 
                    COPYRIGHT & CREDITS
                    The "sign-off" of the digital experience.
                */}
                <div className="footer-bottom flex-between text-meta" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', color: 'var(--text-muted)' }}>
                    <p>&copy; 2026 Becané. All rights reserved.</p>
                    <p style={{ letterSpacing: '0.05em' }}>Designed by Aditi · Ayushkant · Umesh</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
