import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import LuxuryButton from '../components/LuxuryButton';
import { useToast } from '../context/ToastContext';

/**
 * RegisterPage Component
 * Premium luxury registration experience matching login design
 */
function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const { showToast } = useToast();

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
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Mobile number validation: exactly 10 digits
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        // Password validation: minimum 5 characters, at least one uppercase letter and one number
        if (formData.password.length < 5) {
            setError('Password must be at least 5 characters long');
            return;
        }

        const hasUppercase = /[A-Z]/.test(formData.password);
        const hasNumber = /[0-9]/.test(formData.password);

        if (!hasUppercase) {
            setError('Password must contain at least one uppercase letter');
            return;
        }

        if (!hasNumber) {
            setError('Password must contain at least one number');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message);
                showToast('Registration successful! Redirecting to login...', 'success');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Registration failed. Please try again.');
                showToast(data.message || 'Registration failed', 'error');
            }
        } catch (err) {
            setError('Unable to connect to server. Please make sure the backend is running.');
            showToast('Server connection failed', 'error');
        } finally {
            setIsLoading(false);
        }
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
                {/* <Link to="/" className="login-brand font-serif">
                    BECANÉ
                </Link> */}

                <div className="login-form-container">
                    <div className="login-header">
                        <h1 className="display-lg font-serif">Create Account</h1>
                        <p className="login-subtitle">Join our exclusive community</p>
                    </div>

                    {error && (
                        <div style={{
                            padding: '12px 16px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '8px',
                            color: '#ef4444',
                            fontSize: '0.85rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px'
                        }}>
                            <span style={{ fontSize: '1rem', marginTop: '-2px' }}>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

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
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="new-password"
                                    style={{ width: '100%', paddingRight: '3rem' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                                        background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', padding: '0.2rem'
                                    }}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="text-meta">Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="new-password"
                                    style={{ width: '100%', paddingRight: '3rem' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                                        background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', padding: '0.2rem'
                                    }}
                                >
                                    {showConfirmPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <LuxuryButton
                            type="submit"
                            disabled={isLoading}
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            {isLoading ? 'Processing...' : 'Create Account'}
                        </LuxuryButton>
                    </form>
                    <div className="login-divider">
                        <span>or</span>
                    </div>

                    <div className="social-login">
                        <LuxuryButton style={{ width: '100%', background: 'rgba(0,0,0,0.03)' }}>
                            Continue with Google
                        </LuxuryButton>
                    </div>

                    <p className="signup-link">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>

                <p className="login-footer">
                    © 2026 BECANÉ. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
