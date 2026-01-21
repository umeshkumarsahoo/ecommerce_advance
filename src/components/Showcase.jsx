import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

/**
 * Showcase Section - "The Film Still"
 * 
 * Cinematic, full-screen highlight.
 */
const Showcase = () => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(bgRef.current,
                { scale: 1.1 },
                {
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section"
            style={{
                height: '100vh',
                position: 'relative',
                overflow: 'hidden',
                color: '#fff',
                display: 'flex',
                alignItems: 'flex-end',
                paddingBottom: 'var(--spacing-section)'
            }}
        >
            <div
                ref={bgRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                    alt="The Wool Trench"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}></div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="flex-between" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ maxWidth: '600px' }}>
                        <AnimatedText>
                            <span className="text-meta" style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'block' }}>
                                FEATURED
                            </span>
                        </AnimatedText>
                        <AnimatedText delay={0.2}>
                            <h2 className="text-display-lg font-serif">The Wool Trench</h2>
                        </AnimatedText>
                        <AnimatedText delay={0.4}>
                            <p className="text-body-lg" style={{ opacity: 0.8, marginTop: '1rem' }}>
                                Woven from high-altitude Merino wool. Hand-finished seams for effortless motion.
                            </p>
                        </AnimatedText>
                    </div>

                    <AnimatedText delay={0.6}>
                        <a href="#" className="hover-underline text-meta" style={{ color: '#fff' }}>
                            Explore Piece
                        </a>
                    </AnimatedText>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
