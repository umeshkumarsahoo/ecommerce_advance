import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LuxuryButton from '../components/LuxuryButton';

/**
 * ============================================================================
 * DashboardPage - User account dashboard with VIP/Non-VIP differentiation
 * ============================================================================
 * 
 * This dashboard renders differently based on the user's membership tier:
 * 
 * VIP MEMBERS:
 *   - VIP badge display
 *   - Exclusive benefits section
 *   - Premium 3D decorative element
 *   - Full access to all features
 * 
 * NON-VIP MEMBERS:
 *   - Standard member view
 *   - Prominent upgrade section with Pro/VIP tiers
 *   - Basic benefits display
 * 
 * Both use the same dark color scheme for consistency.
 * ============================================================================
 */

function DashboardPage() {
    // ---------------------------------------------------------------------------
    // Hooks & State
    // ---------------------------------------------------------------------------
    const { user, isAuthenticated, isVIP, membershipTier, logout, upgradeToVIP } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [upgradeLoading, setUpgradeLoading] = useState(null);

    // ---------------------------------------------------------------------------
    // Auth Guard - Redirect if not authenticated
    // ---------------------------------------------------------------------------
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // ---------------------------------------------------------------------------
    // GSAP Animations - Entry animations for dashboard cards
    // ---------------------------------------------------------------------------
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.dashboard-card', { opacity: 0, y: 40 });
            gsap.set('.dashboard-header', { opacity: 0, y: -30 });
            gsap.set('.dashboard-3d', { opacity: 0, scale: 0.8 });
            gsap.set('.upgrade-card', { opacity: 0, y: 30 });

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
                }, '-=0.5')
                .to('.upgrade-card', {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power3.out'
                }, '-=0.3');
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // ---------------------------------------------------------------------------
    // Event Handlers
    // ---------------------------------------------------------------------------
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

    const handleUpgrade = (tier) => {
        setUpgradeLoading(tier);

        // Simulate API call delay
        setTimeout(() => {
            const result = upgradeToVIP(tier);
            setUpgradeLoading(null);

            if (result.success) {
                // Success animation
                gsap.to('.upgrade-section', {
                    opacity: 0,
                    height: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        }, 1000);
    };

    // ---------------------------------------------------------------------------
    // Mock Data - Recent orders and wishlist
    // ---------------------------------------------------------------------------
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

    // ---------------------------------------------------------------------------
    // Membership Tier Options (for non-VIP users)
    // ---------------------------------------------------------------------------
    const membershipTiers = [
        {
            id: 'Pro',
            name: 'Pro',
            price: 49,
            period: '/month',
            features: [
                'Free Standard Shipping',
                '10% Member Discount',
                'Early Access to Sales',
                'Birthday Rewards'
            ],
            recommended: false
        },
        {
            id: 'VIP',
            name: 'VIP',
            price: 99,
            period: '/month',
            features: [
                'Free Express Shipping',
                '20% VIP Discount',
                'Early Access to Collections',
                'Priority Support',
                'Complimentary Gift Wrapping',
                'Exclusive VIP Events'
            ],
            recommended: true
        }
    ];

    // ---------------------------------------------------------------------------
    // Guard - Don't render if not authenticated
    // ---------------------------------------------------------------------------
    if (!isAuthenticated) return null;

    // ---------------------------------------------------------------------------
    // Shared Styles
    // ---------------------------------------------------------------------------
    const styles = {
        page: {
            minHeight: '100vh',
            paddingTop: '120px',
            paddingBottom: '80px',
            backgroundColor: 'var(--bg-primary)'
        },
        cardBase: {
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '2rem'
        },
        sectionTitle: {
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem'
        },
        actionItem: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '4px',
            transition: 'background 0.3s'
        }
    };

    // ===========================================================================
    // RENDER
    // ===========================================================================
    return (
        <div className="dashboard-page" ref={containerRef} style={styles.page}>
            <div className="container">

                {/* ----------------------------------------------------------------
                    HEADER SECTION
                    Shows user name, membership tier badge, and sign out button
                ---------------------------------------------------------------- */}
                <div className="dashboard-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '4rem'
                }}>
                    <div>
                        {/* Membership Badge */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '0.5rem'
                        }}>
                            <p style={{
                                fontSize: '0.7rem',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                color: 'var(--accent)'
                            }}>
                                Welcome Back
                            </p>

                            {/* VIP/Standard Badge */}
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '999px',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                background: isVIP
                                    ? 'linear-gradient(135deg, var(--accent) 0%, #b8860b 100%)'
                                    : 'rgba(255,255,255,0.1)',
                                color: isVIP ? '#000' : 'var(--text-secondary)'
                            }}>
                                {isVIP ? '★ VIP' : membershipTier || 'STANDARD'}
                            </span>
                        </div>

                        {/* User Name */}
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 400,
                            marginBottom: '0.5rem'
                        }}>
                            {user?.name || 'Member'}
                        </h1>

                        {/* Member Since */}
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Member since {user?.memberSince || '2024'}
                        </p>
                    </div>

                    <LuxuryButton onClick={handleLogout} style={{ fontSize: '0.7rem' }}>
                        Sign Out
                    </LuxuryButton>
                </div>

                {/* ----------------------------------------------------------------
                    UPGRADE SECTION (Non-VIP Only)
                    Displays membership tier options for standard members
                ---------------------------------------------------------------- */}
                {!isVIP && (
                    <div className="upgrade-section" style={{ marginBottom: '3rem' }}>
                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.5rem',
                            marginBottom: '0.5rem',
                            textAlign: 'center'
                        }}>
                            Unlock Premium Benefits
                        </h2>
                        <p style={{
                            color: 'var(--text-muted)',
                            textAlign: 'center',
                            marginBottom: '2rem'
                        }}>
                            Upgrade your membership to enjoy exclusive perks
                        </p>

                        {/* Tier Cards Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '1.5rem',
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}>
                            {membershipTiers.map(tier => (
                                <div
                                    key={tier.id}
                                    className="upgrade-card"
                                    style={{
                                        background: tier.recommended
                                            ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)'
                                            : 'rgba(255,255,255,0.02)',
                                        border: tier.recommended
                                            ? '2px solid var(--accent)'
                                            : '1px solid var(--border-light)',
                                        borderRadius: '12px',
                                        padding: '2rem',
                                        position: 'relative',
                                        transition: 'transform 0.3s ease'
                                    }}
                                >
                                    {/* Recommended Badge */}
                                    {tier.recommended && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '-12px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: 'var(--accent)',
                                            color: '#000',
                                            padding: '0.25rem 1rem',
                                            borderRadius: '999px',
                                            fontSize: '0.65rem',
                                            fontWeight: 600,
                                            letterSpacing: '0.1em'
                                        }}>
                                            RECOMMENDED
                                        </span>
                                    )}

                                    {/* Tier Name */}
                                    <h3 style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '1.25rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {tier.name}
                                    </h3>

                                    {/* Price */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <span style={{
                                            fontSize: '2.5rem',
                                            fontWeight: 700,
                                            color: tier.recommended ? 'var(--accent)' : 'var(--text-primary)'
                                        }}>
                                            ${tier.price}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)' }}>
                                            {tier.period}
                                        </span>
                                    </div>

                                    {/* Features List */}
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: '0 0 1.5rem 0'
                                    }}>
                                        {tier.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    padding: '0.5rem 0',
                                                    fontSize: '0.85rem',
                                                    color: 'var(--text-secondary)'
                                                }}
                                            >
                                                <span style={{ color: 'var(--accent)' }}>✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Upgrade Button */}
                                    <LuxuryButton
                                        onClick={() => handleUpgrade(tier.id)}
                                        disabled={upgradeLoading === tier.id}
                                        style={{
                                            width: '100%',
                                            background: tier.recommended ? 'var(--accent)' : 'transparent',
                                            color: tier.recommended ? '#000' : 'var(--text-primary)'
                                        }}
                                    >
                                        {upgradeLoading === tier.id ? 'Processing...' : `Upgrade to ${tier.name}`}
                                    </LuxuryButton>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ----------------------------------------------------------------
                    DASHBOARD GRID
                    Contains all dashboard cards
                ---------------------------------------------------------------- */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>

                    {/* ============================================================
                        VIP EXCLUSIVE CARD (VIP Only)
                        Premium decorative card with 3D diamond animation
                    ============================================================ */}
                    {isVIP && (
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
                            {/* 3D Diamond Animation */}
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
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(135deg, var(--accent) 0%, #b8860b 50%, var(--accent) 100%)',
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

                            {/* CSS Keyframes */}
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
                                    VIP Exclusive Member
                                </h2>
                                <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>
                                    Enjoy early access to new collections, priority support, and exclusive VIP benefits.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ============================================================
                        BENEFITS CARD
                        Shows user's current membership benefits
                    ============================================================ */}
                    <div className="dashboard-card" style={styles.cardBase}>
                        <h3 style={styles.sectionTitle}>
                            {isVIP ? 'VIP Benefits' : 'Your Benefits'}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {(user?.benefits || ['Standard Shipping']).map((benefit, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '4px'
                                }}>
                                    <span style={{ color: 'var(--accent)' }}>✓</span>
                                    <span style={{ fontSize: '0.85rem' }}>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ============================================================
                        QUICK ACTIONS CARD
                        Navigation shortcuts to key pages
                    ============================================================ */}
                    <div className="dashboard-card" style={styles.cardBase}>
                        <h3 style={styles.sectionTitle}>Quick Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link to="/cart" style={styles.actionItem}>
                                <span>Shopping Cart</span>
                                <span style={{
                                    background: 'var(--accent)',
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

                    {/* ============================================================
                        RECENT ORDERS CARD
                        Shows last 3 orders with status
                    ============================================================ */}
                    <div className="dashboard-card" style={styles.cardBase}>
                        <h3 style={styles.sectionTitle}>Recent Orders</h3>
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
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.date}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                                            ${order.total.toLocaleString()}
                                        </p>
                                        <p style={{
                                            fontSize: '0.7rem',
                                            color: order.status === 'Delivered' ? '#22c55e' : 'var(--accent)'
                                        }}>
                                            {order.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ============================================================
                        WISHLIST CARD
                        Shows saved items with prices
                    ============================================================ */}
                    <div className="dashboard-card" style={styles.cardBase}>
                        <h3 style={styles.sectionTitle}>Wishlist</h3>
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
                                    <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>
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
