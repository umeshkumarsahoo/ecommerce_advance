import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductById } from '../data/productData';

// ═══════════════════════════════════════════════════════════════
// ProductDetailPage — Premium Jewellery Product Layout
// Left: large image + thumbnails | Right: details + actions
// Includes: working accordions, review/rating system
// ═══════════════════════════════════════════════════════════════

// Jewellery-specific details & care content per category
const CATEGORY_DETAILS = {
    Rings: {
        details: ['18K Gold / Platinum setting', 'GIA / IGI certified gemstones', 'Hallmarked & authenticated', 'Handcrafted by master jewellers', 'Presented in signature BECANÉ case'],
        care: ['Remove before washing hands or swimming', 'Store in provided pouch to avoid scratches', 'Clean with warm soapy water and soft brush', 'Professional polishing recommended every 6 months', 'Avoid contact with perfumes and chemicals'],
    },
    Necklaces: {
        details: ['18K Gold / Platinum chain', 'Precision-set gemstones', 'Lobster claw or spring ring clasp', 'Hallmarked & authenticated', 'Presented in signature BECANÉ case'],
        care: ['Store flat or hanging to prevent tangling', 'Put on after applying perfume and makeup', 'Wipe gently with a soft cloth after wearing', 'Avoid sleeping with necklace on', 'Professional cleaning recommended annually'],
    },
    Bracelets: {
        details: ['Premium metal construction', 'Secure clasp mechanism', 'Comfortable daily wear design', 'Hallmarked & authenticated', 'Presented in signature BECANÉ case'],
        care: ['Remove before strenuous activity', 'Store individually to prevent scratching', 'Clean with jewellery-specific solution', 'Check clasp regularly for security', 'Avoid exposure to chlorine and saltwater'],
    },
    Earrings: {
        details: ['Hypoallergenic posts', 'Secure butterfly or screw-back closure', 'Precision-set stones', 'Hallmarked & authenticated', 'Presented in signature BECANÉ case'],
        care: ['Clean posts with rubbing alcohol regularly', 'Store in compartmented case', 'Remove before showering', 'Wipe with soft lint-free cloth', 'Avoid pulling or tugging on settings'],
    },
    Chains: {
        details: ['Solid gold construction', 'Hand-finished links', 'Premium weight and feel', 'Hallmarked & authenticated', 'Presented in signature BECANÉ case'],
        care: ['Store flat to prevent kinking', 'Clean with warm water and mild soap', 'Dry thoroughly before storing', 'Avoid wearing during physical activity', 'Professional maintenance every 12 months'],
    },
    Cufflinks: {
        details: ['Premium metal construction', 'Toggle or whale-back mechanism', 'Precision gemstone setting', 'Hallmarked & authenticated', 'Presented in signature BECANÉ case'],
        care: ['Store in dedicated cufflink box', 'Wipe clean after each wear', 'Avoid exposure to moisture', 'Polish with microfibre cloth', 'Check mechanism regularly'],
    },
    Anklets: {
        details: ['Delicate gold construction', 'Adjustable lobster clasp', 'Lightweight comfort fit', 'Hallmarked & authenticated', 'Presented in signature BECANÉ case'],
        care: ['Remove before swimming or bathing', 'Store flat in soft pouch', 'Clean gently with polishing cloth', 'Avoid contact with lotions', 'Check links for wear periodically'],
    },
};

const DEFAULT_DETAILS = CATEGORY_DETAILS.Rings;

// Seed reviews per product (static, stored in-memory per session)
const INITIAL_REVIEWS = {
    1: [
        { id: 1, name: 'Priya M.', rating: 5, text: 'Absolutely stunning ring. The diamond catches light beautifully. Worth every penny.', date: '2026-01-15' },
        { id: 2, name: 'Ananya S.', rating: 4, text: 'Beautiful craftsmanship. Took a while to deliver but the quality is impeccable.', date: '2026-01-10' },
    ],
    9: [
        { id: 1, name: 'Rahul K.', rating: 5, text: 'The signet ring is a masterpiece. Heavy gold, beautiful engraving. My new daily wear.', date: '2026-02-01' },
    ],
    2: [
        { id: 1, name: 'Meera R.', rating: 5, text: 'These pearls are divine. The lustre is unmatched. Perfect gift for my mother.', date: '2026-01-20' },
    ],
};


function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const { toggleWishlist, isWishlisted } = useWishlist();

    const product = getProductById(id);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(null);
    const wishlisted = product ? isWishlisted(product.id) : false;

    // --- Review State ---
    const [allReviews, setAllReviews] = useState(INITIAL_REVIEWS);
    const [reviewRating, setReviewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewName, setReviewName] = useState('');

    const productReviews = allReviews[product?.id] || [];
    const avgRating = productReviews.length > 0
        ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
        : product?.rating || 0;

    // Reset state when product changes
    useEffect(() => {
        setSelectedImage(0);
        setSelectedSize(null);
        setAddedToCart(false);
        setOpenAccordion(null);
        setReviewRating(0);
        setReviewText('');
        setReviewName('');
        window.scrollTo(0, 0);
    }, [id]);

    // --- Star Rating Display ---
    const renderStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        let stars = '';
        for (let i = 0; i < full; i++) stars += '★';
        if (half) stars += '½';
        for (let i = stars.length; i < 5; i++) stars += '☆';
        return stars;
    };

    // --- Interactive Star Rating ---
    const StarSelector = ({ value, hover, onSelect, onHover, onLeave }) => (
        <div style={{ display: 'flex', gap: '4px', cursor: 'pointer' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => onSelect(star)}
                    onMouseEnter={() => onHover(star)}
                    onMouseLeave={onLeave}
                    style={{
                        fontSize: '1.6rem',
                        color: star <= (hover || value) ? '#D4AF37' : '#DEE4EF',
                        transition: 'color 0.15s, transform 0.15s',
                        transform: star <= (hover || value) ? 'scale(1.15)' : 'scale(1)',
                        userSelect: 'none',
                    }}
                >★</span>
            ))}
        </div>
    );

    // --- Add to Cart ---
    const handleAddToCart = () => {
        if (!isAuthenticated) {
            showToast('Please login to add items to cart', 'error');
            navigate('/login', { state: { from: `/product/${product.id}` } });
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
        showToast(`${product.name} added to cart`, 'success');
        setTimeout(() => setAddedToCart(false), 2500);
    };

    // --- Submit Review ---
    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (reviewRating === 0) {
            showToast('Please select a star rating', 'error');
            return;
        }
        if (!reviewText.trim()) {
            showToast('Please write your review', 'error');
            return;
        }
        const newReview = {
            id: Date.now(),
            name: reviewName.trim() || 'Anonymous',
            rating: reviewRating,
            text: reviewText.trim(),
            date: new Date().toISOString().split('T')[0],
        };
        setAllReviews((prev) => ({
            ...prev,
            [product.id]: [...(prev[product.id] || []), newReview],
        }));
        setReviewRating(0);
        setReviewText('');
        setReviewName('');
        showToast('Thank you for your review!', 'success');
    };

    // --- Accordion toggle ---
    const toggleAccordion = (key) => {
        setOpenAccordion(openAccordion === key ? null : key);
    };

    // Get category-specific details
    const categoryInfo = CATEGORY_DETAILS[product?.category] || DEFAULT_DETAILS;

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
                        <span style={s.stars}>{renderStars(Number(avgRating))}</span>
                        <span style={s.ratingNum}>{avgRating}</span>
                        <span style={{ fontSize: '0.75rem', color: '#5A6B80' }}>({productReviews.length} review{productReviews.length !== 1 ? 's' : ''})</span>
                    </div>

                    {/* Price */}
                    <p style={s.price}>₹{product.price.toLocaleString('en-IN')}</p>

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
                            onClick={() => toggleWishlist({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                category: product.category,
                                image: product.images[0],
                            })}
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

                    {/* ═══ ACCORDION: Details ═══ */}
                    <div
                        style={s.accordion}
                        onClick={() => toggleAccordion('details')}
                    >
                        <span style={s.accordionLabel}>Product Details</span>
                        <span style={{
                            ...s.accordionIcon,
                            transform: openAccordion === 'details' ? 'rotate(45deg)' : 'rotate(0)',
                            transition: 'transform 0.3s ease',
                        }}>+</span>
                    </div>
                    <div style={{
                        maxHeight: openAccordion === 'details' ? '300px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.4s ease',
                    }}>
                        <ul style={s.accordionContent}>
                            {categoryInfo.details.map((item, i) => (
                                <li key={i} style={s.accordionItem}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* ═══ ACCORDION: Care ═══ */}
                    <div
                        style={s.accordion}
                        onClick={() => toggleAccordion('care')}
                    >
                        <span style={s.accordionLabel}>Care Instructions</span>
                        <span style={{
                            ...s.accordionIcon,
                            transform: openAccordion === 'care' ? 'rotate(45deg)' : 'rotate(0)',
                            transition: 'transform 0.3s ease',
                        }}>+</span>
                    </div>
                    <div style={{
                        maxHeight: openAccordion === 'care' ? '300px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.4s ease',
                    }}>
                        <ul style={s.accordionContent}>
                            {categoryInfo.care.map((item, i) => (
                                <li key={i} style={s.accordionItem}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* ═══ ACCORDION: Shipping ═══ */}
                    <div
                        style={s.accordion}
                        onClick={() => toggleAccordion('shipping')}
                    >
                        <span style={s.accordionLabel}>Shipping & Returns</span>
                        <span style={{
                            ...s.accordionIcon,
                            transform: openAccordion === 'shipping' ? 'rotate(45deg)' : 'rotate(0)',
                            transition: 'transform 0.3s ease',
                        }}>+</span>
                    </div>
                    <div style={{
                        maxHeight: openAccordion === 'shipping' ? '300px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.4s ease',
                    }}>
                        <ul style={s.accordionContent}>
                            <li style={s.accordionItem}>Complimentary insured shipping worldwide</li>
                            <li style={s.accordionItem}>Delivery within 3–5 business days</li>
                            <li style={s.accordionItem}>30-day return policy for unworn pieces</li>
                            <li style={s.accordionItem}>Free return shipping on all orders</li>
                            <li style={s.accordionItem}>Certificate of authenticity included</li>
                        </ul>
                    </div>

                    {/* Trust Badges */}
                    <div style={s.trustRow}>
                        <span>🔒 Secure Checkout</span>
                        <span>📦 Free Shipping</span>
                        <span>💎 GIA Certified</span>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* REVIEWS SECTION — Full width below product */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div style={s.reviewsSection}>
                <div style={s.reviewsContainer}>
                    <h2 style={s.reviewsTitle}>Customer Reviews</h2>

                    {/* Rating Summary */}
                    <div style={s.ratingSummary}>
                        <div style={s.ratingBig}>
                            <span style={{ fontSize: '3rem', fontWeight: 700, color: '#0C2340', lineHeight: 1 }}>{avgRating}</span>
                            <span style={{ fontSize: '0.85rem', color: '#5A6B80', marginTop: '0.25rem' }}>out of 5</span>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.3rem', color: '#D4AF37', letterSpacing: '3px', marginBottom: '0.25rem' }}>{renderStars(Number(avgRating))}</div>
                            <span style={{ fontSize: '0.82rem', color: '#5A6B80' }}>Based on {productReviews.length} review{productReviews.length !== 1 ? 's' : ''}</span>
                        </div>
                    </div>

                    <div style={s.divider} />

                    {/* Existing Reviews */}
                    {productReviews.length > 0 ? (
                        <div style={s.reviewsList}>
                            {productReviews.map((review) => (
                                <div key={review.id} style={s.reviewCard}>
                                    <div style={s.reviewHeader}>
                                        <div style={s.reviewAvatar}>{review.name.charAt(0).toUpperCase()}</div>
                                        <div>
                                            <p style={s.reviewAuthor}>{review.name}</p>
                                            <p style={s.reviewDate}>{review.date}</p>
                                        </div>
                                        <span style={s.reviewStars}>{renderStars(review.rating)}</span>
                                    </div>
                                    <p style={s.reviewBody}>{review.text}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#5A6B80', fontSize: '0.9rem', marginBottom: '2rem' }}>No reviews yet. Be the first to share your experience!</p>
                    )}

                    <div style={s.divider} />

                    {/* Write a Review Form */}
                    <div style={s.writeReview}>
                        <h3 style={s.writeReviewTitle}>Write a Review</h3>
                        <form onSubmit={handleSubmitReview} style={s.reviewForm}>
                            {/* Star Rating */}
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={s.formLabel}>Your Rating</label>
                                <StarSelector
                                    value={reviewRating}
                                    hover={hoverRating}
                                    onSelect={setReviewRating}
                                    onHover={setHoverRating}
                                    onLeave={() => setHoverRating(0)}
                                />
                            </div>

                            {/* Name */}
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={s.formLabel}>Your Name (optional)</label>
                                <input
                                    type="text"
                                    value={reviewName}
                                    onChange={(e) => setReviewName(e.target.value)}
                                    placeholder="Enter your name"
                                    style={s.formInput}
                                />
                            </div>

                            {/* Review Text */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={s.formLabel}>Your Review</label>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Share your experience with this piece..."
                                    rows={4}
                                    style={s.formTextarea}
                                />
                            </div>

                            {/* Submit */}
                            <button type="submit" style={s.submitBtn}>
                                Submit Review
                            </button>
                        </form>
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
        padding: '0 5vw 40px',
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
        color: '#D4AF37',
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
        padding: '0.85rem 0',
        cursor: 'pointer',
        borderBottom: '1px solid #DEE4EF',
    },
    accordionLabel: {
        fontSize: '0.78rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#0C2340',
    },
    accordionIcon: {
        fontSize: '1.1rem',
        color: '#5A6B80',
        display: 'inline-block',
    },
    accordionContent: {
        padding: '0.75rem 0 0.5rem 1.25rem',
        margin: 0,
        listStyle: 'none',
    },
    accordionItem: {
        fontSize: '0.82rem',
        color: '#5A6B80',
        lineHeight: 1.6,
        padding: '0.2rem 0',
        position: 'relative',
        paddingLeft: '1rem',
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

    // ═══════════════════════════════════════════════════════════
    // REVIEWS SECTION
    // ═══════════════════════════════════════════════════════════
    reviewsSection: {
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 5vw 80px',
    },
    reviewsContainer: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: 'clamp(2rem, 4vw, 3.5rem)',
        border: '1px solid #DEE4EF',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    },
    reviewsTitle: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#0C2340',
        marginBottom: '1.5rem',
        letterSpacing: '-0.01em',
    },
    ratingSummary: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '0.5rem',
    },
    ratingBig: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        backgroundColor: '#F6F4FA',
        borderRadius: '12px',
    },

    // Review Cards
    reviewsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        marginBottom: '0.5rem',
    },
    reviewCard: {
        padding: '1.25rem',
        borderRadius: '10px',
        backgroundColor: '#FAFAFE',
        border: '1px solid #EEEDF5',
    },
    reviewHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '0.75rem',
    },
    reviewAvatar: {
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        backgroundColor: '#4F7DB5',
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        fontWeight: 700,
        fontSize: '0.85rem',
        flexShrink: 0,
    },
    reviewAuthor: {
        fontWeight: 600,
        fontSize: '0.85rem',
        color: '#0C2340',
        marginBottom: '0.1rem',
    },
    reviewDate: {
        fontSize: '0.72rem',
        color: '#5A6B80',
    },
    reviewStars: {
        marginLeft: 'auto',
        fontSize: '0.85rem',
        color: '#D4AF37',
        letterSpacing: '2px',
    },
    reviewBody: {
        fontSize: '0.88rem',
        color: '#5A6B80',
        lineHeight: 1.6,
    },

    // Write Review Form
    writeReview: {
        marginTop: '0.5rem',
    },
    writeReviewTitle: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#0C2340',
        marginBottom: '1.25rem',
    },
    reviewForm: {
        maxWidth: '600px',
    },
    formLabel: {
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#5A6B80',
        marginBottom: '0.5rem',
    },
    formInput: {
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #DEE4EF',
        borderRadius: '8px',
        fontSize: '0.88rem',
        color: '#0C2340',
        backgroundColor: '#FAFAFE',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
    },
    formTextarea: {
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #DEE4EF',
        borderRadius: '8px',
        fontSize: '0.88rem',
        color: '#0C2340',
        backgroundColor: '#FAFAFE',
        outline: 'none',
        resize: 'vertical',
        fontFamily: 'inherit',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
    },
    submitBtn: {
        padding: '0.85rem 2.5rem',
        backgroundColor: '#4F7DB5',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.82rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        cursor: 'pointer',
        transition: 'background-color 0.25s ease',
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

    /* Accordion bullet points */
    .pdp-info li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #4F7DB5;
        font-weight: 700;
    }

    /* Form focus states */
    input:focus, textarea:focus {
        border-color: #4F7DB5 !important;
    }

    /* Submit button hover */
    button[type="submit"]:hover {
        background-color: #3B6A9E !important;
    }
`;


export default ProductDetailPage;
