import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';
import LuxuryButton from '../components/LuxuryButton';

/**
 * LoginPage - Premium luxury login with hardcoded credentials
 * 
 * Credentials: username: "od", password: "password"
 */
function LoginPage() {
    const [formData, setFormData] = useState({ username: '', mobile: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const containerRef = useRef(null);

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.login-image-side', { clipPath: 'inset(0 100% 0 0)' });
            gsap.set('.login-form-container', { opacity: 0, y: 40 });
            gsap.set('.login-brand', { opacity: 0, y: -20 });

            const tl = gsap.timeline({ delay: 0.2 });

            tl.to('.login-image-side', {
                clipPath: 'inset(0 0% 0 0)',
                duration: 1.2,
                ease: 'power4.out'
            })
                .to('.login-brand', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.6')
                .to('.login-form-container', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.4');
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error on input
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mobile number validation: exactly 10 digits using regex
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        setIsLoading(true);
        setError('');

        // Simulate network delay
        setTimeout(() => {
            const result = login(formData.username, formData.password);
            setIsLoading(false);

            if (result.success) {
                // Animate out and navigate
                gsap.to('.login-page', {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => navigate('/')
                });
            } else {
                setError(result.error);
                // Shake animation on error
                gsap.to('.login-form-container', {
                    x: [-10, 10, -10, 10, 0],
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        }, 800);
    };

    return (
        <div className="login-page" ref={containerRef}>
            {/* Left Side - Image */}
            <div
                className="login-image-side"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069&auto=format&fit=crop)'
                }}
            >
                <div className="login-image-overlay" />
                <div className="login-image-content">
                    <h2 className="font-serif">
                        Experience<br />
                        <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Luxury</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>
                        Curated Collections • Timeless Elegance
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="login-form-side">


                <div className="login-form-container">
                    <div className="login-header">
                        <h1 className="display-lg font-serif">Welcome Back</h1>
                        <p className="login-subtitle">Sign in to your exclusive account</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div
                            style={{
                                background: 'rgba(220, 38, 38, 0.1)',
                                border: '1px solid rgba(220, 38, 38, 0.3)',
                                color: '#ef4444',
                                padding: '1rem',
                                borderRadius: '4px',
                                marginBottom: '1.5rem',
                                fontSize: '0.85rem'
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username" className="text-meta">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mobile" className="text-meta">Mobile Number</label>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="10-digit mobile number"
                                required
                                autoComplete="tel"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="text-meta">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" name="remember" />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                        </div>

                        <LuxuryButton
                            type="submit"
                            disabled={isLoading}
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </LuxuryButton>
                    </form>

                    {/* Demo Credentials Hint - Shows both Exclusive and Standard options */}
                    <div
                        style={{
                            marginTop: '1.5rem',
                            padding: '1rem',
                            background: 'rgba(79, 125, 181, 0.1)',
                            border: '1px solid rgba(79, 125, 181, 0.2)',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            color: 'var(--accent)'
                        }}
                    >
                        <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Demo Credentials:</strong>

                        {/* Exclusive User */}
                        <div style={{ marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--accent)' }}>★ Exclusive:</span>{' '}
                            <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '2px' }}>vip</code>
                            {' / '}
                            <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '2px' }}>vip123</code>
                        </div>

                        {/* Standard User */}
                        <div>
                            <span style={{ color: 'var(--text-muted)' }}>● Standard:</span>{' '}
                            <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '2px' }}>user</code>
                            {' / '}
                            <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '2px' }}>user123</code>
                        </div>
                    </div>

                    <div className="login-divider">
                        <span>or</span>
                    </div>

                    <div className="social-login">
                        <LuxuryButton style={{ width: '100%', background: 'rgba(0,0,0,0.03)' }}>
                            Continue with Google
                        </LuxuryButton>
                    </div>

                    <p className="signup-link">
                        Don't have an account? <Link to="/register">Create one</Link>
                    </p>
                </div>

                <p className="login-footer">
                    © 2026 Becane. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
