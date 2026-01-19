import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

/**
 * RegisterPage Component
 * Premium luxury registration experience matching login design
 */
function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef(null);

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert('Registration functionality not yet implemented');
        }, 1500);
    };

    return (
        <div className="login-page" ref={containerRef}>
            {/* Left Side - Image */}
            <div className="login-image-side">
                <div className="login-image-overlay"></div>
                <div className="login-image-content">
                    <h2 className="font-serif">Join The<br />Experience</h2>
                    <p className="text-meta">Exclusive Access • Premium Collections</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="login-form-side">
                <Link to="/" className="login-brand font-serif">
                    BECANÉ
                </Link>

                <div className="login-form-container">
                    <div className="login-header">
                        <h1 className="display-lg font-serif">Create Account</h1>
                        <p className="login-subtitle">Join our exclusive community</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="name" className="text-meta">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                required
                                autoComplete="name"
                            />
                        </div>

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
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="text-meta">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="btn-loading"></span>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="signup-link">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>

                <p className="login-footer text-meta">
                    © 2026 BECANÉ. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
