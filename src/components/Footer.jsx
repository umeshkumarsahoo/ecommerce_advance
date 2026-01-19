import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer - "The Foundation"
 * 
 * Grand, architectural footer with proper contrast.
 * Newsletter, navigation links, and designer credits.
 */
const Footer = () => {
    return (
        <footer
            className="footer pt-5 pb-4"
            style={{
                backgroundColor: 'var(--footer-bg, #111)',
                color: 'var(--footer-text, #F3F3F3)',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >

            {/* Top Section: Newsletter & Links */}
            <div className="container-fluid px-4 px-md-5 pt-5">
                <div className="row g-5">

                    {/* Newsletter Column */}
                    <div className="col-lg-5 mb-5 mb-lg-0">
                        <h3 className="h2 font-serif mb-4" style={{ fontWeight: 400, color: '#F3F3F3' }}>
                            Stay in the know.
                        </h3>
                        <p className="mb-4" style={{ maxWidth: '350px', color: '#999', fontSize: '0.95rem' }}>
                            Receive updates on new collections, exclusive events, and editorial stories.
                        </p>
                        <form className="d-flex border-bottom pb-2" style={{ maxWidth: '400px', borderColor: '#444 !important' }}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-transparent border-0 w-100"
                                style={{ outline: 'none', color: '#F3F3F3' }}
                            />
                            <button
                                type="submit"
                                className="btn btn-link text-decoration-none p-0 text-uppercase"
                                style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: '#D4AF37' }}
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Spacer */}
                    <div className="col-lg-1 d-none d-lg-block"></div>

                    {/* Links Columns */}
                    <div className="col-6 col-lg-2">
                        <h4 className="text-meta mb-4" style={{ color: '#666', letterSpacing: '0.15em' }}>Shop</h4>
                        <ul className="list-unstyled d-flex flex-column gap-3">
                            <li><a href="#" className="text-decoration-none" style={{ color: '#CCC' }}>New Arrivals</a></li>
                            <li><a href="#" className="text-decoration-none" style={{ color: '#CCC' }}>Ready-to-Wear</a></li>
                            <li><a href="#" className="text-decoration-none" style={{ color: '#CCC' }}>Accessories</a></li>
                            <li><a href="#" className="text-decoration-none" style={{ color: '#CCC' }}>Gift Guide</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-2">
                        <h4 className="text-meta mb-4" style={{ color: '#666', letterSpacing: '0.15em' }}>Help</h4>
                        <ul className="list-unstyled d-flex flex-column gap-3">
                            <li><a href="#" className="text-decoration-none" style={{ color: '#CCC' }}>Contact Us</a></li>
                            <li><a href="#" className="text-decoration-none" style={{ color: '#CCC' }}>Shipping</a></li>
                            <li><a href="#" className="text-decoration-none" style={{ color: '#CCC' }}>Returns</a></li>
                            <li><a href="#" className="text-decoration-none" style={{ color: '#CCC' }}>Size Guide</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-2">
                        <h4 className="text-meta mb-4" style={{ color: '#666', letterSpacing: '0.15em' }}>Connect</h4>
                        <ul className="list-unstyled d-flex flex-column gap-3">
                            <li><a href="#" className="text-decoration-none" style={{ color: '#CCC' }}>Instagram</a></li>
                            <li><a href="#" className="text-decoration-none" style={{ color: '#CCC' }}>Pinterest</a></li>
                            <li><a href="#" className="text-decoration-none" style={{ color: '#CCC' }}>The Journal</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-2">
                        <h4 className="text-meta mb-4" style={{ color: '#666', letterSpacing: '0.15em' }}>Account</h4>
                        <ul className="list-unstyled d-flex flex-column gap-3">
                            <li><Link to="/login" className="text-decoration-none" style={{ color: '#CCC' }}>Sign In</Link></li>
                            <li><Link to="/register" className="text-decoration-none" style={{ color: '#CCC' }}>Create Account</Link></li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Section: Brand Watermark & Copyright */}
            <div className="container-fluid px-4 px-md-5 text-center overflow-hidden mt-5">
                <h1
                    className="font-serif mb-4 opacity-10"
                    style={{
                        fontSize: 'clamp(4rem, 15vw, 12rem)',
                        lineHeight: 0.85,
                        color: '#333',
                        fontWeight: 400
                    }}
                >
                    BECANE
                </h1>
                <div
                    className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 pb-4"
                    style={{ fontSize: '0.7rem', color: '#666' }}
                >
                    <span>© 2026 BECANE. All Rights Reserved.</span>
                    <span style={{ color: '#888' }}>Designed by Aditi · Ayushkant · Umesh</span>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
