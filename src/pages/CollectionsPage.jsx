import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS, CATEGORIES, GENDERS, GENDER_CATEGORIES } from '../data/productData';
import SkeletonGrid from '../components/SkeletonLoader';

// ═══════════════════════════════════════════════════════════════
// CollectionsPage — Premium Minimal Filter Layout
// Left: product grid (75%) | Right: typography-focused filter (25%)
// No boxed/card filter UI — blends with page background
// ═══════════════════════════════════════════════════════════════

const FILTER_CATEGORIES = CATEGORIES;

function CollectionsPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const { toggleWishlist, isWishlisted } = useWishlist();

    // --- Filter State ---
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const drawerRef = useRef(null);

    // Lock body scroll when mobile filter is open
    useEffect(() => {
        document.body.style.overflow = mobileFilterOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileFilterOpen]);

    // Simulate loading for skeleton
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 400);
        return () => clearTimeout(timer);
    }, []);

    // --- Toggle category checkbox ---
    const toggleCategory = (cat) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    // --- Filtering Logic ---
    const getFilteredProducts = () => {
        let filtered = [...PRODUCTS];
        if (selectedGender) {
            filtered = filtered.filter((p) => p.gender === selectedGender);
        }
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((p) => selectedCategories.includes(p.category));
        }
        if (priceMin !== '') filtered = filtered.filter((p) => p.price >= Number(priceMin));
        if (priceMax !== '') filtered = filtered.filter((p) => p.price <= Number(priceMax));
        if (inStockOnly) filtered = filtered.filter((p) => p.inStock);
        if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
        return filtered;
    };

    const filteredProducts = getFilteredProducts();
    const activeFilterCount = selectedCategories.length + (selectedGender ? 1 : 0) + (priceMin ? 1 : 0) + (priceMax ? 1 : 0) + (inStockOnly ? 1 : 0);

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedGender('');
        setPriceMin('');
        setPriceMax('');
        setInStockOnly(false);
        setSortBy('newest');
    };

    // --- Add to Cart ---
    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAuthenticated) {
            showToast('Please login to continue', 'error');
            navigate('/login');
            return;
        }
        addToCart({ id: product.id, name: product.name, price: product.price, category: product.category, image: product.images[0] });
        showToast(`${product.name} added to cart`, 'success');
    };

    // --- Star rating ---
    const renderStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        let stars = '';
        for (let i = 0; i < full; i++) stars += '★';
        if (half) stars += '½';
        for (let i = stars.length; i < 5; i++) stars += '☆';
        return stars;
    };

    // ═══════════════════════════════════════════════════════════
    // FILTER PANEL CONTENT (shared between desktop sidebar & mobile drawer)
    // ═══════════════════════════════════════════════════════════
    const filterContent = (
        <>
            {/* Gender → Category: Expandable List / Sublist */}
            <div style={f.section}>
                <h4 style={f.sectionTitle}>Shop By</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {GENDERS.map((g) => {
                        const isExpanded = selectedGender === g;
                        const subCats = GENDER_CATEGORIES[g];
                        return (
                            <div key={g} style={{ borderBottom: '1px solid #DEE4EF' }}>
                                {/* Gender Header — clickable */}
                                <button
                                    onClick={() => {
                                        setSelectedGender(isExpanded ? '' : g);
                                        setSelectedCategories([]);
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        padding: '14px 0',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: isExpanded ? '#4F7DB5' : '#0C2340',
                                        fontWeight: 600,
                                        fontSize: '0.92rem',
                                        letterSpacing: '0.03em',
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    <span>{g}</span>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        transition: 'transform 0.3s ease',
                                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                                        color: '#5A6B80',
                                    }}>▼</span>
                                </button>

                                {/* Sub-categories — slide open */}
                                <div style={{
                                    maxHeight: isExpanded ? `${subCats.length * 38 + 10}px` : '0',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.35s ease',
                                    paddingLeft: '1rem',
                                }}>
                                    {subCats.map((cat) => (
                                        <label key={cat} style={{ ...f.checkboxRow, padding: '6px 0' }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => toggleCategory(cat)}
                                                style={f.checkboxInput}
                                            />
                                            <span style={f.checkboxLabel}>{cat}</span>
                                        </label>
                                    ))}
                                    <div style={{ height: '8px' }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={f.divider} />

            {/* Price */}
            <div style={f.section}>
                <h4 style={f.sectionTitle}>Price</h4>
                <div style={f.priceRow}>
                    <input
                        type="number"
                        placeholder="Min"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        style={f.priceInput}
                        min="0"
                    />
                    <span style={f.priceDash}>—</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        style={f.priceInput}
                        min="0"
                    />
                </div>
            </div>

            <div style={f.divider} />

            {/* Sort By */}
            <div style={f.section}>
                <h4 style={f.sectionTitle}>Sort By</h4>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={f.sortSelect}>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>

            <div style={f.divider} />

            {/* Availability */}
            <div style={f.section}>
                <h4 style={f.sectionTitle}>Availability</h4>
                <label style={f.checkboxRow}>
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        style={f.checkboxInput}
                    />
                    <span style={f.checkboxLabel}>In Stock</span>
                </label>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
                <>
                    <div style={f.divider} />
                    <button onClick={clearAllFilters} style={f.clearBtn}>
                        Clear All Filters
                    </button>
                </>
            )}
        </>
    );

    // ═══════════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════════
    return (
        <div style={s.page}>
            <style>{responsiveCSS}</style>

            {/* Hero */}
            <section style={s.hero}>
                <h1 style={s.heroTitle}>Our Collections</h1>
                <p style={s.heroSub}>Handcrafted jewellery for those who appreciate timeless artistry.</p>
            </section>

            {/* Mobile Filter Toggle */}
            <div className="collections-mobile-toggle">
                <button onClick={() => setMobileFilterOpen(true)} style={s.mobileToggleBtn}>
                    <span>Filter</span>
                    {activeFilterCount > 0 && <span style={s.filterBadge}>{activeFilterCount}</span>}
                </button>
            </div>

            {/* Mobile Filter Overlay + Drawer */}
            <div
                className="collections-mobile-overlay"
                style={{
                    ...s.mobileOverlay,
                    opacity: mobileFilterOpen ? 1 : 0,
                    pointerEvents: mobileFilterOpen ? 'auto' : 'none',
                }}
                onClick={() => setMobileFilterOpen(false)}
            />
            <div
                ref={drawerRef}
                className="collections-mobile-drawer"
                style={{
                    ...s.mobileDrawer,
                    transform: mobileFilterOpen ? 'translateX(0)' : 'translateX(100%)',
                }}
            >
                <div style={s.drawerHeader}>
                    <h3 style={{ ...f.sectionTitle, marginBottom: 0, fontSize: '1rem' }}>Filters</h3>
                    <button onClick={() => setMobileFilterOpen(false)} style={s.drawerClose}>✕</button>
                </div>
                <div style={s.drawerBody}>
                    {filterContent}
                </div>
            </div>

            {/* Main Layout */}
            <div style={s.mainLayout} className="collections-main-layout">

                {/* Left: Product Grid */}
                <div className="collections-grid-area">
                    {/* Results Count */}
                    <div style={s.resultsBar}>
                        <span style={s.resultsCount}>
                            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                            {selectedCategories.length === 1 ? ` in ${selectedCategories[0]}` : ''}
                            {selectedCategories.length > 1 ? ` in ${selectedCategories.length} categories` : ''}
                        </span>
                    </div>

                    {isLoading ? (
                        <SkeletonGrid count={6} />
                    ) : filteredProducts.length === 0 ? (
                        <div style={s.emptyState}>
                            <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</p>
                            <h3 style={s.emptyTitle}>No products found</h3>
                            <p style={s.emptyText}>Try adjusting your filters or selecting a different category.</p>
                            <button onClick={clearAllFilters} style={{ ...f.clearBtn, marginTop: '1.25rem', maxWidth: '200px' }}>
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                        <div className="collections-product-grid" style={s.productGrid}>
                            {filteredProducts.map((product) => (
                                <Link
                                    to={`/product/${product.id}`}
                                    key={product.id}
                                    className="collections-product-card"
                                    style={s.card}
                                >
                                    <div style={s.cardImageWrap}>
                                        <img src={product.images[0]} alt={product.name} style={s.cardImage} loading="lazy" />
                                        {!product.inStock && <span style={s.soldOutBadge}>Sold Out</span>}
                                        <button
                                            style={{
                                                ...s.wishlistBtn,
                                                ...(isWishlisted(product.id) ? { color: '#E74C3C', backgroundColor: 'rgba(231,76,60,0.1)' } : {}),
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleWishlist({
                                                    id: product.id,
                                                    name: product.name,
                                                    price: product.price,
                                                    category: product.category,
                                                    image: product.images[0],
                                                });
                                            }}
                                            title="Toggle Wishlist"
                                        >{isWishlisted(product.id) ? '♥' : '♡'}</button>
                                    </div>
                                    <div style={s.cardInfo}>
                                        <span style={s.cardCategory}>{product.category}</span>
                                        <h3 style={s.cardName}>{product.name}</h3>
                                        <div style={s.cardMeta}>
                                            <span style={s.cardStars}>{renderStars(product.rating)}</span>
                                            <span style={s.cardPrice}>₹{product.price.toLocaleString('en-IN')}</span>
                                        </div>
                                        <button
                                            onClick={(e) => handleAddToCart(e, product)}
                                            disabled={!product.inStock}
                                            style={{ ...s.addToCartBtn, ...(product.inStock ? {} : s.addToCartBtnDisabled) }}
                                        >
                                            {product.inStock ? 'Add to Cart' : 'Sold Out'}
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Filter Panel — NO card/box, blends with page */}
                <aside className="collections-filter-panel" style={s.filterPanel}>
                    {filterContent}
                </aside>
            </div>
        </div>
    );
}


// ═══════════════════════════════════════════════════════════════
// PAGE-LEVEL STYLES
// ═══════════════════════════════════════════════════════════════
const s = {
    page: {
        backgroundColor: '#F6F4FA',
        minHeight: '100vh',
        fontFamily: "'Inter', 'Instrument Sans', sans-serif",
    },

    // Hero
    hero: {
        paddingTop: '140px',
        paddingBottom: '50px',
        textAlign: 'center',
        padding: '140px 5vw 50px',
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

    // Main Layout
    mainLayout: {
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 5vw 80px',
        display: 'flex',
        gap: '40px',
    },

    // Right Filter Panel — NO background, NO border, NO shadow
    filterPanel: {
        width: '260px',
        minWidth: '260px',
        position: 'sticky',
        top: '110px',
        alignSelf: 'flex-start',
        paddingLeft: '32px',
        borderLeft: '1px solid #DEE4EF',
    },

    // Results
    resultsBar: { marginBottom: '1.25rem' },
    resultsCount: { fontSize: '0.85rem', color: '#5A6B80' },

    // Product Grid
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
    },

    // Card
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #DEE4EF',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardImageWrap: {
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
    soldOutBadge: {
        position: 'absolute',
        top: '12px',
        left: '12px',
        backgroundColor: 'rgba(0,0,0,0.55)',
        color: '#fff',
        fontSize: '0.68rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        padding: '0.3rem 0.7rem',
        borderRadius: '4px',
    },
    wishlistBtn: {
        position: 'absolute',
        top: '12px',
        right: '12px',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.9)',
        border: 'none',
        fontSize: '1.1rem',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        transition: 'all 0.2s ease',
        color: '#0C2340',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
    },
    cardMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.85rem',
    },
    cardStars: {
        fontSize: '0.8rem',
        color: '#4F7DB5',
        letterSpacing: '1px',
    },
    cardPrice: {
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#0C2340',
    },
    addToCartBtn: {
        width: '100%',
        padding: '0.65rem',
        backgroundColor: '#4F7DB5',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.78rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        cursor: 'pointer',
        transition: 'background-color 0.25s ease',
    },
    addToCartBtnDisabled: {
        backgroundColor: '#B8C6D8',
        cursor: 'not-allowed',
        color: '#5A6B80',
    },

    // Empty State
    emptyState: {
        textAlign: 'center',
        padding: '4rem 2rem',
        borderRadius: '12px',
    },
    emptyTitle: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: '1.2rem',
        fontWeight: 600,
        color: '#0C2340',
        marginBottom: '0.4rem',
    },
    emptyText: {
        fontSize: '0.88rem',
        color: '#5A6B80',
    },

    // Mobile Toggle
    mobileToggleBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1.25rem',
        backgroundColor: 'transparent',
        border: '1px solid #DEE4EF',
        borderRadius: '8px',
        fontSize: '0.85rem',
        fontWeight: 500,
        color: '#0C2340',
        cursor: 'pointer',
        letterSpacing: '0.05em',
    },
    filterBadge: {
        backgroundColor: '#4F7DB5',
        color: '#fff',
        fontSize: '0.6rem',
        fontWeight: 700,
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
    },

    // Mobile Overlay
    mobileOverlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(12,35,64,0.35)',
        zIndex: 998,
        transition: 'opacity 0.3s ease',
    },

    // Mobile Drawer (slides from right)
    mobileDrawer: {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '320px',
        maxWidth: '85vw',
        height: '100vh',
        backgroundColor: '#F6F4FA',
        zIndex: 999,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
    },
    drawerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 28px 20px',
        borderBottom: '1px solid #DEE4EF',
    },
    drawerClose: {
        background: 'none',
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
        color: '#0C2340',
        padding: '4px',
    },
    drawerBody: {
        padding: '28px',
        flex: 1,
        overflowY: 'auto',
    },
};


// ═══════════════════════════════════════════════════════════════
// FILTER PANEL STYLES — Typography-focused, no card/box
// ═══════════════════════════════════════════════════════════════
const f = {
    section: {
        marginBottom: '0',
    },
    sectionTitle: {
        fontSize: '0.82rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#0C2340',
        marginBottom: '14px',
    },
    divider: {
        height: '1px',
        backgroundColor: '#DEE4EF',
        margin: '24px 0',
        border: 'none',
    },

    // Checkboxes
    checkboxList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    checkboxRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
    },
    checkboxInput: {
        width: '16px',
        height: '16px',
        accentColor: '#4F7DB5',
        cursor: 'pointer',
        margin: 0,
    },
    checkboxLabel: {
        fontSize: '0.88rem',
        color: '#2A4060',
        lineHeight: 1,
    },

    // Price
    priceRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    priceInput: {
        flex: 1,
        padding: '8px 10px',
        border: '1px solid #DEE4EF',
        borderRadius: '6px',
        fontSize: '0.82rem',
        color: '#0C2340',
        backgroundColor: 'transparent',
        outline: 'none',
        width: '70px',
        transition: 'border-color 0.2s',
    },
    priceDash: {
        color: '#5A6B80',
        fontSize: '0.75rem',
    },

    // Sort
    sortSelect: {
        width: '100%',
        padding: '8px 10px',
        border: '1px solid #DEE4EF',
        borderRadius: '6px',
        fontSize: '0.82rem',
        color: '#0C2340',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        outline: 'none',
        appearance: 'auto',
    },

    // Clear
    clearBtn: {
        width: '100%',
        padding: '10px',
        fontSize: '0.78rem',
        fontWeight: 500,
        color: '#4F7DB5',
        border: '1px solid #4F7DB5',
        borderRadius: '6px',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textAlign: 'center',
        letterSpacing: '0.05em',
    },
};


// ═══════════════════════════════════════════════════════════════
// RESPONSIVE CSS
// ═══════════════════════════════════════════════════════════════
const responsiveCSS = `
    /* Desktop: hide mobile elements */
    .collections-mobile-toggle { display: none; }
    .collections-mobile-overlay { display: none; }
    .collections-mobile-drawer { display: none; }

    .collections-grid-area { flex: 1; min-width: 0; }

    /* Card hover */
    .collections-product-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important;
    }
    .collections-product-card:hover img {
        transform: scale(1.05);
    }

    /* Tablet: <= 1024px — collapse filter to mobile drawer */
    @media (max-width: 1024px) {
        .collections-filter-panel {
            display: none !important;
        }
        .collections-mobile-toggle {
            display: flex;
            padding: 0 5vw;
            margin-bottom: 1rem;
        }
        .collections-mobile-overlay {
            display: block !important;
        }
        .collections-mobile-drawer {
            display: flex !important;
        }
        .collections-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }

    /* Mobile: <= 640px */
    @media (max-width: 640px) {
        .collections-product-grid {
            grid-template-columns: 1fr !important;
        }
    }

    /* Price input focus */
    .collections-grid-area input[type="number"]:focus {
        border-color: #4F7DB5 !important;
    }
`;


export default CollectionsPage;
