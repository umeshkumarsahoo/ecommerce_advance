import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import AnimatedText from '../components/AnimatedText';
import LuxuryButton from '../components/LuxuryButton';
import { useCart } from '../context/CartContext';
const productDatabase = {
    1: {
        id: 1,
        name: "The Trench",
        price: 1200,
        category: "Outerwear",
        description: "A structured masterpiece crafted from heavy-weight Italian cotton. Water-resistant finish with horn buttons.",
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200", "https://images.unsplash.com/photo-1591047139130-1e2eb4f5ca1b?w=1200"]
    },
    2: {
        id: 2,
        name: "Silk Blouse",
        price: 450,
        category: "Tops",
        description: "Pure mulberry silk in a champagne hue. Fluid architecture for the body.",
        images: ["https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=1200"]
    },
    3: {
        id: 3,
        name: "Diamond Pendant",
        price: 3450,
        category: "Jewelry",
        description: "18K white gold pendant featuring a brilliant-cut diamond. Timeless elegance redefined.",
        images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200"]
    },
    4: {
        id: 4,
        name: "Cashmere Coat",
        price: 2200,
        category: "Outerwear",
        description: "Double-faced cashmere in midnight blue. Hand-finished seams for unparalleled softness.",
        images: ["https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=1200"]
    },
    default: {
        id: 1,
        name: "The Trench",
        price: 1200,
        category: "Outerwear",
        description: "A structured masterpiece crafted from heavy-weight Italian cotton. Water-resistant finish with horn buttons.",
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200"]
    }
};

function ProductDetailPage() {
    const { id } = useParams();
    const product = productDatabase[id] || productDatabase.default;
    const pageRef = useRef(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);

    const { addToCart } = useCart();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.product-reveal',
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.5 }
            );
        }, pageRef);
        return () => ctx.revert();
    }, [id]);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.images[0],
            size: selectedSize
        });

        setAddedToCart(true);

        // Animate success
        gsap.to('.add-to-cart-btn', {
            scale: 1.05,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out'
        });

        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <div ref={pageRef} style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
            <div className="container section">
                {/* Breadcrumb */}
                <div className="product-reveal" style={{ marginBottom: '2rem' }}>
                    <Link to="/collections" style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em',
                        textDecoration: 'none'
                    }}>
                        ← Back to Collection
                    </Link>
                </div>

                <div className="grid-2" style={{ alignItems: 'start', gap: '4rem' }}>

                    {/* Product Images */}
                    <div className="product-images product-reveal">
                        <div style={{
                            aspectRatio: '3/4',
                            overflow: 'hidden',
                            marginBottom: '1rem',
                            background: '#111',
                            borderRadius: '4px'
                        }}>
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.6s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        </div>
                        {/* Thumbnail Gallery */}
                        {product.images.length > 1 && (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {product.images.map((img, i) => (
                                    <div key={i} style={{
                                        width: '80px',
                                        height: '100px',
                                        overflow: 'hidden',
                                        borderRadius: '4px',
                                        border: '1px solid var(--color-border)',
                                        cursor: 'pointer'
                                    }}>
                                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div style={{ position: 'sticky', top: '120px' }}>
                        <AnimatedText>
                            <span className="text-caption text-accent" style={{ display: 'block', marginBottom: '1rem' }}>
                                {product.category?.toUpperCase() || 'COLLECTION 001'}
                            </span>
                        </AnimatedText>

                        <AnimatedText delay={0.1}>
                            <h1 className="text-h1" style={{ marginBottom: '1rem' }}>{product.name}</h1>
                        </AnimatedText>

                        <AnimatedText delay={0.2}>
                            <p style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2rem',
                                marginBottom: '2rem',
                                color: 'var(--color-accent)'
                            }}>
                                ${product.price.toLocaleString()}
                            </p>
                        </AnimatedText>

                        <AnimatedText delay={0.3}>
                            <p className="text-body-lg" style={{ marginBottom: '3rem', maxWidth: '400px' }}>
                                {product.description}
                            </p>
                        </AnimatedText>

                        <div className="product-reveal">
                            <span className="text-caption" style={{ display: 'block', marginBottom: '1rem' }}>SIZE</span>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        style={{
                                            border: `1px solid ${selectedSize === size ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                            color: selectedSize === size ? 'var(--color-accent)' : 'var(--color-text)',
                                            background: selectedSize === size ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                                            width: '50px',
                                            height: '50px',
                                            display: 'grid',
                                            placeItems: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        <span className="text-caption" style={{ margin: 0 }}>{size}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="product-reveal">
                            <LuxuryButton
                                className="add-to-cart-btn"
                                onClick={handleAddToCart}
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    background: addedToCart ? '#22c55e' : 'var(--color-accent)',
                                    color: '#000',
                                    border: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                            </LuxuryButton>
                        </div>

                        {/* Wishlist Button */}
                        <div className="product-reveal" style={{ marginTop: '1rem' }}>
                            <button
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'transparent',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-text)',
                                    borderRadius: '999px',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                ♡ Add to Wishlist
                            </button>
                        </div>

                        <div className="product-reveal" style={{ marginTop: '3rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                            <div className="flex-between" style={{ marginBottom: '1rem', cursor: 'pointer' }}>
                                <span className="text-caption">DETAILS & CARE</span>
                                <span className="text-caption">+</span>
                            </div>
                            <div className="flex-between" style={{ marginBottom: '1rem', cursor: 'pointer' }}>
                                <span className="text-caption">SHIPPING & RETURNS</span>
                                <span className="text-caption">+</span>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="product-reveal" style={{
                            marginTop: '2rem',
                            display: 'flex',
                            gap: '2rem',
                            color: 'var(--color-text-muted)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.1em'
                        }}>
                            <span>🔒 Secure Checkout</span>
                            <span>📦 Free Returns</span>
                            <span>✨ Authenticity Guaranteed</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
