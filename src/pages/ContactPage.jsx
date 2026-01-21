import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedText from '../components/AnimatedText';

function ContactPage() {
    return (
        <div style={{ background: 'var(--bg-color)', minHeight: '100vh', paddingTop: '100px' }}>
            <Navbar />

            <div className="container section">
                <div className="grid-cols-2" style={{ alignItems: 'start' }}>

                    {/* Info */}
                    <div>
                        <AnimatedText>
                            <span className="text-meta" style={{ display: 'block', marginBottom: '1rem' }}>CONTACT</span>
                        </AnimatedText>
                        <AnimatedText delay={0.1}>
                            <h1 className="text-display-lg font-serif" style={{ marginBottom: '2rem' }}>Get in Touch</h1>
                        </AnimatedText>

                        <div style={{ marginTop: '4rem' }}>
                            <AnimatedText delay={0.2}>
                                <h3 className="text-body-lg font-serif mb-2">General Inquiries</h3>
                                <p className="text-meta" style={{ textTransform: 'lowercase' }}>hello@becane.com</p>
                            </AnimatedText>

                            <AnimatedText delay={0.3}>
                                <div style={{ marginTop: '2rem' }}>
                                    <h3 className="text-body-lg font-serif mb-2">Press</h3>
                                    <p className="text-meta" style={{ textTransform: 'lowercase' }}>press@becane.com</p>
                                </div>
                            </AnimatedText>

                            <AnimatedText delay={0.4}>
                                <div style={{ marginTop: '2rem' }}>
                                    <h3 className="text-body-lg font-serif mb-2">Studio</h3>
                                    <p className="text-meta" style={{ color: 'var(--text-muted)' }}>
                                        12 Rue de la Paix<br />
                                        75002 Paris, France
                                    </p>
                                </div>
                            </AnimatedText>
                        </div>
                    </div>

                    {/* Form */}
                    <div style={{ marginTop: '4rem' }}>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="form-group" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                                <label className="text-meta" style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                                <input type="text" style={{ width: '100%', background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }} placeholder="Your name" />
                            </div>

                            <div className="form-group" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                                <label className="text-meta" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                                <input type="email" style={{ width: '100%', background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }} placeholder="Your email" />
                            </div>

                            <div className="form-group" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                                <label className="text-meta" style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
                                <textarea rows="4" style={{ width: '100%', background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1.2rem', fontFamily: 'var(--font-serif)', resize: 'none' }} placeholder="How can we help?"></textarea>
                            </div>

                            <button type="button" className="text-meta hover-underline" style={{ alignSelf: 'flex-start', color: 'var(--text-main)', marginTop: '1rem' }}>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ContactPage;
