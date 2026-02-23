import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/**
 * WishlistPage — Full-page wishlist view
 * Shows wishlisted products with remove and add-to-cart actions
 * GSAP stagger entrance animation
 */

function WishlistPage() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const gridRef = useRef(null);

    // GSAP stagger entrance
    useEffect(() => {
        if (wishlistItems.length === 0) return;
        const ctx = gsap.context(() => {
            gsap.from('.wishlist-card-item', {
                y: 30,
                opacity: 0,
                duration: 0.4,
                stagger: 0.08,
                ease: 'power3.out',
                delay: 0.2,
            });
        }, gridRef);
        return () => ctx.revert();
    }, [wishlistItems.length]);

    const handleAddToCart = (item) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            category: item.category,
            image: item.image,
        });
        showToast(`${item.name} added to cart`, 'success');
    };

    const handleRemove = (id) => {
        const el = document.querySelector(`[data-wishlist-id="${id}"]`);
        if (el) {
            gsap.to(el, {
                opacity: 0,
                y: -20,
                scale: 0.95,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => removeFromWishlist(id),
            });
        } else {
            removeFromWishlist(id);
        }
    };

    return (
        <div style={s.page}>
            <style>{responsiveCSS}</style>

            {/* Hero */}
            <section style={s.hero}>
                <h1 style={s.heroTitle}>Your Wishlist</h1>
                <p style={s.heroSub}>
                    {wishlistItems.length > 0
                        ? `${wishlistItems.length} saved piece${wishlistItems.length !== 1 ? 's' : ''}`
                        : 'Your wishlist is empty'}
                </p>
            </section>

            {wishlistItems.length === 0 ? (
                <div style={s.emptyState}>
                    <div style={s.emptyIcon}>♡</div>
                    <h2 style={s.emptyTitle}>Nothing saved yet</h2>
                    <p style={s.emptyText}>
                        Browse our collections and save your favourite pieces here.
                    </p>
                    <Link to="/collections" style={s.browseCta}>
                        Browse Collections
                    </Link>
                </div>
            ) : (
                <div style={s.gridContainer} ref={gridRef}>
                    <div className="wishlist-grid" style={s.grid}>
                        {wishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="wishlist-card-item"
                                data-wishlist-id={item.id}
                                style={s.card}
                            >
                                <Link to={`/product/${item.id}`} style={s.cardImageWrap}>
                                    <img src={item.image} alt={item.name} style={s.cardImage} loading="lazy" />
                                </Link>
                                <div style={s.cardInfo}>
                                    <span style={s.cardCategory}>{item.category}</span>
                                    <Link to={`/product/${item.id}`} style={s.cardName}>{item.name}</Link>
                                    <span style={s.cardPrice}>₹{item.price.toLocaleString('en-IN')}</span>
                                    <div style={s.cardActions}>
                                        <button
                                            style={s.addToCartBtn}
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            style={s.removeBtn}
                                            onClick={() => handleRemove(item.id)}
                                            title="Remove from wishlist"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}


// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════
const s = {
    page: {
        backgroundColor: '#F6F4FA',
        minHeight: '100vh',
        fontFamily: "'Inter', 'Instrument Sans', sans-serif",
    },
    hero: {
        paddingTop: '140px',
        paddingBottom: '40px',
        textAlign: 'center',
        padding: '140px 5vw 40px',
    },
    heroTitle: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
        fontWeight: 700,
        color: '#0C2340',
        marginBottom: '0.75rem',
        letterSpacing: '-0.02em',
    },
    heroSub: {
        fontSize: '1.05rem',
        color: '#5A6B80',
        maxWidth: '480px',
        margin: '0 auto',
        lineHeight: 1.6,
    },

    // Empty state
    emptyState: {
        textAlign: 'center',
        padding: '4rem 2rem 6rem',
        maxWidth: '440px',
        margin: '0 auto',
    },
    emptyIcon: {
        fontSize: '4rem',
        color: '#B8C6D8',
        marginBottom: '1.5rem',
    },
    emptyTitle: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: '1.4rem',
        fontWeight: 600,
        color: '#0C2340',
        marginBottom: '0.75rem',
    },
    emptyText: {
        fontSize: '0.95rem',
        color: '#5A6B80',
        lineHeight: 1.6,
        marginBottom: '2rem',
    },
    browseCta: {
        display: 'inline-block',
        padding: '0.85rem 2.5rem',
        backgroundColor: '#0C2340',
        color: '#FFFFFF',
        borderRadius: '8px',
        fontSize: '0.85rem',
        fontWeight: 600,
        textDecoration: 'none',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        transition: 'background-color 0.25s ease',
    },

    // Grid
    gridContainer: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 5vw 80px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
    },

    // Card
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #DEE4EF',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardImageWrap: {
        display: 'block',
        position: 'relative',
        width: '100%',
        aspectRatio: '3/4',
        overflow: 'hidden',
        backgroundColor: '#DEE4EF',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        transition: 'transform 0.4s ease',
    },
    cardInfo: {
        padding: '1rem 1.25rem 1.25rem',
    },
    cardCategory: {
        fontSize: '0.68rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: '#4F7DB5',
        marginBottom: '0.3rem',
        display: 'block',
    },
    cardName: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: '1rem',
        fontWeight: 600,
        color: '#0C2340',
        marginBottom: '0.5rem',
        display: 'block',
        textDecoration: 'none',
    },
    cardPrice: {
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#0C2340',
        display: 'block',
        marginBottom: '0.85rem',
    },
    cardActions: {
        display: 'flex',
        gap: '0.5rem',
    },
    addToCartBtn: {
        flex: 1,
        padding: '0.6rem',
        backgroundColor: '#4F7DB5',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        cursor: 'pointer',
        transition: 'background-color 0.25s ease',
    },
    removeBtn: {
        width: '38px',
        height: '38px',
        backgroundColor: 'transparent',
        border: '1px solid #DEE4EF',
        borderRadius: '8px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        color: '#5A6B80',
        display: 'grid',
        placeItems: 'center',
        transition: 'all 0.2s ease',
    },
};

const responsiveCSS = `
    .wishlist-card-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important;
    }
    .wishlist-card-item:hover img {
        transform: scale(1.05);
    }

    @media (max-width: 1024px) {
        .wishlist-grid {
            grid-template-columns: repeat(3, 1fr) !important;
        }
    }
    @media (max-width: 768px) {
        .wishlist-grid {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }
    @media (max-width: 480px) {
        .wishlist-grid {
            grid-template-columns: 1fr !important;
        }
    }
`;

export default WishlistPage;
