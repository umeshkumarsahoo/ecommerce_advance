import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Local Asset
import heroVideo from '../assets/images/hero.mp4';

gsap.registerPlugin(ScrollTrigger);

/**
 * NivoraHero - Hybrid Luxury Hero
 * 
 * FINAL PERFORMANCE:
 * - Uses local asset for instant load
 * - Simplified physics
 */
const NivoraHero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.hero-img-inner', {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0
                }
            });

            const tl = gsap.timeline();
            tl.from(['.hero-eyebrow', '.hero-subtitle', '.hero-cta'], {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out',
                delay: 0.5
            });

            gsap.to('.hero-word-left', {
                xPercent: -10,
                ease: 'none',
                scrollTrigger: { trigger: heroRef.current, scrub: 0 }
            });

            gsap.to('.hero-word-right', {
                xPercent: 10,
                ease: 'none',
                scrollTrigger: { trigger: heroRef.current, scrub: 0 }
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="nivora-hero">
            <div className="hero-bg">
                <div className="hero-img-inner">
                    <video
                        src={heroVideo}
                        className="hero-image"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </div>
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content container">
                {/* <div className="hero-top">
                    <p className="hero-eyebrow">Estd. 2024 — India, Paris, France</p>
                </div> */}

                <div className="hero-title">
                    <div className="hero-line hero-word hero-word-left">LUXURY</div>
                    <div className="hero-line hero-word hero-gradient">BEYOND</div>
                    <div className="hero-line hero-word hero-word-right">REALITY</div>
                </div>

                <div className="hero-bottom">
                    <p className="hero-subtitle">
                        We craft digital experiences that transcend the ordinary.
                        Where fashion meets the future.
                    </p>
                    <button className="hero-cta nivora-btn nivora-btn-accent">
                        Explore Collection
                    </button>
                </div>
            </div>

            <style>{`
                .nivora-hero {
                    height: 100vh; width: 100%; position: relative; overflow: hidden;
                    display: flex; align-items: center; justify-content: center;
                }
                .hero-bg {
                    position: absolute; inset: 0; z-index: 0; transform: translateZ(0); 
                }
                .hero-img-inner {
                    width: 100%; height: 115%; position: absolute; top: 0; left: 0;
                    will-change: transform; 
                }
                .hero-image { width: 100%; height: 90%; object-fit: cover; filter: brightness(1.15) saturate(0.8); }
                .hero-overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%);
                }
                .hero-content {
                    position: relative; z-index: 10; width: 100%; height: 100%;
                    display: flex; flex-direction: column; justify-content: center; padding-top: 80px; 
                }
                .hero-top { position: absolute; top: 120px; left: var(--spacing-container); }
                .hero-eyebrow {
                    font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--accent);
                }
                .hero-title {
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    line-height: 0.85; transform: translateZ(0);
                    padding-bottom: 6rem;
                }
                .hero-word {
                    font-family: var(--font-display); font-size: clamp(4rem, 13vw, 12rem);
                    font-weight: 700; letter-spacing: -0.04em; color: #fff;
                    white-space: nowrap; will-change: transform;
                }
                .hero-gradient {
                    background: linear-gradient(135deg, #fff 20%, #4F7DB5 80%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    font-style: italic; transform: scale(1.05);
                }
                .hero-bottom {
                    position: absolute; bottom: 40px; width: 100%; padding: 0 var(--spacing-container);
                    display: flex; justify-content: space-between; align-items: flex-end;
                    margin-top: 3rem;
                }
                .hero-subtitle {
                    max-width: 300px; font-size: 1rem; color: rgba(255, 255, 255, 0.85); line-height: 1.5;
                    margin-top: 1.5rem;
                }
                @media (max-width: 768px) {
                    .hero-bottom { flex-direction: column; align-items: center; gap: 2rem; text-align: center; }
                    .hero-word { font-size: 16vw; }
                }
            `}</style>
        </section>
    );
};

export default NivoraHero;
