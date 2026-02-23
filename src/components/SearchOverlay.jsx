import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { PRODUCTS } from '../data/productData';

/**
 * SearchOverlay — Full-viewport glassmorphism search
 * Filters productData live as user types
 * GSAP slide-down entrance, Escape to close
 */

function SearchOverlay({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const overlayRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Animate open/close
    useEffect(() => {
        if (!overlayRef.current) return;

        if (isOpen) {
            gsap.set(overlayRef.current, { display: 'flex' });
            gsap.fromTo(overlayRef.current,
                { opacity: 0, y: -30 },
                { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
            );
            // Auto-focus input after animation
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            gsap.to(overlayRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.25,
                ease: 'power2.in',
                onComplete: () => {
                    if (overlayRef.current) {
                        gsap.set(overlayRef.current, { display: 'none' });
                    }
                    setQuery('');
                },
            });
        }
    }, [isOpen]);

    // Escape key to close
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Filter products
    const results = query.trim().length > 0
        ? PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8)
        : [];

    const handleSelect = (product) => {
        onClose();
        navigate(`/product/${product.id}`);
    };

    return (
        <>
            <div ref={overlayRef} style={{ ...s.overlay, display: 'none' }}>
                {/* Backdrop */}
                <div style={s.backdrop} onClick={onClose} />

                {/* Search Panel */}
                <div style={s.panel}>
                    {/* Header */}
                    <div style={s.header}>
                        <div style={s.inputWrap}>
                            {/* Search icon */}
                            <svg style={s.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search collections..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                style={s.input}
                                autoComplete="off"
                            />
                            {query && (
                                <button style={s.clearBtn} onClick={() => setQuery('')}>✕</button>
                            )}
                        </div>
                        <button style={s.closeBtn} onClick={onClose}>
                            ESC
                        </button>
                    </div>

                    {/* Results */}
                    <div style={s.results}>
                        {query.trim().length === 0 ? (
                            <div style={s.hint}>
                                <p style={s.hintText}>Search by name, category, or description</p>
                            </div>
                        ) : results.length === 0 ? (
                            <div style={s.hint}>
                                <p style={s.hintEmoji}>🔍</p>
                                <p style={s.hintText}>No results for "{query}"</p>
                            </div>
                        ) : (
                            results.map((product) => (
                                <button
                                    key={product.id}
                                    style={s.resultItem}
                                    onClick={() => handleSelect(product)}
                                    className="search-result-item"
                                >
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        style={s.resultImage}
                                        loading="lazy"
                                    />
                                    <div style={s.resultInfo}>
                                        <span style={s.resultCategory}>{product.category}</span>
                                        <span style={s.resultName}>{product.name}</span>
                                        <span style={s.resultPrice}>₹{product.price.toLocaleString('en-IN')}</span>
                                    </div>
                                    <span style={s.resultArrow}>→</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .search-result-item:hover {
                    background-color: rgba(79, 125, 181, 0.06) !important;
                }
            `}</style>
        </>
    );
}


// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════
const s = {
    overlay: {
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        flexDirection: 'column',
        alignItems: 'center',
    },
    backdrop: {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(12, 35, 64, 0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
    },
    panel: {
        position: 'relative',
        width: '100%',
        maxWidth: '720px',
        marginTop: '12vh',
        backgroundColor: 'rgba(246, 244, 250, 0.97)',
        borderRadius: '16px',
        border: '1px solid #DEE4EF',
        boxShadow: '0 24px 64px rgba(12, 35, 64, 0.25)',
        overflow: 'hidden',
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '20px 24px',
        borderBottom: '1px solid #DEE4EF',
        gap: '12px',
    },
    inputWrap: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        left: '0',
        color: '#5A6B80',
        pointerEvents: 'none',
    },
    input: {
        width: '100%',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        fontSize: '1.1rem',
        fontFamily: "'Inter', 'Instrument Sans', sans-serif",
        color: '#0C2340',
        paddingLeft: '32px',
        paddingRight: '32px',
    },
    clearBtn: {
        position: 'absolute',
        right: 0,
        background: 'none',
        border: 'none',
        fontSize: '0.85rem',
        color: '#5A6B80',
        cursor: 'pointer',
        padding: '4px',
    },
    closeBtn: {
        background: 'none',
        border: '1px solid #DEE4EF',
        borderRadius: '6px',
        padding: '6px 12px',
        fontSize: '0.7rem',
        fontWeight: 600,
        color: '#5A6B80',
        cursor: 'pointer',
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
    },

    // Results
    results: {
        overflowY: 'auto',
        padding: '8px 0',
        flex: 1,
    },
    hint: {
        textAlign: 'center',
        padding: '3rem 2rem',
    },
    hintEmoji: {
        fontSize: '2rem',
        marginBottom: '0.75rem',
    },
    hintText: {
        fontSize: '0.9rem',
        color: '#5A6B80',
    },

    // Result item
    resultItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 24px',
        border: 'none',
        background: 'none',
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    },
    resultImage: {
        width: '56px',
        height: '56px',
        borderRadius: '8px',
        objectFit: 'cover',
        backgroundColor: '#DEE4EF',
    },
    resultInfo: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    resultCategory: {
        fontSize: '0.65rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#4F7DB5',
    },
    resultName: {
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#0C2340',
        fontFamily: "'Instrument Sans', sans-serif",
    },
    resultPrice: {
        fontSize: '0.85rem',
        fontWeight: 500,
        color: '#5A6B80',
    },
    resultArrow: {
        fontSize: '1rem',
        color: '#B8C6D8',
    },
};

export default SearchOverlay;
