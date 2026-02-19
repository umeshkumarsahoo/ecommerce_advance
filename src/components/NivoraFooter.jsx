import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NivoraFooter - High Impact Footer
 * 
 * Lime green background, massive ticker, black text.
 * The ultimate "Nivora" signature.
 */
const NivoraFooter = () => {
    return (
        <footer className="nivora-footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Column 1 */}
                    <div>
                        <h4 className="footer-heading">Navigate</h4>
                        <Link to="/" className="footer-link">Home</Link>
                        <Link to="/collections" className="footer-link">Collection</Link>
                        <Link to="/journal" className="footer-link">Journal</Link>
                        <Link to="/stories" className="footer-link">About</Link>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="footer-heading">Contact</h4>
                        <a href="mailto:hello@becane.com" className="footer-link">hello@becane.com</a>
                        <a href="tel:+91123456789" className="footer-link">+91 3564674883</a>
                        <p className="footer-link mt-4">12 Bhubaneswar Odisha <br />75008 India,Paris, France</p>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="footer-heading">Social</h4>
                        <a href="#" className="footer-link">Instagram</a>
                        <a href="#" className="footer-link">Twitter</a>
                        <a href="#" className="footer-link">LinkedIn</a>
                    </div>
                </div>
            </div>

            {/* Massive Ticker */}
            <div className="footer-ticker">
                <div className="ticker-content">
                    <span className="ticker-text">BECANÉ &mdash; DEFINES LUXURY</span>
                    <span className="ticker-text">BECANÉ &mdash; DEFINES LUXURY</span>
                    <span className="ticker-text">BECANÉ &mdash; DEFINES LUXURY</span>
                    <span className="ticker-text">BECANÉ &mdash; DEFINES LUXURY</span>
                </div>
            </div>

            <div className="container">
                <div className="flex-between py-8 border-t border-black/10">
                    <p className="text-sm opacity-60">© 2024 Becané. All rights reserved.</p>
                    <p className="text-sm opacity-60">Privacy Policy</p>
                </div>
            </div>

            <style>{`
                .nivora-footer .border-t {
                    border-top: 1px solid rgba(0,0,0,0.1);
                }
                .text-sm {
                    font-size: 0.8rem;
                }
                .opacity-60 {
                    opacity: 0.6;
                }
                .py-8 {
                    padding-top: 2rem;
                    padding-bottom: 2rem;
                }
            `}</style>
        </footer>
    );
};

export default NivoraFooter;
