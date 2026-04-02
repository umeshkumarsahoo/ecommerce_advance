import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedText from '../components/AnimatedText';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import LuxuryButton from '../components/LuxuryButton';

function UpdatePasswordPage() {
    const [passwords, setPasswords] = useState({ email: '', oldPassword: '', newPassword: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
        setError('');
        setSuccessMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        if (passwords.newPassword.length < 5) {
            setError('New password must be at least 5 characters');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/auth/password/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: passwords.email,
                    oldPassword: passwords.oldPassword,
                    newPassword: passwords.newPassword
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccessMessage('Password successfully updated!');
                showToast('Password updated successfully', 'success');
                setPasswords({ email: '', oldPassword: '', newPassword: '' });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Failed to update password');
            }
        } catch (err) {
            setError('Unable to connect to server. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <div className="container" style={{ maxWidth: '500px', margin: '0 auto', padding: '0 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <AnimatedText>
                        <h1 className="text-h2" style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Update Password</h1>
                    </AnimatedText>
                    <AnimatedText delay={0.1}>
                        <p style={{ color: 'var(--text-muted)' }}>Securely update your account's password.</p>
                    </AnimatedText>
                </div>

                <div className="auth-form-wrap" style={{
                    background: 'var(--bg-card)',
                    padding: '3rem 2rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)'
                }}>
                    {error && (
                        <div style={{
                            padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '6px', color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div style={{
                            padding: '12px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '6px', color: '#22c55e', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center'
                        }}>
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        {/* Email */}
                        <div className="form-group">
                            <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={passwords.email}
                                onChange={handleChange}
                                className="nivora-input"
                                required
                                style={{
                                    width: '100%', padding: '1rem 0', background: 'transparent',
                                    border: 'none', borderBottom: '1px solid var(--border-light)',
                                    color: 'var(--text-primary)', outline: 'none'
                                }}
                            />
                        </div>
                        
                        {/* Old Password */}
                        <div className="form-group">
                            <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>
                                Current Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showOldPassword ? "text" : "password"}
                                    name="oldPassword"
                                    value={passwords.oldPassword}
                                    onChange={handleChange}
                                    className="nivora-input"
                                    required
                                    style={{
                                        width: '100%', padding: '1rem 0', paddingRight: '4rem', background: 'transparent',
                                        border: 'none', borderBottom: '1px solid var(--border-light)',
                                        color: 'var(--text-primary)', outline: 'none'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    style={{
                                        position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                                        background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', padding: '0.2rem'
                                    }}
                                >
                                    {showOldPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="form-group">
                            <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>
                                New Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={passwords.newPassword}
                                    onChange={handleChange}
                                    className="nivora-input"
                                    required
                                    style={{
                                        width: '100%', padding: '1rem 0', paddingRight: '4rem', background: 'transparent',
                                        border: 'none', borderBottom: '1px solid var(--border-light)',
                                        color: 'var(--text-primary)', outline: 'none'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    style={{
                                        position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                                        background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', padding: '0.2rem'
                                    }}
                                >
                                    {showNewPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <LuxuryButton type="submit" disabled={isLoading} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                {isLoading ? 'Updating...' : 'Save New Password'}
                            </LuxuryButton>
                        </div>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem' }}>
                        <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdatePasswordPage;
