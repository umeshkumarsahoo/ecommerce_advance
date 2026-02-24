import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useOrders } from '../context/OrderContext';

/**
 * DashboardPage – Luxury Bento Grid Layout
 *
 * Live data from OrderContext for order history and SuperCoin balance.
 */

function DashboardPage() {
    const { user, isAuthenticated, isVIP, membershipTier, logout, upgradeToExclusive, downgradeFromExclusive } = useAuth();
    const { wishlistItems } = useWishlist();
    const { orders, superCoins } = useOrders();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [upgradeLoading, setUpgradeLoading] = useState(false);
    const [downgradeLoading, setDowngradeLoading] = useState(false);

    // Auth Guard
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // GSAP Entrance Animations
    useEffect(() => {
        if (!isAuthenticated) return;
        const ctx = gsap.context(() => {
            gsap.set('.bento-header', { y: -20, opacity: 0 });
            gsap.set('.bento-card', { y: 30, opacity: 0 });

            const tl = gsap.timeline({ delay: 0.3 });

            tl.to('.bento-header', {
                y: 0, opacity: 1, duration: 0.5, ease: 'power3.out'
            })
                .to('.bento-card', {
                    y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out'
                }, '-=0.2');
        }, containerRef);

        return () => ctx.revert();
    }, [isAuthenticated]);

    // Handlers
    const handleUpgrade = () => {
        setUpgradeLoading(true);
        setTimeout(() => {
            upgradeToExclusive();
            setUpgradeLoading(false);
        }, 800);
    };

    const handleDowngrade = () => {
        setDowngradeLoading(true);
        setTimeout(() => {
            downgradeFromExclusive();
            setDowngradeLoading(false);
        }, 800);
    };

    const handleLogout = () => {
        gsap.to('.bento-dashboard', {
            opacity: 0, duration: 0.3,
            onComplete: () => { logout(); navigate('/'); }
        });
    };

    // Live data from context
    const totalOrders = orders.length;
    const recentOrders = orders.slice(0, 3);

    const coinMultiplier = isVIP ? '2x' : '1x';

    // Exclusive plan
    const exclusivePlan = {
        price: 999,
        features: ['Free Express Shipping', '2x Exclusive Coins', 'Early Access', 'Priority Support']
    };

    // Status color helper
    const statusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return '#22c55e';
            case 'in transit': return '#3b82f6';
            case 'processing': return '#f59e0b';
            default: return 'var(--color-text-muted)';
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="bento-dashboard" ref={containerRef}>

            {/* ── DASHBOARD HEADER ── */}
            <header className="bento-header">
                <div className="bento-header-left">
                    <h1 className="bento-title">Dashboard</h1>
                    <p className="bento-subtitle">
                        Welcome back, {user?.name?.split(' ')[0] || 'Member'}
                    </p>
                </div>
                <div className="bento-header-right">
                    <span className={`bento-tier-badge ${isVIP ? 'exclusive' : 'standard'}`}>
                        {isVIP ? '★ Exclusive' : 'Standard'}
                    </span>
                    <div className="bento-avatar" onClick={handleLogout} title="Logout">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                </div>
            </header>

            {/* ── BENTO GRID ── */}
            <div className="bento-grid">

                {/* Card 1: Order History (large) */}
                <div className="bento-card bento-orders">
                    <div className="bento-card-header">
                        <span className="bento-card-label">Order History</span>
                        <span className="bento-card-arrow">→</span>
                    </div>
                    <div className="bento-card-value">{totalOrders}</div>
                    <p className="bento-card-hint">
                        {totalOrders === 0 ? 'No orders yet — start shopping!' : 'Total orders placed'}
                    </p>
                    {recentOrders.length > 0 ? (
                        <div className="bento-orders-list">
                            {recentOrders.map(order => (
                                <div key={order.id} className="bento-order-row">
                                    <div>
                                        <span className="bento-order-id">{order.orderNumber}</span>
                                        <span className="bento-order-date">
                                            {new Date(order.date).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="bento-order-meta">
                                        <span className="bento-order-total">
                                            ₹{order.total.toLocaleString('en-IN')}
                                        </span>
                                        <span
                                            className="bento-order-status"
                                            style={{ color: statusColor(order.status) }}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{
                            padding: '1.5rem',
                            textAlign: 'center',
                            color: 'var(--color-text-muted)',
                            fontSize: '0.85rem',
                        }}>
                            <Link to="/collections" style={{
                                color: 'var(--color-accent)',
                                textDecoration: 'underline',
                                textUnderlineOffset: '3px',
                            }}>
                                Browse Collections →
                            </Link>
                        </div>
                    )}
                </div>

                {/* Card 2: SuperCoins (gold accent) */}
                <div className="bento-card bento-coins">
                    <div className="bento-card-header">
                        <span className="bento-card-label">SuperCoins</span>
                        <span className="bento-coins-multiplier">{coinMultiplier}</span>
                    </div>
                    <div className="bento-coins-display">
                        <span className="bento-coins-icon">🪙</span>
                        <span className="bento-coins-value">{superCoins.toLocaleString()}</span>
                    </div>
                    <p className="bento-card-hint">
                        {isVIP
                            ? 'Earning 2x coins on every purchase'
                            : superCoins === 0
                                ? 'Place your first order to earn coins!'
                                : 'Upgrade to earn 2x coins'}
                    </p>
                    <div className="bento-coins-perks">
                        <span className="bento-perk">💰 1 coin = ₹1 off</span>
                        <span className="bento-perk">✨ Earn per ₹100</span>
                        <span className="bento-perk">🎫 Use at checkout</span>
                    </div>
                </div>

                {/* Card 3: Wishlist */}
                <Link to="/wishlist" className="bento-card bento-wishlist">
                    <div className="bento-card-header">
                        <span className="bento-card-label">Wishlist</span>
                        <span className="bento-card-arrow">→</span>
                    </div>
                    <div className="bento-card-value">{wishlistItems.length}</div>
                    <p className="bento-card-hint">Saved items</p>
                    <div className="bento-wishlist-items">
                        {wishlistItems.slice(0, 3).map(item => (
                            <div key={item.id} className="bento-wishlist-row">
                                <span className="bento-wishlist-name">{item.name}</span>
                                <span className="bento-wishlist-price">₹{item.price.toLocaleString('en-IN')}</span>
                            </div>
                        ))}
                    </div>
                </Link>

                {/* Card 4: Collections */}
                <Link to="/collections" className="bento-card bento-collections">
                    <div className="bento-card-header">
                        <span className="bento-card-label">Collections</span>
                        <span className="bento-card-arrow">→</span>
                    </div>
                    <div className="bento-collections-inner">
                        <span className="bento-collections-icon">✦</span>
                        <p className="bento-collections-text">Explore curated luxury collections</p>
                    </div>
                </Link>

                {/* Card 5: Quick Actions */}
                <div className="bento-card bento-actions">
                    <div className="bento-card-header">
                        <span className="bento-card-label">Quick Actions</span>
                    </div>
                    <div className="bento-actions-grid">
                        <Link to="/collections" className="bento-action-btn">
                            <span>✦</span> Browse
                        </Link>
                        <Link to="/stories" className="bento-action-btn">
                            <span>📖</span> Stories
                        </Link>
                        <Link to="/journal" className="bento-action-btn">
                            <span>📰</span> Journal
                        </Link>
                        <Link to="/contact" className="bento-action-btn">
                            <span>💬</span> Contact
                        </Link>
                    </div>
                </div>

                {/* Card 6: Upgrade OR Exclusive Benefits */}
                {!isVIP ? (
                    <div className="bento-card bento-upgrade">
                        <div className="bento-card-header">
                            <span className="bento-card-label">Go Exclusive</span>
                            <span className="bento-upgrade-diamond">◆</span>
                        </div>
                        <p className="bento-upgrade-text">
                            Unlock 2x coins, free shipping, early access & priority support.
                        </p>
                        <div className="bento-upgrade-price">
                            <span className="bento-price-amount">₹{exclusivePlan.price}</span>
                            <span className="bento-price-period">/mo</span>
                        </div>
                        <button
                            className="bento-upgrade-btn"
                            onClick={handleUpgrade}
                            disabled={upgradeLoading}
                        >
                            {upgradeLoading ? 'Upgrading...' : 'Upgrade Now'}
                        </button>
                    </div>
                ) : (
                    <div className="bento-card bento-benefits">
                        <div className="bento-card-header">
                            <span className="bento-card-label">Your Benefits</span>
                            <span className="bento-upgrade-diamond">◆</span>
                        </div>
                        <div className="bento-benefits-list">
                            {user?.benefits?.map((benefit, idx) => (
                                <div key={idx} className="bento-benefit-item">
                                    <span className="bento-benefit-check">✓</span>
                                    {benefit}
                                </div>
                            ))}
                        </div>
                        <button
                            className="bento-unsubscribe-btn"
                            onClick={handleDowngrade}
                            disabled={downgradeLoading}
                        >
                            {downgradeLoading ? 'Cancelling...' : 'Cancel Subscription'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;
