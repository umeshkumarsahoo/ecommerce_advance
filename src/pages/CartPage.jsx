import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import LuxuryButton from '../components/LuxuryButton';

/**
 * CartPage - Shopping cart with item management
 */
function CartPage() {
    const { cartItems, cartCount, cartSubtotal, shipping, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.cart-header', { opacity: 0, y: -30 });
            gsap.set('.cart-item', { opacity: 0, x: -30 });
            gsap.set('.cart-summary', { opacity: 0, x: 30 });

            const tl = gsap.timeline({ delay: 0.2 });

            tl.to('.cart-header', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
                .to('.cart-item', {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out'
                }, '-=0.4')
                .to('.cart-summary', {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.4');
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleRemoveItem = (id) => {
        const item = document.querySelector(`[data-item-id="${id}"]`);
        if (item) {
            gsap.to(item, {
                opacity: 0,
                x: -50,
                height: 0,
                padding: 0,
                margin: 0,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => removeFromCart(id)
            });
        } else {
            removeFromCart(id);
        }
    };

    // Sample product images for demo
    const productImages = {
        1: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop',
        2: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop',
        3: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=200&h=200&fit=crop',
        default: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop'
    };

    return (
        <div className="cart-page" ref={containerRef} style={{
            minHeight: '100vh',
            paddingTop: '120px',
            paddingBottom: '80px',
            backgroundColor: 'var(--color-bg)'
        }}>
            <div className="container">
                {/* Header */}
                <div className="cart-header" style={{ marginBottom: '4rem' }}>
                    <p style={{
                        fontSize: '0.7rem',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'var(--color-accent)',
                        marginBottom: '0.5rem'
                    }}>
                        Your Selection
                    </p>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 400
                    }}>
                        Shopping Cart
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                        {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    /* Empty Cart */
                    <div style={{
                        textAlign: 'center',
                        padding: '6rem 2rem',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.5rem',
                            marginBottom: '1rem'
                        }}>
                            Your cart is empty
                        </p>
                        <p style={{
                            color: 'var(--color-text-muted)',
                            marginBottom: '2rem'
                        }}>
                            Discover our curated collections and find something beautiful.
                        </p>
                        <Link to="/collections">
                            <LuxuryButton>Browse Collections</LuxuryButton>
                        </Link>
                    </div>
                ) : (
                    /* Cart Content */
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 400px',
                        gap: '3rem',
                        alignItems: 'start'
                    }}>
                        {/* Cart Items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {cartItems.map(item => (
                                <div
                                    key={item.id}
                                    data-item-id={item.id}
                                    className="cart-item"
                                    style={{
                                        display: 'flex',
                                        gap: '1.5rem',
                                        padding: '1.5rem',
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '8px',
                                        transition: 'border-color 0.3s'
                                    }}
                                >
                                    {/* Product Image */}
                                    <div style={{
                                        width: '120px',
                                        height: '150px',
                                        flexShrink: 0,
                                        overflow: 'hidden',
                                        borderRadius: '4px',
                                        background: '#111'
                                    }}>
                                        <img
                                            src={productImages[item.id] || productImages.default}
                                            alt={item.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div>
                                            <h3 style={{
                                                fontFamily: 'var(--font-display)',
                                                fontSize: '1.1rem',
                                                marginBottom: '0.5rem'
                                            }}>
                                                {item.name}
                                            </h3>
                                            <p style={{
                                                color: 'var(--color-text-muted)',
                                                fontSize: '0.85rem'
                                            }}>
                                                {item.category || 'Luxury Collection'}
                                            </p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '4px'
                                            }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: 'var(--color-text)',
                                                        cursor: 'pointer',
                                                        fontSize: '1rem'
                                                    }}
                                                >
                                                    −
                                                </button>
                                                <span style={{
                                                    padding: '0.5rem 1rem',
                                                    minWidth: '40px',
                                                    textAlign: 'center'
                                                }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: 'var(--color-text)',
                                                        cursor: 'pointer',
                                                        fontSize: '1rem'
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: 'var(--color-text-muted)',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem',
                                                    textDecoration: 'underline',
                                                    textUnderlineOffset: '3px'
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div style={{
                                        textAlign: 'right',
                                        minWidth: '100px'
                                    }}>
                                        <p style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1.2rem',
                                            color: 'var(--color-accent)'
                                        }}>
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </p>
                                        {item.quantity > 1 && (
                                            <p style={{
                                                fontSize: '0.75rem',
                                                color: 'var(--color-text-muted)',
                                                marginTop: '0.25rem'
                                            }}>
                                                ${item.price.toLocaleString()} each
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Continue Shopping */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '1rem'
                            }}>
                                <Link to="/collections" style={{
                                    color: 'var(--color-text-muted)',
                                    fontSize: '0.85rem',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '3px'
                                }}>
                                    ← Continue Shopping
                                </Link>
                                <button
                                    onClick={clearCart}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--color-text-muted)',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '3px'
                                    }}
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="cart-summary" style={{
                            position: 'sticky',
                            top: '120px',
                            padding: '2rem',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px'
                        }}>
                            <h3 style={{
                                fontSize: '0.7rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'var(--color-text-muted)',
                                marginBottom: '1.5rem'
                            }}>
                                Order Summary
                            </h3>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                paddingBottom: '1.5rem',
                                borderBottom: '1px solid var(--color-border)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                                    <span>${cartSubtotal.toLocaleString()}</span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                                </div>
                                {shipping === 0 && (
                                    <p style={{
                                        fontSize: '0.75rem',
                                        color: '#22c55e',
                                        textAlign: 'right'
                                    }}>
                                        ✓ Free shipping on orders over $500
                                    </p>
                                )}
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '1.5rem 0',
                                borderBottom: '1px solid var(--color-border)'
                            }}>
                                <span style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.1rem'
                                }}>
                                    Total
                                </span>
                                <span style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.3rem',
                                    color: 'var(--color-accent)'
                                }}>
                                    ${cartTotal.toLocaleString()}
                                </span>
                            </div>

                            <div style={{ marginTop: '1.5rem' }}>
                                <LuxuryButton
                                    onClick={() => navigate('/payment')}
                                    style={{
                                        width: '100%',
                                        background: 'var(--color-accent)',
                                        color: '#000',
                                        border: 'none'
                                    }}
                                >
                                    Proceed to Checkout
                                </LuxuryButton>
                            </div>

                            <p style={{
                                fontSize: '0.75rem',
                                color: 'var(--color-text-muted)',
                                textAlign: 'center',
                                marginTop: '1rem'
                            }}>
                                Secure checkout • 30-day returns
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;
