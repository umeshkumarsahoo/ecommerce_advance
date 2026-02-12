import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LuxuryButton from '../components/LuxuryButton';

/**
 * PaymentPage - Checkout with payment options and order summary
 */
function PaymentPage() {
    const { cartItems, cartSubtotal, shipping, cartTotal, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponApplied, setCouponApplied] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: 'United States',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0 && !orderPlaced) {
            navigate('/cart');
        }
    }, [cartItems, navigate, orderPlaced]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.checkout-section', { opacity: 0, y: 30 });
            gsap.set('.order-summary-side', { opacity: 0, x: 30 });

            const tl = gsap.timeline({ delay: 0.2 });

            tl.to('.checkout-section', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power3.out'
            })
                .to('.order-summary-side', {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.4');
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const applyCoupon = () => {
        // Demo coupon codes
        const coupons = {
            'LUXURY10': 10,
            'MEMBER20': 20,
            'VIP30': 30
        };

        if (coupons[couponCode.toUpperCase()]) {
            const discountPercent = coupons[couponCode.toUpperCase()];
            setDiscount(Math.round(cartSubtotal * (discountPercent / 100)));
            setCouponApplied(true);
            gsap.to('.coupon-success', { opacity: 1, duration: 0.3 });
        } else {
            gsap.to('.coupon-error', {
                opacity: 1,
                duration: 0.3,
                onComplete: () => {
                    setTimeout(() => {
                        gsap.to('.coupon-error', { opacity: 0, duration: 0.3 });
                    }, 2000);
                }
            });
        }
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate order processing
        setTimeout(() => {
            setIsProcessing(false);
            setOrderPlaced(true);
            clearCart();

            // Success animation
            gsap.to('.checkout-content', {
                opacity: 0,
                y: -30,
                duration: 0.4
            });
            gsap.to('.success-message', {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: 0.3,
                ease: 'back.out(1.7)'
            });
        }, 2000);
    };

    const finalTotal = cartTotal - discount;

    return (
        <div className="payment-page" ref={containerRef} style={{
            minHeight: '100vh',
            paddingTop: '120px',
            paddingBottom: '80px',
            backgroundColor: 'var(--color-bg)'
        }}>
            {/* Success Message */}
            <div
                className="success-message"
                style={{
                    position: 'fixed',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--color-bg)',
                    zIndex: 100,
                    opacity: orderPlaced ? 1 : 0,
                    pointerEvents: orderPlaced ? 'auto' : 'none',
                    transform: orderPlaced ? 'scale(1)' : 'scale(0.9)'
                }}
            >
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem'
                }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--bg-primary)" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}>
                    Order Confirmed!
                </h1>
                <p style={{
                    color: 'var(--color-text-muted)',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    Thank you for your purchase. Your order is being prepared.
                </p>
                <Link to="/dashboard">
                    <LuxuryButton>View Order Status</LuxuryButton>
                </Link>
            </div>

            <div className="container checkout-content">
                {/* Header */}
                <div className="checkout-section" style={{ marginBottom: '3rem' }}>
                    <Link to="/cart" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--color-text-muted)',
                        fontSize: '0.85rem',
                        marginBottom: '1.5rem',
                        textDecoration: 'none'
                    }}>
                        ← Back to Cart
                    </Link>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 400
                    }}>
                        Checkout
                    </h1>
                </div>

                <form onSubmit={handlePlaceOrder}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 420px',
                        gap: '3rem',
                        alignItems: 'start'
                    }}>
                        {/* Checkout Form */}
                        <div>
                            {/* Contact Information */}
                            <div className="checkout-section" style={{
                                padding: '2rem',
                                background: 'rgba(0,0,0,0.02)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px',
                                marginBottom: '1.5rem'
                            }}>
                                <h3 style={{
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '1.5rem'
                                }}>
                                    Contact Information
                                </h3>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="checkout-section" style={{
                                padding: '2rem',
                                background: 'rgba(0,0,0,0.02)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px',
                                marginBottom: '1.5rem'
                            }}>
                                <h3 style={{
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '1.5rem'
                                }}>
                                    Shipping Address
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group" style={{ marginTop: '1rem' }}>
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="country">Country</label>
                                        <select
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                borderBottom: '1px solid var(--color-border)',
                                                padding: '0.75rem 0',
                                                color: 'var(--color-text)',
                                                width: '100%'
                                            }}
                                        >
                                            <option value="United States">United States</option>
                                            <option value="Canada">Canada</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="France">France</option>
                                            <option value="Germany">Germany</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="zip">ZIP Code</label>
                                        <input
                                            type="text"
                                            id="zip"
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="checkout-section" style={{
                                padding: '2rem',
                                background: 'rgba(0,0,0,0.02)',
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
                                    Payment Method
                                </h3>

                                {/* Payment Options */}
                                <div style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    {[
                                        { id: 'card', label: 'Credit Card', icon: '💳' },
                                        { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                                        { id: 'apple', label: 'Apple Pay', icon: '' }
                                    ].map(method => (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => setPaymentMethod(method.id)}
                                            style={{
                                                flex: 1,
                                                padding: '1rem',
                                                background: paymentMethod === method.id
                                                    ? 'rgba(79, 125, 181, 0.1)'
                                                    : 'rgba(0,0,0,0.02)',
                                                border: `1px solid ${paymentMethod === method.id
                                                    ? 'var(--color-accent)'
                                                    : 'var(--color-border)'}`,
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s'
                                            }}
                                        >
                                            <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: '0.25rem' }}>
                                                {method.icon}
                                            </span>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                color: paymentMethod === method.id
                                                    ? 'var(--color-accent)'
                                                    : 'var(--color-text-muted)'
                                            }}>
                                                {method.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Card Details */}
                                {paymentMethod === 'card' && (
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="cardNumber">Card Number</label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="19"
                                            />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                                            <div className="form-group">
                                                <label htmlFor="expiry">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    id="expiry"
                                                    name="expiry"
                                                    value={formData.expiry}
                                                    onChange={handleChange}
                                                    placeholder="MM/YY"
                                                    maxLength="5"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cvv">CVV</label>
                                                <input
                                                    type="text"
                                                    id="cvv"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleChange}
                                                    placeholder="123"
                                                    maxLength="4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'paypal' && (
                                    <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem' }}>
                                        You will be redirected to PayPal to complete your payment.
                                    </p>
                                )}

                                {paymentMethod === 'apple' && (
                                    <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem' }}>
                                        Use Apple Pay on your device to complete payment.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="order-summary-side" style={{
                            position: 'sticky',
                            top: '120px'
                        }}>
                            <div style={{
                                padding: '2rem',
                                background: 'rgba(0,0,0,0.02)',
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

                                {/* Items Preview */}
                                <div style={{
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    marginBottom: '1.5rem',
                                    paddingRight: '0.5rem'
                                }}>
                                    {cartItems.map(item => (
                                        <div key={item.id} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.75rem 0',
                                            borderBottom: '1px solid var(--color-border-light)'
                                        }}>
                                            <div>
                                                <p style={{ fontSize: '0.85rem' }}>{item.name}</p>
                                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <span>${(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Coupon */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            placeholder="Coupon code"
                                            disabled={couponApplied}
                                            style={{
                                                flex: 1,
                                                background: 'transparent',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '4px',
                                                padding: '0.75rem',
                                                color: 'var(--color-text)',
                                                fontSize: '0.85rem'
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={applyCoupon}
                                            disabled={couponApplied || !couponCode}
                                            style={{
                                                padding: '0.75rem 1rem',
                                                background: couponApplied ? 'transparent' : 'var(--color-accent)',
                                                color: couponApplied ? 'var(--color-text-muted)' : 'var(--bg-primary)',
                                                border: 'none',
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                cursor: couponApplied ? 'default' : 'pointer',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em'
                                            }}
                                        >
                                            {couponApplied ? 'Applied' : 'Apply'}
                                        </button>
                                    </div>
                                    <p className="coupon-success" style={{
                                        fontSize: '0.75rem',
                                        color: '#22c55e',
                                        marginTop: '0.5rem',
                                        opacity: couponApplied ? 1 : 0
                                    }}>
                                        ✓ Coupon applied successfully
                                    </p>
                                    <p className="coupon-error" style={{
                                        fontSize: '0.75rem',
                                        color: '#ef4444',
                                        marginTop: '0.5rem',
                                        opacity: 0
                                    }}>
                                        Invalid coupon code
                                    </p>
                                    <p style={{
                                        fontSize: '0.7rem',
                                        color: 'var(--color-text-muted)',
                                        marginTop: '0.5rem'
                                    }}>
                                        Try: LUXURY10, MEMBER20, VIP30
                                    </p>
                                </div>

                                {/* Totals */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid var(--color-border)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                                        <span>${cartSubtotal.toLocaleString()}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#22c55e' }}>Discount</span>
                                            <span style={{ color: '#22c55e' }}>-${discount.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        paddingTop: '1rem',
                                        marginTop: '0.5rem',
                                        borderTop: '1px solid var(--color-border)'
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
                                            ${finalTotal.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <LuxuryButton
                                    type="submit"
                                    disabled={isProcessing}
                                    style={{
                                        width: '100%',
                                        marginTop: '1.5rem',
                                        background: 'var(--color-accent)',
                                        color: 'var(--bg-primary)',
                                        border: 'none'
                                    }}
                                >
                                    {isProcessing ? 'Processing...' : 'Place Order'}
                                </LuxuryButton>

                                <p style={{
                                    fontSize: '0.7rem',
                                    color: 'var(--color-text-muted)',
                                    textAlign: 'center',
                                    marginTop: '1rem'
                                }}>
                                    🔒 Secure SSL Encryption
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaymentPage;
