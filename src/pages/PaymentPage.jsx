import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import LuxuryButton from '../components/LuxuryButton';

/**
 * PaymentPage → Simplified Checkout (No Payment Gateway)
 *
 * - Shipping address form
 * - Order summary with coupon support
 * - SuperCoin redeem toggle
 * - Single "Place Order" button → Thank You page
 */
function PaymentPage() {
    const { cartItems, cartSubtotal, shipping, cartTotal, clearCart } = useCart();
    const { user, isVIP } = useAuth();
    const { superCoins, placeOrder } = useOrders();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const [isProcessing, setIsProcessing] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponApplied, setCouponApplied] = useState(false);
    const [useCoins, setUseCoins] = useState(false);

    const [formData, setFormData] = useState({
        email: user?.email || '',
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ').slice(1).join(' ') || '',
        address: '',
        city: '',
        country: 'India',
        zip: '',
    });

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);

    // GSAP entrance
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.checkout-section', { opacity: 0, y: 30 });
            gsap.set('.order-summary-side', { opacity: 0, x: 30 });

            const tl = gsap.timeline({ delay: 0.2 });
            tl.to('.checkout-section', {
                opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
            }).to('.order-summary-side', {
                opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            }, '-=0.4');
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Coupon logic
    const applyCoupon = () => {
        const coupons = { LUXURY10: 10, MEMBER20: 20, VIP30: 30 };
        if (coupons[couponCode.toUpperCase()]) {
            const pct = coupons[couponCode.toUpperCase()];
            setDiscount(Math.round(cartSubtotal * (pct / 100)));
            setCouponApplied(true);
        } else {
            showToast('Invalid coupon code', 'error');
        }
    };

    // Coin discount
    const coinDiscount = useCoins ? Math.min(superCoins, cartTotal - discount) : 0;
    const finalTotal = cartTotal - discount - coinDiscount;

    // Coins the user will earn on this order
    const baseCoinsEarned = Math.floor(finalTotal / 100);
    const coinsEarned = isVIP ? baseCoinsEarned * 2 : baseCoinsEarned;

    // Place order handler
    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            const orderData = {
                items: cartItems.map(item => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.images?.[0] || null,
                })),
                subtotal: cartSubtotal,
                discount,
                coinDiscount,
                shipping,
                total: finalTotal,
                shippingAddress: formData,
            };

            const newOrder = placeOrder(orderData, coinDiscount);

            // Store for confirmation page
            sessionStorage.setItem('becane_last_order', JSON.stringify({
                ...newOrder,
                coinsEarned: newOrder.coinsEarned,
            }));

            clearCart();
            setIsProcessing(false);
            showToast('Order placed successfully!', 'success');
            navigate('/order-confirmation');
        }, 1200);
    };

    if (cartItems.length === 0) return null;

    return (
        <div className="payment-page" ref={containerRef} style={{
            minHeight: '100vh',
            paddingTop: '120px',
            paddingBottom: '80px',
            backgroundColor: 'var(--color-bg)',
        }}>
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
                        textDecoration: 'none',
                    }}>
                        ← Back to Cart
                    </Link>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 400,
                    }}>
                        Checkout
                    </h1>
                </div>

                <form onSubmit={handlePlaceOrder}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 420px',
                        gap: '3rem',
                        alignItems: 'start',
                    }}>
                        {/* ── LEFT: Shipping Form ── */}
                        <div>
                            {/* Contact */}
                            <div className="checkout-section" style={{
                                padding: '2rem',
                                background: 'rgba(0,0,0,0.02)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px',
                                marginBottom: '1.5rem',
                            }}>
                                <h3 style={{
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '1.5rem',
                                }}>
                                    Contact Information
                                </h3>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" name="email"
                                        value={formData.email} onChange={handleChange}
                                        placeholder="your@email.com" required />
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="checkout-section" style={{
                                padding: '2rem',
                                background: 'rgba(0,0,0,0.02)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px',
                                marginBottom: '1.5rem',
                            }}>
                                <h3 style={{
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '1.5rem',
                                }}>
                                    Shipping Address
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" id="firstName" name="firstName"
                                            value={formData.firstName} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" id="lastName" name="lastName"
                                            value={formData.lastName} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group" style={{ marginTop: '1rem' }}>
                                    <label htmlFor="address">Address</label>
                                    <input type="text" id="address" name="address"
                                        value={formData.address} onChange={handleChange} required />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input type="text" id="city" name="city"
                                            value={formData.city} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="country">Country</label>
                                        <select id="country" name="country"
                                            value={formData.country} onChange={handleChange}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                borderBottom: '1px solid var(--color-border)',
                                                padding: '0.75rem 0',
                                                color: 'var(--color-text)',
                                                width: '100%',
                                            }}>
                                            <option value="India">India</option>
                                            <option value="United States">United States</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="zip">PIN Code</label>
                                        <input type="text" id="zip" name="zip"
                                            value={formData.zip} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>

                            {/* SuperCoin Section */}
                            <div className="checkout-section" style={{
                                padding: '2rem',
                                background: 'linear-gradient(135deg, rgba(255,193,7,0.06) 0%, rgba(255,152,0,0.04) 100%)',
                                border: '1px solid rgba(255,193,7,0.25)',
                                borderRadius: '8px',
                            }}>
                                <h3 style={{
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}>
                                    <span style={{ fontSize: '1rem' }}>🪙</span> SuperCoins
                                </h3>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1rem',
                                }}>
                                    <div>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                            Available Balance
                                        </p>
                                        <p style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1.5rem',
                                            fontWeight: 600,
                                            color: '#f59e0b',
                                        }}>
                                            {superCoins.toLocaleString()} coins
                                        </p>
                                    </div>
                                    {superCoins > 0 && (
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            cursor: 'pointer',
                                        }}>
                                            <span style={{
                                                fontSize: '0.8rem',
                                                color: 'var(--color-text-muted)',
                                            }}>
                                                Use as discount
                                            </span>
                                            <div
                                                onClick={() => setUseCoins(!useCoins)}
                                                style={{
                                                    width: '44px',
                                                    height: '24px',
                                                    borderRadius: '12px',
                                                    background: useCoins ? '#f59e0b' : 'rgba(0,0,0,0.15)',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.3s',
                                                }}>
                                                <div style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    background: '#fff',
                                                    position: 'absolute',
                                                    top: '2px',
                                                    left: useCoins ? '22px' : '2px',
                                                    transition: 'left 0.3s',
                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                                }} />
                                            </div>
                                        </label>
                                    )}
                                </div>

                                {useCoins && coinDiscount > 0 && (
                                    <div style={{
                                        padding: '0.75rem 1rem',
                                        background: 'rgba(34,197,94,0.08)',
                                        borderRadius: '6px',
                                        border: '1px solid rgba(34,197,94,0.2)',
                                    }}>
                                        <p style={{ fontSize: '0.85rem', color: '#22c55e' }}>
                                            ✓ Redeeming {coinDiscount.toLocaleString()} coins — saving ₹{coinDiscount.toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                )}

                                {superCoins === 0 && (
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                        You'll earn <strong style={{ color: '#f59e0b' }}>{coinsEarned}</strong> coins on this order!
                                        {isVIP && <span style={{ color: '#f59e0b' }}> (2× VIP bonus)</span>}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ── RIGHT: Order Summary ── */}
                        <div className="order-summary-side" style={{
                            position: 'sticky',
                            top: '120px',
                        }}>
                            <div style={{
                                padding: '2rem',
                                background: 'rgba(0,0,0,0.02)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px',
                            }}>
                                <h3 style={{
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '1.5rem',
                                }}>
                                    Order Summary
                                </h3>

                                {/* Items */}
                                <div style={{
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    marginBottom: '1.5rem',
                                    paddingRight: '0.5rem',
                                }}>
                                    {cartItems.map(item => (
                                        <div key={item.id} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.75rem 0',
                                            borderBottom: '1px solid var(--color-border-light)',
                                        }}>
                                            <div>
                                                <p style={{ fontSize: '0.85rem' }}>{item.name}</p>
                                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
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
                                                fontSize: '0.85rem',
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
                                                letterSpacing: '0.1em',
                                            }}
                                        >
                                            {couponApplied ? 'Applied ✓' : 'Apply'}
                                        </button>
                                    </div>
                                    {couponApplied && (
                                        <p style={{ fontSize: '0.75rem', color: '#22c55e', marginTop: '0.5rem' }}>
                                            ✓ Coupon applied — saving ₹{discount.toLocaleString('en-IN')}
                                        </p>
                                    )}
                                    <p style={{
                                        fontSize: '0.7rem',
                                        color: 'var(--color-text-muted)',
                                        marginTop: '0.5rem',
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
                                    borderTop: '1px solid var(--color-border)',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                                        <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#22c55e' }}>Coupon Discount</span>
                                            <span style={{ color: '#22c55e' }}>-₹{discount.toLocaleString('en-IN')}</span>
                                        </div>
                                    )}
                                    {coinDiscount > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#f59e0b' }}>🪙 SuperCoin Discount</span>
                                            <span style={{ color: '#f59e0b' }}>-₹{coinDiscount.toLocaleString('en-IN')}</span>
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        paddingTop: '1rem',
                                        marginTop: '0.5rem',
                                        borderTop: '1px solid var(--color-border)',
                                    }}>
                                        <span style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1.1rem',
                                        }}>
                                            Total
                                        </span>
                                        <span style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1.3rem',
                                            color: 'var(--color-accent)',
                                        }}>
                                            ₹{finalTotal.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>

                                {/* Coins earned preview */}
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255,193,7,0.06)',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(255,193,7,0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}>
                                    <span style={{ fontSize: '0.9rem' }}>🪙</span>
                                    <span style={{ fontSize: '0.8rem', color: '#f59e0b' }}>
                                        You'll earn <strong>{coinsEarned}</strong> SuperCoins
                                        {isVIP && ' (2× VIP)'}
                                    </span>
                                </div>

                                {/* Place Order */}
                                <LuxuryButton
                                    type="submit"
                                    disabled={isProcessing}
                                    style={{
                                        width: '100%',
                                        marginTop: '1.5rem',
                                        background: 'var(--color-accent)',
                                        color: 'var(--bg-primary)',
                                        border: 'none',
                                    }}
                                >
                                    {isProcessing ? 'Placing Order...' : 'Place Order'}
                                </LuxuryButton>

                                <p style={{
                                    fontSize: '0.7rem',
                                    color: 'var(--color-text-muted)',
                                    textAlign: 'center',
                                    marginTop: '1rem',
                                }}>
                                    No payment required — Demo checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Responsive override */}
            <style>{`
                @media (max-width: 900px) {
                    .checkout-content > form > div {
                        grid-template-columns: 1fr !important;
                    }
                    .order-summary-side {
                        position: static !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default PaymentPage;
