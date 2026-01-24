import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

/**
 * NivoraNav - Hybrid Minimal Luxury Navigation
 * 
 * LAYOUT FIX:
 * - "HOME getting cropped from top" - Adjusted vertical centering and padding.
 * - Reduced initial y-offset in entry animation to prevent clipping during transition.
 */
const NivoraNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        gsap.fromTo('.nivora-nav',
            { y: -30, opacity: 0 }, // Reduced from -100 to prevent clipping
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
        );

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            gsap.to('.nav-menu', {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 0.6,
                ease: 'power4.inOut'
            });
            gsap.fromTo('.menu-item',
                { y: 60, opacity: 0, rotateX: 20 },
                { y: 0, opacity: 1, rotateX: 0, stagger: 0.08, delay: 0.3, duration: 0.8, ease: 'power3.out' }
            );
        } else {
            gsap.to('.nav-menu', {
                clipPath: 'inset(0% 0% 100% 0%)',
                duration: 0.5,
                ease: 'power3.inOut'
            });
        }
    }, [menuOpen]);

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'Collection', path: '/collections' },
        { label: 'Editorial', path: '/journal' },
        { label: 'About', path: '/stories' },
        { label: 'Contact', path: '/contact' },
        { label: 'Login', path: '/login' }
    ];

    return (
        <>
            <header className={`nivora-nav ${scrolled ? 'scrolled' : ''}`}>
                <button
                    className={`nav-toggle ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                </button>

                <Link to="/" className="nav-brand">BECANÉ</Link>

                <div className="nav-right">
                    <Link to="/cart" className="nav-link">CART (0)</Link>
                </div>
            </header>

            <nav className="nav-menu">
                <div className="menu-inner-scroll">
                    <div className="menu-container">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className="menu-item"
                                onClick={() => setMenuOpen(false)}
                            >
                                <span className="menu-item-text">{item.label}</span>
                                <span className="menu-item-number">0{index + 1}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="menu-footer">
                        <div className="menu-footer-col">
                            <span>Socials</span>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-[#B1DD34]">Instagram</a>
                                <a href="#" className="hover:text-[#B1DD34]">Twitter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <style>{`
                .nivora-nav {
                    position: fixed; top: 0; left: 0; right: 0; height: var(--header-height);
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 0 var(--spacing-container); z-index: 1000;
                    transition: background-color 0.3s ease, border 0.3s ease;
                }
                .nivora-nav.scrolled {
                    background: rgba(0, 0, 0, 0.95); border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .nav-toggle {
                    width: 30px; height: 20px; position: relative; cursor: pointer; z-index: 1001;
                    display: flex; flex-direction: column; justify-content: space-between;
                }
                .nav-toggle span {
                    display: block; width: 100%; height: 2px; background-color: var(--text-primary);
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
                }
                .nav-toggle.active span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
                .nav-toggle.active span:nth-child(2) { transform: translateY(-9px) rotate(-45deg); }
                .nav-brand {
                    font-family: var(--font-display); font-size: 1.25rem; font-weight: 600;
                    letter-spacing: 0.15em; color: var(--text-primary);
                    position: absolute; left: 50%; transform: translateX(-50%); z-index: 1001;
                }
                .nav-right { z-index: 1001; }
                .nav-link {
                    font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;
                    color: var(--text-primary); font-weight: 500;
                }
                
                .nav-menu {
                    position: fixed; inset: 0; background-color: var(--bg-primary); z-index: 999;
                    clip-path: inset(0% 0% 100% 0%);
                }
                
                .menu-inner-scroll {
                    width: 100%; height: 100%; overflow-y: auto;
                    display: flex; flex-direction: column; 
                    /* FIX: Center vertically but ensure enough top room */
                    justify-content: center;
                    padding: 100px var(--spacing-container) 40px; 
                }

                .menu-container {
                    display: flex; flex-direction: column;
                    gap: 0.25rem; 
                    margin-bottom: 2rem;
                }

                .menu-item {
                    font-family: var(--font-display); 
                    font-size: clamp(2.5rem, 8vw, 6rem);
                    font-weight: 700; text-transform: uppercase; color: var(--text-primary);
                    line-height: 0.85; display: flex; align-items: flex-start; gap: 1rem;
                    will-change: transform; transform: translateZ(0); 
                    text-decoration: none;
                }
                
                .menu-item:hover {
                    color: transparent; -webkit-text-stroke: 1px var(--accent);
                    transform: translate3d(20px, 0, 0);
                    transition: color 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .menu-item-number {
                    font-size: 0.875rem; font-weight: 400; letter-spacing: 0.05em;
                    color: var(--accent); margin-top: 0.5em;
                }
                
                .menu-footer {
                    margin-top: 2rem; 
                    padding-top: 2rem; border-top: 1px solid var(--border-light);
                }
                .menu-footer-col span {
                    font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); 
                    display: block; margin-bottom: 0.5rem;
                }
                
                @media (max-width: 768px) {
                    .menu-inner-scroll {
                        padding-top: 120px; 
                        justify-content: flex-start;
                    }
                    .menu-item { font-size: clamp(2rem, 12vw, 4rem); }
                }

                @media (max-height: 600px) {
                    .menu-inner-scroll { justify-content: flex-start; padding-top: 100px; }
                }
            `}</style>
        </>
    );
};

export default NivoraNav;
