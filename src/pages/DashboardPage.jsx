import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LuxuryButton from '../components/LuxuryButton';

/**
 * DashboardPage - User account dashboard with luxury design
 */
function DashboardPage() {
    const { user, isAuthenticated, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const containerRef = useRef(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.dashboard-card', { opacity: 0, y: 40 });
            gsap.set('.dashboard-header', { opacity: 0, y: -30 });
            gsap.set('.dashboard-3d', { opacity: 0, scale: 0.8 });

            const tl = gsap.timeline({ delay: 0.3 });

            tl.to('.dashboard-header', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
                .to('.dashboard-3d', {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'back.out(1.7)'
                }, '-=0.4')
                .to('.dashboard-card', {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out'
                }, '-=0.5');
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleLogout = () => {
        gsap.to('.dashboard-page', {
            opacity: 0,
            y: -20,
            duration: 0.4,
            onComplete: () => {
                logout();
                navigate('/');
            }
        });
    };

    // Mock data
    const recentOrders = [
        { id: 'ORD-2026-001', date: 'Jan 15, 2026', status: 'Delivered', total: 1250 },
        { id: 'ORD-2026-002', date: 'Jan 10, 2026', status: 'In Transit', total: 890 },
        { id: 'ORD-2025-089', date: 'Dec 28, 2025', status: 'Delivered', total: 2100 }
    ];

    const wishlistItems = [
        { id: 1, name: 'Silk Evening Gown', price: 1890 },
        { id: 2, name: 'Diamond Pendant', price: 3450 },
        { id: 3, name: 'Cashmere Coat', price: 2200 }
    ];

    if (!isAuthenticated) return null;

    return (
        <div className="dashboard-page" ref={containerRef} style={{
            minHeight: '100vh',
            paddingTop: '120px',
            paddingBottom: '80px',
            backgroundColor: 'var(--color-bg)'
        }}>
            <div className="container">
                {/* Header */}
                <div className="dashboard-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '4rem'
                }}>
                    <div>
                        <p style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            color: 'var(--color-accent)',
                            marginBottom: '0.5rem'
                        }}>
                            Welcome Back
                        </p>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 400,
                            marginBottom: '0.5rem'
                        }}>
                            {user?.name || 'Member'}
                        </h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            Member since {user?.memberSince || '2024'}
                        </p>
                    </div>
                    <LuxuryButton onClick={handleLogout} style={{ fontSize: '0.7rem' }}>
                        Sign Out
                    </LuxuryButton>
                </div>

                {/* Dashboard Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {/* 3D Decorative Element */}
                    <div className="dashboard-card dashboard-3d" style={{
                        gridColumn: 'span 2',
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.02) 100%)',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        borderRadius: '8px',
                        padding: '3rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        minHeight: '200px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* 3D Diamond/Jewelry CSS Art */}
                        <div style={{
                            position: 'absolute',
                            right: '10%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            perspective: '1000px'
                        }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                transformStyle: 'preserve-3d',
                                animation: 'rotate3d 8s ease-in-out infinite'
                            }}>
                                {/* Diamond Shape */}
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(135deg, var(--color-accent) 0%, #b8860b 50%, var(--color-accent) 100%)',
                                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                                    opacity: 0.8,
                                    boxShadow: '0 0 60px rgba(212, 175, 55, 0.4)'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    width: '60%',
                                    height: '60%',
                                    top: '20%',
                                    left: '20%',
                                    background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                                    animation: 'shimmer 3s ease-in-out infinite'
                                }} />
                            </div>
                        </div>
                        <style>{`
                            @keyframes rotate3d {
                                0%, 100% { transform: translateY(-50%) rotateY(0deg) rotateX(0deg); }
                                25% { transform: translateY(-50%) rotateY(15deg) rotateX(5deg); }
                                50% { transform: translateY(-50%) rotateY(0deg) rotateX(-5deg); }
                                75% { transform: translateY(-50%) rotateY(-15deg) rotateX(5deg); }
                            }
                            @keyframes shimmer {
                                0%, 100% { opacity: 0.3; }
                                50% { opacity: 0.8; }
                            }
                        `}</style>

                        <div>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.8rem',
                                marginBottom: '0.5rem'
                            }}>
                                Exclusive Member
                            </h2>
                            <p style={{ color: 'var(--color-text-muted)', maxWidth: '300px' }}>
                                Enjoy early access to new collections and member-only benefits.
                            </p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="dashboard-card" style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        padding: '2rem'
                    }}>
                        <h3 style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--color-text-muted)',
                            marginBottom: '1.5rem'
                        }}>
                            Quick Actions
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link to="/cart" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '4px',
                                transition: 'background 0.3s'
                            }}>
                                <span>Shopping Cart</span>
                                <span style={{
                                    background: 'var(--color-accent)',
                                    color: '#000',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600
                                }}>
                                    {cartCount}
                                </span>
                            </Link>
                            <Link to="/collections" style={{
                                display: 'block',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '4px',
                                transition: 'background 0.3s'
                            }}>
                                Browse Collections
                            </Link>
                            <Link to="/stories" style={{
                                display: 'block',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '4px',
                                transition: 'background 0.3s'
                            }}>
                                Shop by Story
                            </Link>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="dashboard-card" style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        padding: '2rem'
                    }}>
                        <h3 style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--color-text-muted)',
                            marginBottom: '1.5rem'
                        }}>
                            Recent Orders
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {recentOrders.map(order => (
                                <div key={order.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '4px'
                                }}>
                                    <div>
                                        <p style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>{order.id}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{order.date}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>${order.total.toLocaleString()}</p>
                                        <p style={{
                                            fontSize: '0.7rem',
                                            color: order.status === 'Delivered' ? '#22c55e' : 'var(--color-accent)'
                                        }}>
                                            {order.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Wishlist */}
                    <div className="dashboard-card" style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        padding: '2rem'
                    }}>
                        <h3 style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--color-text-muted)',
                            marginBottom: '1.5rem'
                        }}>
                            Wishlist
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {wishlistItems.map(item => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '4px'
                                }}>
                                    <span style={{ fontSize: '0.85rem' }}>{item.name}</span>
                                    <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem' }}>
                                        ${item.price.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
