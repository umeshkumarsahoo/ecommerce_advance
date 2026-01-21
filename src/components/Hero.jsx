import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero.jsx - "The Opening Statement"
 * 
 * EDUCATIONAL NOTE:
 * In luxury web design, the Hero section is not just about information; 
 * it's about setting an emotional baseline. We use valid, heavy typography 
 * and slow, cinematic motion to tell the user: "Slow down. This is different."
 * 
 * TECHNICAL BREAKDOWN:
 * 1. Parallax Background: The image moves slower than the scroll speed (yPercent),
 *    creating a sense of depth and scale.
 * 2. Staggered Text: We don't show everything at once. We reveal elements 
 *    sequentially (meta -> title -> subtitle -> CTA) to guide the eye.
 */

const Hero = () => {
    const containerRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        // GSAP Context ensures animations are cleaned up properly when component unmounts
        const ctx = gsap.context(() => {
            // Parallax Effect matches the "Kinetic" theme
            gsap.to(bgRef.current, {
                yPercent: 30, // Move the image down 30% of its height as we scroll
                scale: 1.1,   // Slight zoom to prevent whitespace at edges
                ease: 'none', // Linear ease is crucial for parallax to feel 'attached' to scroll
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true // Animation progress is tied directly to scrollbar
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="hero-section"
            style={{
                height: '100vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
            }}
        >
            {/* 
                BACKGROUND LAYER 
                Absolute positioning places it behind content. 
                We make it taller (120%) so it has room to move for parallax.
            */}
            <div
                ref={bgRef}
                className="hero-bg"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '120%',
                    zIndex: 0
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                    alt="Campaign"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Overlay ensures text readability regardless of image brightness */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }}></div>
            </div>

            {/* 
                CONTENT LAYER 
                Z-index ensures it sits on top of the background.
                "AnimatedText" handles the entrance animations.
            */}
            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <AnimatedText delay={0.5}>
                    <p className="text-meta" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5vh', letterSpacing: '0.2em' }}>
                        SPRING / SUMMER 2026
                    </p>
                </AnimatedText>

                <div style={{ marginBottom: '2vh' }}>
                    <AnimatedText delay={0.7}>
                        <h1 className="text-display-xl font-serif" style={{ lineHeight: 0.9 }}>
                            KINETIC
                        </h1>
                    </AnimatedText>
                    <AnimatedText delay={0.9}>
                        <h1 className="text-display-xl font-serif fst-italic" style={{ lineHeight: 0.9, opacity: 0.8 }}>
                            SILENCE
                        </h1>
                    </AnimatedText>
                </div>

                <AnimatedText delay={1.2}>
                    <a
                        href="#collection"
                        className="hover-underline text-meta"
                        style={{ color: '#fff', fontSize: '0.8rem', letterSpacing: '0.1em' }}
                    >
                        Discover Collection
                    </a>
                </AnimatedText>
            </div>

        </section>
    );
};

export default Hero;
