import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

/**
 * Story Section - "The Philosophy"
 * 
 * Immersive layout with floating images and central philosophy text.
 */
const Story = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating Images Parallax
            gsap.utils.toArray('.floating-image').forEach((img, i) => {
                gsap.to(img, {
                    yPercent: i % 2 === 0 ? -20 : 20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="section"
            style={{
                minHeight: '120vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}
        >
            {/* Floating Images (Decorative) */}
            <div
                className="floating-image"
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '20vw',
                    aspectRatio: '3/4',
                    overflow: 'hidden',
                    opacity: 0.6,
                    zIndex: 0
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=1978&auto=format&fit=crop"
                    alt="Atmosphere"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            <div
                className="floating-image"
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    right: '8%',
                    width: '25vw',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    opacity: 0.6,
                    zIndex: 0
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
                    alt="Detail"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            {/* Central Content */}
            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '900px' }}>
                <AnimatedText>
                    <span className="text-meta" style={{ color: 'var(--accent)', marginBottom: '2rem', display: 'block' }}>
                        THE PHILOSOPHY
                    </span>
                </AnimatedText>

                <AnimatedText delay={0.2}>
                    <h2 className="text-display-lg font-serif" style={{ marginBottom: '3rem' }}>
                        We design for <span className="fst-italic" style={{ opacity: 0.7 }}>the silence</span> between moments.
                    </h2>
                </AnimatedText>

                <AnimatedText delay={0.4}>
                    <p className="text-body-lg" style={{ color: 'var(--text-muted)', marginBottom: '4rem', marginInline: 'auto', maxWidth: '600px' }}>
                        In a world of noise, we create the pause. Every piece is a meditation on restraint,
                        crafted for those who understand that true luxury whispers.
                    </p>
                </AnimatedText>

                <AnimatedText delay={0.6}>
                    <Link
                        to="/manifesto"
                        className="hover-underline text-meta"
                        style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}
                    >
                        Read The Manifesto
                    </Link>
                </AnimatedText>
            </div>
        </section>
    );
};

export default Story;
