import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Section - "The Opening"
 * 
 * First impression. Must be emotionally powerful.
 * Large image. Oversized poetic headline. Masked reveal.
 * This sets the tone for the entire experience.
 */
const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text reveal - slides up from mask
            gsap.to('.hero-line', {
                y: 0,
                duration: 1.5,
                ease: 'power4.out',
                stagger: 0.1,
                delay: 0.3
            });

            // Background zoom out
            gsap.fromTo('.hero-bg',
                { scale: 1.2 },
                {
                    scale: 1,
                    duration: 2,
                    ease: 'power2.out'
                }
            );

            // Parallax on scroll
            gsap.to('.hero-bg', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="vh-100 position-relative d-flex align-items-center justify-content-center overflow-hidden"
        >

            {/* Background Image */}
            <div className="position-absolute top-0 start-0 w-100 h-100">
                <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                    alt="Campaign"
                    className="hero-bg w-100 h-100 object-fit-cover"
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
            </div>

            {/* Content */}
            <div className="position-relative z-1 text-center text-white">

                {/* Subtitle */}
                <div className="overflow-hidden mb-3">
                    <span
                        className="hero-line d-block text-meta"
                        style={{
                            transform: 'translateY(100%)',
                            letterSpacing: '0.25em',
                            opacity: 0.8
                        }}
                    >
                        SPRING / SUMMER 2026
                    </span>
                </div>

                {/* Main Headline */}
                <div className="overflow-hidden">
                    <h1
                        className="hero-line display-mega mb-0"
                        style={{ transform: 'translateY(100%)' }}
                    >
                        KINETIC
                    </h1>
                </div>
                <div className="overflow-hidden">
                    <h1
                        className="hero-line display-mega mb-0 fst-italic"
                        style={{
                            transform: 'translateY(100%)',
                            opacity: 0.7
                        }}
                    >
                        SILENCE
                    </h1>
                </div>

                {/* CTA */}
                <div className="overflow-hidden mt-5">
                    <a
                        href="#collection"
                        className="hero-line d-inline-block text-white text-decoration-none border-bottom border-white pb-1 text-uppercase"
                        style={{
                            transform: 'translateY(100%)',
                            fontSize: '0.8rem',
                            letterSpacing: '0.15em'
                        }}
                    >
                        Discover Collection
                    </a>
                </div>

            </div>

            {/* Scroll Indicator */}
            <div
                className="position-absolute bottom-0 start-50 translate-middle-x mb-5 text-white"
                style={{ opacity: 0.6 }}
            >
                <div className="d-flex flex-column align-items-center">
                    <span className="text-meta mb-2" style={{ fontSize: '0.65rem' }}>SCROLL</span>
                    <div style={{ width: '1px', height: '40px', backgroundColor: 'white' }}></div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
