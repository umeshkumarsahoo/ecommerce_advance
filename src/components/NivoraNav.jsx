import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

/**
 * NivoraNav - Hybrid Minimal Luxury Navigation
 * 
 * AUTH FEATURE:
 * - Shows user dropdown in top right when logged in (with Dashboard + Logout)
 * - Shows Login link in top right when not logged in
 * - Cart visible only when logged in
 * - No Dashboard/Login in hamburger menu - all in top right corner
 */
const NivoraNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Handle scroll state
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
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
        );

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Menu animation
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
            setActiveSubmenu(null);
        }
    }, [menuOpen]);

    // Static menu items (no Dashboard/Login - those are in top right)
    const menuItems = [
        { label: 'Home', path: '/' },
        {
            label: 'Collection',
            path: '/collections',
            submenu: [
                { label: 'New Arrivals', path: '/collections?category=new' },
                { label: 'Jewelry', path: '/collections?category=jewelry' },
                { label: 'Clothing', path: '/collections?category=clothing' },
                { label: 'Sale', path: '/collections?category=sale' }
            ]
        },
        { label: 'Editorial', path: '/journal' },
        { label: 'About', path: '/stories' },
        { label: 'Contact', path: '/contact' }
    ];

    const handleSubmenuToggle = (index, e) => {
        e.preventDefault();
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };

    const handleLogout = () => {
        setUserDropdownOpen(false);
        logout();
        navigate('/');
    };

    const handleDashboard = () => {
        setUserDropdownOpen(false);
        navigate('/dashboard');
    };

    // Get first name for display
    const firstName = user?.name?.split(' ')[0] || 'User';

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

                {/* Right section: User dropdown only (no cart) */}
                <div className="nav-right">
                    {/* User dropdown or Login */}
                    {isAuthenticated ? (
                        <div className="user-dropdown-wrapper" ref={dropdownRef}>
                            <button
                                className="user-trigger"
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                            >
                                <span className="user-name">{firstName}</span>
                                <span className="user-arrow">{userDropdownOpen ? '▲' : '▼'}</span>
                            </button>

                            {userDropdownOpen && (
                                <div className="user-dropdown">
                                    <button className="dropdown-item" onClick={handleDashboard}>
                                        <span className="dropdown-icon">📊</span>
                                        Dashboard
                                    </button>
                                    <button className="dropdown-item logout-item" onClick={handleLogout}>
                                        <span className="dropdown-icon">🚪</span>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="nav-link nav-login">
                            LOGIN
                        </Link>
                    )}
                </div>
            </header>

            <nav className="nav-menu">
                <div className="menu-inner-scroll">
                    <div className="menu-container">
                        {menuItems.map((item, index) => (
                            <div key={index} className="menu-item-wrapper">
                                {item.submenu ? (
                                    <>
                                        <div
                                            className={`menu-item has-submenu ${activeSubmenu === index ? 'submenu-open' : ''}`}
                                            onClick={(e) => handleSubmenuToggle(index, e)}
                                        >
                                            <span className="menu-item-text">{item.label}</span>
                                            <span className="menu-item-number">0{index + 1}</span>
                                            <span className="submenu-arrow">▼</span>
                                        </div>
                                        <div className={`submenu ${activeSubmenu === index ? 'submenu-active' : ''}`}>
                                            {item.submenu.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={subItem.path}
                                                    className="submenu-item"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className="menu-item"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span className="menu-item-text">{item.label}</span>
                                        <span className="menu-item-number">0{index + 1}</span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="menu-footer">
                        <div className="menu-footer-col">
                            <span>Socials</span>
                            <div className="flex gap-4">
                                <a href="#">Instagram</a>
                                <a href="#">Twitter</a>
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
                
                /* Right section with Cart + User */
                .nav-right { 
                    z-index: 1001; 
                    display: flex; 
                    align-items: center; 
                    gap: 1.5rem;
                }
                .nav-link {
                    font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;
                    color: var(--text-primary); font-weight: 500; text-decoration: none;
                }
                .nav-login {
                    padding: 0.5rem 1rem;
                    border: 1px solid var(--accent);
                    color: var(--accent);
                    border-radius: 4px;
                    transition: all 0.3s;
                }
                .nav-login:hover {
                    background: var(--accent);
                    color: var(--bg-primary);
                }
                
                /* User dropdown */
                .user-dropdown-wrapper {
                    position: relative;
                }
                .user-trigger {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid var(--accent);
                    border-radius: 4px;
                    color: var(--accent);
                    font-size: 0.75rem;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .user-trigger:hover {
                    background: rgba(212, 175, 55, 0.2);
                }
                .user-arrow {
                    font-size: 0.5rem;
                }
                .user-dropdown {
                    position: absolute;
                    top: calc(100% + 0.5rem);
                    right: 0;
                    min-width: 160px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                    animation: dropdownFade 0.2s ease;
                }
                @keyframes dropdownFade {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    width: 100%;
                    padding: 0.875rem 1rem;
                    background: none;
                    border: none;
                    color: var(--text-primary);
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                }
                .dropdown-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
                .dropdown-item.logout-item {
                    border-top: 1px solid var(--border-light);
                    color: #ff6b6b;
                }
                .dropdown-item.logout-item:hover {
                    background: rgba(255, 107, 107, 0.1);
                }
                .dropdown-icon {
                    font-size: 1rem;
                }
                
                .nav-menu {
                    position: fixed; inset: 0; background-color: var(--bg-primary); z-index: 999;
                    clip-path: inset(0% 0% 100% 0%);
                }
                
                .menu-inner-scroll {
                    width: 100%; height: 100%; overflow-y: auto;
                    display: flex; flex-direction: column; 
                    justify-content: center;
                    padding: 100px var(--spacing-container) 40px; 
                }

                .menu-container {
                    display: flex; flex-direction: column;
                    gap: 0.25rem; 
                    margin-bottom: 2rem;
                }

                .menu-item-wrapper {
                    display: flex;
                    flex-direction: column;
                }

                .menu-item {
                    font-family: var(--font-display); 
                    font-size: clamp(2.5rem, 8vw, 6rem);
                    font-weight: 700; text-transform: uppercase; color: var(--text-primary);
                    line-height: 0.85; display: flex; align-items: flex-start; gap: 1rem;
                    will-change: transform; transform: translateZ(0); 
                    text-decoration: none;
                    cursor: pointer;
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

                .submenu-arrow {
                    font-size: 0.875rem;
                    margin-left: auto;
                    margin-top: 0.5em;
                    color: var(--accent);
                    transition: transform 0.3s ease;
                }

                .menu-item.submenu-open .submenu-arrow {
                    transform: rotate(180deg);
                }

                .submenu {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                                padding 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    padding-left: 2rem;
                }

                .submenu.submenu-active {
                    max-height: 300px;
                    padding-top: 1rem;
                    padding-bottom: 1rem;
                }

                .submenu-item {
                    display: block;
                    font-family: var(--font-body);
                    font-size: 1.25rem;
                    font-weight: 400;
                    color: var(--text-muted);
                    padding: 0.75rem 0;
                    text-decoration: none;
                    transition: color 0.3s ease, transform 0.3s ease;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .submenu-item:last-child {
                    border-bottom: none;
                }

                .submenu-item:hover {
                    color: var(--accent);
                    transform: translateX(10px);
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
                    .nav-cart { display: none; }
                    .menu-inner-scroll {
                        padding-top: 120px; 
                        justify-content: flex-start;
                    }
                    .menu-item { font-size: clamp(2rem, 12vw, 4rem); }
                    .submenu-item { font-size: 1rem; }
                }

                @media (max-height: 600px) {
                    .menu-inner-scroll { justify-content: flex-start; padding-top: 100px; }
                }
            `}</style>
        </>
    );
};

export default NivoraNav;
