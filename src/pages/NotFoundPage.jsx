import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import LuxuryButton from '../components/LuxuryButton';

/**
 * NotFoundPage — Luxury-styled 404 page
 * 
 * Features:
 * - Massive animated "404" with gradient effect
 * - Luxury typography messaging
 * - GSAP entrance (text reveal + stagger fade)
 * - "Return Home" CTA
 */
const NotFoundPage = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo('.nf-number',
                { y: 80, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 1 }
            )
                .fromTo('.nf-title',
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=0.5'
                )
                .fromTo('.nf-subtitle',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7 },
                    '-=0.4'
                )
                .fromTo('.nf-cta',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6 },
                    '-=0.3'
                )
                .fromTo('.nf-decoration',
                    { scaleX: 0, opacity: 0 },
                    { scaleX: 1, opacity: 1, duration: 0.8 },
                    '-=0.5'
                );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="not-found-page">
            {/* Decorative line */}
            <div className="nf-decoration" />

            <div className="nf-content">
                <h1 className="nf-number">404</h1>
                <h2 className="nf-title">Page Not Found</h2>
                <p className="nf-subtitle">
                    The page you're looking for has been moved, removed,
                    or perhaps never existed in our collection.
                </p>
                <div className="nf-cta">
                    <Link to="/">
                        <LuxuryButton>Return Home</LuxuryButton>
                    </Link>
                </div>
            </div>

            {/* Corner decorative brackets */}
            <div className="nf-corner nf-corner-tl" />
            <div className="nf-corner nf-corner-br" />

            <style>{`
                .not-found-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-primary);
                    position: relative;
                    overflow: hidden;
                    padding: 2rem;
                }

                .nf-content {
                    text-align: center;
                    max-width: 600px;
                    z-index: 1;
                }

                .nf-number {
                    font-family: var(--font-display);
                    font-size: clamp(8rem, 20vw, 16rem);
                    font-weight: 700;
                    line-height: 0.85;
                    letter-spacing: -0.04em;
                    background: linear-gradient(
                        135deg,
                        var(--accent) 0%,
                        var(--accent-dark) 40%,
                        var(--text-muted) 100%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 1.5rem;
                    user-select: none;
                }

                .nf-title {
                    font-family: var(--font-display);
                    font-size: clamp(1.5rem, 3vw, 2.5rem);
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 1rem;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }

                .nf-subtitle {
                    font-family: var(--font-body);
                    font-size: 1rem;
                    color: var(--text-muted);
                    line-height: 1.8;
                    margin-bottom: 2.5rem;
                    max-width: 450px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .nf-cta {
                    display: flex;
                    justify-content: center;
                }

                .nf-decoration {
                    position: absolute;
                    top: 50%;
                    left: 10%;
                    right: 10%;
                    height: 1px;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        var(--border-accent) 50%,
                        transparent 100%
                    );
                    opacity: 0.4;
                    transform-origin: center;
                }

                /* Corner brackets (luxury detail) */
                .nf-corner {
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    border: 1px solid var(--accent);
                    opacity: 0.15;
                }
                .nf-corner-tl {
                    top: 3rem;
                    left: 3rem;
                    border-right: none;
                    border-bottom: none;
                }
                .nf-corner-br {
                    bottom: 3rem;
                    right: 3rem;
                    border-left: none;
                    border-top: none;
                }

                @media (max-width: 640px) {
                    .nf-corner { display: none; }
                }
            `}</style>
        </div>
    );
};

export default NotFoundPage;
