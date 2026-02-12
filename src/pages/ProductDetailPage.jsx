import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/productData';

// ═══════════════════════════════════════════════════════════════
// ProductDetailPage — Premium product layout
// Left: large image + thumbnails | Right: details + actions
// ═══════════════════════════════════════════════════════════════

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();

    const product = getProductById(id);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);

    // Reset state when product changes
    useEffect(() => {
        setSelectedImage(0);
        setSelectedSize(null);
        setAddedToCart(false);
        window.scrollTo(0, 0);
    }, [id]);

    // --- Star Rating ---
    const renderStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        let stars = '';
        for (let i = 0; i < full; i++) stars += '★';
        if (half) stars += '½';
        for (let i = stars.length; i < 5; i++) stars += '☆';
        return stars;
    };

    // --- Add to Cart ---
    const handleAddToCart = () => {
        if (!isAuthenticated) {
            alert('Please login to continue');
            navigate(`/login?redirect=/product/${product.id}`);
            return;
        }
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.images[0],
            size: selectedSize,
        });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2500);
    };

    return (
        <div style={s.page}>
            <style>{responsiveCSS}</style>

            {/* Breadcrumb */}
            <div style={s.breadcrumb}>
                <Link to="/collections" style={s.breadcrumbLink}>Collections</Link>
                <span style={s.breadcrumbSep}>/</span>
                <span style={s.breadcrumbCurrent}>{product.name}</span>
            </div>

            {/* Main Content */}
            <div className="pdp-layout" style={s.layout}>

                {/* Left: Images */}
                <div className="pdp-images">
                    {/* Main Image */}
                    <div style={s.mainImageWrap}>
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            style={s.mainImage}
                        />
                    </div>

                    {/* Thumbnails */}
                    {product.images.length > 1 && (
                        <div style={s.thumbRow}>
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    style={{
                                        ...s.thumbBtn,
                                        ...(selectedImage === i ? s.thumbBtnActive : {}),
                                    }}
                                >
                                    <img src={img} alt="" style={s.thumbImg} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Product Info */}
                <div className="pdp-info" style={s.infoPanel}>

                    {/* Brand */}
                    <span style={s.brand}>{product.brand}</span>

                    {/* Title */}
                    <h1 style={s.title}>{product.name}</h1>

                    {/* Rating */}
                    <div style={s.ratingRow}>
                        <span style={s.stars}>{renderStars(product.rating)}</span>
                        <span style={s.ratingNum}>{product.rating}</span>
                    </div>

                    {/* Price */}
                    <p style={s.price}>€{product.price.toLocaleString()}</p>

                    {/* Divider */}
                    <div style={s.divider} />

                    {/* Description */}
                    <p style={s.description}>{product.description}</p>

                    {/* Size Selector */}
                    {product.sizes.length > 0 && (
                        <div style={s.sizeSection}>
                            <span style={s.sizeLabel}>Select Size</span>
                            <div style={s.sizeGrid}>
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        style={{
                                            ...s.sizeBtn,
                                            ...(selectedSize === size ? s.sizeBtnActive : {}),
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Divider */}
                    <div style={s.divider} />

                    {/* Add to Cart & Wishlist */}
                    <div style={s.actionRow}>
                        <button
                            onClick={handleAddToCart}
                            style={{
                                ...s.addBtn,
                                ...(addedToCart ? s.addBtnSuccess : {}),
                            }}
                        >
                            {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                        </button>
                        <button
                            onClick={() => setWishlisted(!wishlisted)}
                            style={{
                                ...s.wishBtn,
                                ...(wishlisted ? s.wishBtnActive : {}),
                            }}
                            title="Toggle Wishlist"
                        >
                            {wishlisted ? '♥' : '♡'}
                        </button>
                    </div>

                    {/* Divider */}
                    <div style={s.divider} />

                    {/* Accordions */}
                    <div style={s.accordion}>
                        <span style={s.accordionLabel}>Details & Care</span>
                        <span style={s.accordionIcon}>+</span>
                    </div>
                    <div style={s.accordion}>
                        <span style={s.accordionLabel}>Shipping & Returns</span>
                        <span style={s.accordionIcon}>+</span>
                    </div>

                    {/* Trust Badges */}
                    <div style={s.trustRow}>
                        <span>🔒 Secure Checkout</span>
                        <span>📦 Free Returns</span>
                        <span>✨ Authentic</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════
const s = {
    page: {
        paddingTop: '100px',
        minHeight: '100vh',
        backgroundColor: '#F6F4FA',
        fontFamily: "'Inter', 'Instrument Sans', sans-serif",
    },

    // Breadcrumb
    breadcrumb: {
        padding: '0 5vw',
        marginBottom: '2rem',
        maxWidth: '1440px',
        margin: '0 auto 2rem',
    },
    breadcrumbLink: {
        color: '#5A6B80',
        fontSize: '0.78rem',
        letterSpacing: '0.08em',
        textDecoration: 'none',
        textTransform: 'uppercase',
    },
    breadcrumbSep: {
        color: '#BFBFBF',
        margin: '0 0.5rem',
        fontSize: '0.75rem',
    },
    breadcrumbCurrent: {
        color: '#0C2340',
        fontSize: '0.78rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontWeight: 500,
    },

    // Layout
    layout: {
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 5vw 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'start',
    },

    // Main Image
    mainImageWrap: {
        aspectRatio: '3/4',
        overflow: 'hidden',
        borderRadius: '12px',
        backgroundColor: '#DEE4EF',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        transition: 'transform 0.5s ease',
    },

    // Thumbnails
    thumbRow: {
        display: 'flex',
        gap: '0.5rem',
        marginTop: '0.75rem',
    },
    thumbBtn: {
        width: '72px',
        height: '90px',
        overflow: 'hidden',
        borderRadius: '6px',
        border: '2px solid transparent',
        padding: 0,
        cursor: 'pointer',
        backgroundColor: '#DEE4EF',
        transition: 'border-color 0.2s',
    },
    thumbBtnActive: {
        borderColor: '#4F7DB5',
    },
    thumbImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },

    // Info Panel
    infoPanel: {
        position: 'sticky',
        top: '120px',
    },
    brand: {
        fontSize: '0.72rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: '#4F7DB5',
        display: 'block',
        marginBottom: '0.5rem',
    },
    title: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
        fontWeight: 700,
        color: '#0C2340',
        marginBottom: '0.75rem',
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
    },
    ratingRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.75rem',
    },
    stars: {
        fontSize: '0.9rem',
        color: '#4F7DB5',
        letterSpacing: '2px',
    },
    ratingNum: {
        fontSize: '0.8rem',
        color: '#5A6B80',
    },
    price: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: '1.75rem',
        fontWeight: 600,
        color: '#0C2340',
        marginBottom: '0.5rem',
    },

    divider: {
        height: '1px',
        backgroundColor: '#DEE4EF',
        margin: '1.25rem 0',
    },

    description: {
        fontSize: '0.92rem',
        color: '#5A6B80',
        lineHeight: 1.7,
        marginBottom: '0.5rem',
    },

    // Sizes
    sizeSection: {
        marginTop: '0.5rem',
    },
    sizeLabel: {
        fontSize: '0.72rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#5A6B80',
        display: 'block',
        marginBottom: '0.65rem',
    },
    sizeGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
    },
    sizeBtn: {
        minWidth: '48px',
        height: '44px',
        border: '1px solid #DEE4EF',
        borderRadius: '6px',
        backgroundColor: 'transparent',
        color: '#0C2340',
        fontSize: '0.8rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'grid',
        placeItems: 'center',
        padding: '0 0.75rem',
    },
    sizeBtnActive: {
        borderColor: '#4F7DB5',
        backgroundColor: 'rgba(79,125,181,0.1)',
        color: '#4F7DB5',
        fontWeight: 600,
    },

    // Actions
    actionRow: {
        display: 'flex',
        gap: '0.75rem',
    },
    addBtn: {
        flex: 1,
        padding: '0.9rem',
        backgroundColor: '#4F7DB5',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.82rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    addBtnSuccess: {
        backgroundColor: '#22c55e',
    },
    wishBtn: {
        width: '52px',
        height: '52px',
        display: 'grid',
        placeItems: 'center',
        border: '1px solid #DEE4EF',
        borderRadius: '8px',
        backgroundColor: 'transparent',
        fontSize: '1.2rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        color: '#0C2340',
    },
    wishBtnActive: {
        color: '#e11d48',
        borderColor: '#e11d48',
        backgroundColor: 'rgba(225,29,72,0.05)',
    },

    // Accordions
    accordion: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 0',
        cursor: 'pointer',
        borderBottom: '1px solid #DEE4EF',
    },
    accordionLabel: {
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#0C2340',
    },
    accordionIcon: {
        fontSize: '1rem',
        color: '#5A6B80',
    },

    // Trust
    trustRow: {
        marginTop: '1.5rem',
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
        color: '#5A6B80',
        fontSize: '0.7rem',
        letterSpacing: '0.05em',
    },
};


// ═══════════════════════════════════════════════════════════════
// RESPONSIVE CSS
// ═══════════════════════════════════════════════════════════════
const responsiveCSS = `
    @media (max-width: 768px) {
        .pdp-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
        }
        .pdp-info {
            position: static !important;
        }
    }
`;


export default ProductDetailPage;
