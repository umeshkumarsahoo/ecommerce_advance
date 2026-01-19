import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

/**
 * LoginPage Component
 * Premium luxury login experience with split-screen layout
 */
function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set('.login-image-side', { clipPath: 'inset(0 100% 0 0)' });
            gsap.set('.login-form-container', { opacity: 0, y: 40 });
            gsap.set('.login-brand', { opacity: 0, y: -20 });

            // Entrance animation timeline
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login - replace with actual auth logic
        setTimeout(() => {
            setIsLoading(false);
            alert('Login functionality not yet implemented');
        }, 1500);
    };

    return (
        <div className="login-page" ref={containerRef}>
            {/* Left Side - Image */}
            <div className="login-image-side" ref={imageRef}>
                <div className="login-image-overlay"></div>
                <div className="login-image-content">
                    <h2 className="font-serif">Experience<br />Luxury</h2>
                    <p className="text-meta">Curated Collections • Timeless Elegance</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="login-form-side" ref={formRef}>
                <Link to="/" className="login-brand font-serif">
                    BECANÉ.
                </Link>

                <div className="login-form-container">
                    <div className="login-header">
                        <h1 className="display-lg font-serif">Welcome Back</h1>
                        <p className="login-subtitle">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email" className="text-meta">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                                autoComplete="email"
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

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="btn-loading"></span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="login-divider">
                        <span>or</span>
                    </div>

                    <div className="social-login">
                        <button className="social-btn google">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    <p className="signup-link">
                        Don't have an account? <Link to="/register">Create one</Link>
                    </p>
                </div>

                <p className="login-footer text-meta">
                    © 2026 BECANÉ. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
