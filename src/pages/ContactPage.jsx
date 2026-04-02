import React, { useState } from 'react';
import AnimatedText from '../components/AnimatedText';

function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', text: '' }); // 'success' or 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setStatus({ type: '', text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:5001/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus({ type: 'success', text: data.message });
                setFormData({ name: '', email: '', message: '' }); // Reset form
            } else {
                setStatus({ type: 'error', text: data.message || 'Failed to send message.' });
            }
        } catch (err) {
            setStatus({ type: 'error', text: 'Unable to connect to server. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-wrapper" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

            <div className="container section">
                <div className="grid-2" style={{ alignItems: 'start', position: 'relative' }}>

                    {/* Info */}
                    <div className="contact-info">
                        <AnimatedText>
                            <span className="text-caption text-accent" style={{ display: 'block', marginBottom: '1rem' }}>CONTACT</span>
                        </AnimatedText>
                        <AnimatedText delay={0.1}>
                            <h1 className="text-h1" style={{ marginBottom: '2rem' }}>Get in Touch</h1>
                        </AnimatedText>

                        <div style={{ marginTop: '4rem' }}>
                            <AnimatedText delay={0.2}>
                                <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: '#fff' }}>General Inquiries</h3>
                                <p className="text-caption" style={{ textTransform: 'lowercase', fontSize: '1rem' }}>hello@becane.com</p>
                            </AnimatedText>

                            <AnimatedText delay={0.3}>
                                <div style={{ marginTop: '2rem' }}>
                                    <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: '#fff' }}>Press</h3>
                                    <p className="text-caption" style={{ textTransform: 'lowercase', fontSize: '1rem' }}>press@becane.com</p>
                                </div>
                            </AnimatedText>

                            <AnimatedText delay={0.4}>
                                <div style={{ marginTop: '2rem' }}>
                                    <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: '#fff' }}>Studio</h3>
                                    <p className="text-body-lg">
                                        12 Rue de la Paix<br />
                                        75002 Paris, France
                                    </p>
                                </div>
                            </AnimatedText>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="contact-form-wrap" style={{ marginTop: '4rem' }}>

                        {/* Status Message */}
                        {status.text && (
                            <div style={{
                                padding: '12px 16px',
                                background: status.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                border: `1px solid ${status.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.2)'}`,
                                borderRadius: '8px',
                                color: status.type === 'success' ? '#22c55e' : '#ef4444',
                                fontSize: '0.85rem',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px'
                            }}>
                                <span style={{ fontSize: '1rem', marginTop: '-2px' }}>{status.type === 'success' ? '✓' : '⚠️'}</span>
                                <span>{status.text}</span>
                            </div>
                        )}

                        <form className="flex-column" style={{ gap: '2rem' }} onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="text-caption">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="nivora-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="text-caption">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your email"
                                    className="nivora-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="text-caption">Message</label>
                                <textarea
                                    rows="4"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="nivora-input"
                                    placeholder="How can we help?"
                                    required
                                ></textarea>
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="nivora-btn nivora-btn-accent"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
                .page-wrapper {
                    overflow-x: hidden;
                }

                .nivora-input {
                    width: 100%;
                    max-width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid var(--border-light);
                    padding: 1rem 0;
                    color: var(--text-primary);
                    font-family: var(--font-body);
                    font-size: 1rem;
                    outline: none;
                    transition: border-color 0.3s ease;
                    box-sizing: border-box;
                }

                .nivora-input:focus {
                    border-color: var(--accent);
                }

                /* Fix for potential overflow in grid */
                .contact-info {
                    max-width: 100%;
                    overflow-wrap: break-word;
                }

                .contact-form-wrap {
                    width: 100%;
                    max-width: 100%;
                    overflow: hidden;
                }

                .contact-form-wrap form {
                    width: 100%;
                    max-width: 100%;
                }

                .form-group {
                    width: 100%;
                    max-width: 100%;
                }

                /* Tablet Breakpoint */
                @media (max-width: 1024px) {
                    .grid-2 {
                        gap: 3rem;
                    }
                    
                    .contact-info {
                        padding-right: 2rem;
                    }
                }
                
                /* Mobile Breakpoint */
                @media (max-width: 768px) {
                    .grid-2 {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }
                    
                    .contact-form-wrap {
                        margin-top: 0 !important;
                        padding: 0;
                    }
                    
                    .contact-info {
                        padding-right: 0;
                        text-align: center;
                    }
                    
                    .text-h1 {
                        font-size: clamp(2rem, 5vw, 3rem);
                    }

                    .nivora-input {
                        font-size: 16px; /* Prevents zoom on iOS */
                    }
                }
                
                /* Small Mobile Breakpoint */
                @media (max-width: 480px) {
                    .container.section {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                    
                    .form-group {
                        margin-bottom: 1rem;
                    }
                    
                    .nivora-btn {
                        width: 100%;
                        justify-content: center;
                        padding: 1rem 1.5rem;
                    }

                    .mt-8 {
                        margin-top: 1.5rem;
                    }
                }
            `}</style>

        </div>
    );
}

export default ContactPage;
