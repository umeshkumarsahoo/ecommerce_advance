import React from 'react';
import { useToast } from '../context/ToastContext';

/**
 * ToastContainer — Renders all active toasts in a fixed bottom-right stack
 * Uses CSS animations for slide-in/out (keeps it lightweight)
 */
const ToastContainer = () => {
    const { toasts, dismissToast } = useToast();

    // Icon per type
    const icons = {
        success: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        ),
        error: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        ),
        info: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
        ),
    };

    if (toasts.length === 0) return null;

    return (
        <>
            <div className="toast-container" role="alert" aria-live="polite">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast-item toast-${toast.type} ${toast.exiting ? 'toast-exit' : 'toast-enter'}`}
                    >
                        <span className="toast-icon">{icons[toast.type]}</span>
                        <span className="toast-message">{toast.message}</span>
                        <button
                            className="toast-close"
                            onClick={() => dismissToast(toast.id)}
                            aria-label="Dismiss"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Progress bar for auto-dismiss countdown */}
                        {!toast.exiting && (
                            <div className="toast-progress">
                                <div className={`toast-progress-bar toast-progress-${toast.type}`} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <style>{`
                .toast-container {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    z-index: 10000;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    pointer-events: none;
                }

                .toast-item {
                    pointer-events: auto;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    min-width: 300px;
                    max-width: 420px;
                    padding: 1rem 1.25rem;
                    background: rgba(255, 255, 255, 0.92);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-radius: 12px;
                    border: 1px solid rgba(0, 0, 0, 0.06);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
                    font-family: var(--font-body);
                    font-size: 0.875rem;
                    color: var(--text-primary);
                    position: relative;
                    overflow: hidden;
                }

                /* Type-specific left border accent */
                .toast-success { border-left: 3px solid #22c55e; }
                .toast-error   { border-left: 3px solid #ef4444; }
                .toast-info    { border-left: 3px solid var(--accent); }

                /* Icon colors */
                .toast-success .toast-icon { color: #22c55e; }
                .toast-error   .toast-icon { color: #ef4444; }
                .toast-info    .toast-icon { color: var(--accent); }

                .toast-icon {
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                }

                .toast-message {
                    flex: 1;
                    line-height: 1.4;
                }

                .toast-close {
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 28px;
                    height: 28px;
                    border-radius: 6px;
                    color: var(--text-muted);
                    cursor: pointer;
                    transition: background 0.2s, color 0.2s;
                }
                .toast-close:hover {
                    background: rgba(0, 0, 0, 0.06);
                    color: var(--text-primary);
                }

                /* Progress bar */
                .toast-progress {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: rgba(0, 0, 0, 0.04);
                }
                .toast-progress-bar {
                    height: 100%;
                    animation: toastCountdown 3s linear forwards;
                }
                .toast-progress-success { background: #22c55e; }
                .toast-progress-error   { background: #ef4444; }
                .toast-progress-info    { background: var(--accent); }

                @keyframes toastCountdown {
                    from { width: 100%; }
                    to   { width: 0%; }
                }

                /* Slide-in animation */
                .toast-enter {
                    animation: toastSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                /* Slide-out animation */
                .toast-exit {
                    animation: toastSlideOut 0.35s cubic-bezier(0.55, 0, 1, 0.45) forwards;
                }

                @keyframes toastSlideIn {
                    from {
                        opacity: 0;
                        transform: translateX(100%) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }

                @keyframes toastSlideOut {
                    from {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100%) scale(0.95);
                    }
                }

                @media (max-width: 640px) {
                    .toast-container {
                        left: 1rem;
                        right: 1rem;
                        bottom: 1rem;
                    }
                    .toast-item {
                        min-width: auto;
                        max-width: none;
                    }
                }
            `}</style>
        </>
    );
};

export default ToastContainer;
