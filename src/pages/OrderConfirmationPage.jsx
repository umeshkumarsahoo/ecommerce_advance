import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import LuxuryButton from '../components/LuxuryButton';

/**
 * OrderConfirmationPage — Post-checkout success page
 * 
 * Reads order data from sessionStorage (set by PaymentPage).
 * Shows order number, summary, estimated delivery, and CTAs.
 * Redirects to home if no order data exists (direct access).
 */
const OrderConfirmationPage = () => {
    const navigate = useNavigate();
    const pageRef = useRef(null);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Retrieve order data from sessionStorage
        const raw = sessionStorage.getItem('becane_last_order');
        if (!raw) {
            navigate('/', { replace: true });
            return;
        }

        try {
            const data = JSON.parse(raw);
            setOrder(data);
            // Clear after reading so refreshing the page or going back won't re-show
            sessionStorage.removeItem('becane_last_order');
        } catch {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    // GSAP entrance after order loads
    useEffect(() => {
        if (!order) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo('.oc-checkmark',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' }
            )
                .fromTo('.oc-title',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6 },
                    '-=0.3'
                )
                .fromTo('.oc-order-id',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5 },
                    '-=0.3'
                )
                .fromTo('.oc-details > *',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
                    '-=0.2'
                )
                .fromTo('.oc-actions',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5 },
                    '-=0.2'
                );
        }, pageRef);

        return () => ctx.revert();
    }, [order]);

    if (!order) return null;

    // Estimated delivery: 3-5 business days from now
    const deliveryStart = new Date();
    deliveryStart.setDate(deliveryStart.getDate() + 3);
    const deliveryEnd = new Date();
    deliveryEnd.setDate(deliveryEnd.getDate() + 5);

    const formatDate = (d) => d.toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
    });

    return (
        <div ref={pageRef} className="oc-page">
            <div className="oc-container">
                {/* Animated checkmark */}
                <div className="oc-checkmark">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <h1 className="oc-title">Order Confirmed</h1>

                <div className="oc-order-id">
                    <span className="oc-label">Order Number</span>
                    <span className="oc-value">{order.orderNumber}</span>
                </div>

                <div className="oc-details">
                    {/* Items summary */}
                    <div className="oc-card">
                        <h3 className="oc-card-heading">Items Ordered</h3>
                        <div className="oc-items-list">
                            {order.items.map((item, i) => (
                                <div key={i} className="oc-item-row">
                                    <div>
                                        <span className="oc-item-name">{item.name}</span>
                                        <span className="oc-item-qty">× {item.quantity}</span>
                                    </div>
                                    <span className="oc-item-price">
                                        ${(item.price * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="oc-totals">
                            <div className="oc-total-row">
                                <span>Subtotal</span>
                                <span>${order.subtotal.toLocaleString()}</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="oc-total-row oc-discount">
                                    <span>Discount</span>
                                    <span>−${order.discount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="oc-total-row">
                                <span>Shipping</span>
                                <span>{order.shipping === 0 ? 'Free' : `$${order.shipping}`}</span>
                            </div>
                            <div className="oc-total-row oc-grand-total">
                                <span>Total</span>
                                <span>${order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery info */}
                    <div className="oc-card oc-delivery-card">
                        <h3 className="oc-card-heading">Estimated Delivery</h3>
                        <p className="oc-delivery-dates">
                            {formatDate(deliveryStart)} — {formatDate(deliveryEnd)}
                        </p>
                        <p className="oc-delivery-note">
                            You'll receive a confirmation email with tracking details shortly.
                        </p>
                    </div>
                </div>

                {/* CTAs */}
                <div className="oc-actions">
                    <Link to="/collections">
                        <LuxuryButton>Continue Shopping</LuxuryButton>
                    </Link>
                    <Link to="/dashboard" className="oc-secondary-link">
                        View Dashboard →
                    </Link>
                </div>
            </div>

            <style>{`
                .oc-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 120px 2rem 80px;
                    background: var(--bg-primary);
                }

                .oc-container {
                    max-width: 560px;
                    width: 100%;
                    text-align: center;
                }

                .oc-checkmark {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: var(--accent);
                    color: var(--bg-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 2rem;
                }

                .oc-title {
                    font-family: var(--font-display);
                    font-size: clamp(2rem, 4vw, 3rem);
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 1.5rem;
                }

                .oc-order-id {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                    margin-bottom: 2.5rem;
                }
                .oc-label {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: var(--text-muted);
                }
                .oc-value {
                    font-family: var(--font-display);
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--accent);
                    letter-spacing: 0.1em;
                }

                .oc-details {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 2.5rem;
                    text-align: left;
                }

                .oc-card {
                    padding: 1.75rem;
                    background: rgba(0, 0, 0, 0.02);
                    border: 1px solid var(--border-light);
                    border-radius: 12px;
                }

                .oc-card-heading {
                    font-size: 0.7rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: var(--text-muted);
                    margin-bottom: 1rem;
                }

                .oc-items-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-bottom: 1.25rem;
                    padding-bottom: 1.25rem;
                    border-bottom: 1px solid var(--border-light);
                }

                .oc-item-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.875rem;
                }
                .oc-item-name { color: var(--text-primary); }
                .oc-item-qty {
                    color: var(--text-muted);
                    margin-left: 0.5rem;
                    font-size: 0.8rem;
                }
                .oc-item-price { color: var(--text-secondary); }

                .oc-totals {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .oc-total-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }
                .oc-total-row.oc-discount { color: #22c55e; }
                .oc-total-row.oc-grand-total {
                    padding-top: 0.75rem;
                    margin-top: 0.5rem;
                    border-top: 1px solid var(--border-light);
                    font-family: var(--font-display);
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: var(--accent);
                }

                .oc-delivery-dates {
                    font-family: var(--font-display);
                    font-size: 1rem;
                    font-weight: 500;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                }
                .oc-delivery-note {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    line-height: 1.6;
                }

                .oc-actions {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }
                .oc-secondary-link {
                    font-size: 0.85rem;
                    color: var(--accent);
                    text-decoration: none;
                    letter-spacing: 0.05em;
                    transition: opacity 0.3s;
                }
                .oc-secondary-link:hover { opacity: 0.7; }

                @media (max-width: 640px) {
                    .oc-page { padding: 100px 1rem 60px; }
                    .oc-card { padding: 1.25rem; }
                }
            `}</style>
        </div>
    );
};

export default OrderConfirmationPage;
