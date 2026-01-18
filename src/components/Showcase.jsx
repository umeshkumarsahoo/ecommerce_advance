import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Showcase Section - "The Film Still"
 * 
 * Full viewport cinematic product highlight.
 * Uses CSS variables for proper theming.
 */
const Showcase = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Subtle zoom on the background as user scrolls through
            gsap.fromTo('.showcase-image',
                { scale: 1.1 },
                {
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );

            // Text fade in
            gsap.from('.showcase-text', {
                y: 50,
                opacity: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%'
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="position-relative overflow-hidden"
            style={{ height: '100vh' }}
        >

            {/* Full-Screen Background Image */}
            <div className="position-absolute top-0 start-0 w-100 h-100">
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                    alt="The Wool Trench"
                    className="showcase-image w-100 h-100 object-fit-cover"
                />
                {/* Gradient Overlay */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)'
                    }}
                ></div>
            </div>

            {/* Content - Bottom Aligned */}
            <div
                className="showcase-text position-absolute bottom-0 start-0 w-100 p-4 p-md-5 text-white"
                style={{ zIndex: 2 }}
            >
                <div className="container-fluid">
                    <div className="row align-items-end">
                        <div className="col-lg-6">
                            <span
                                className="text-meta d-block mb-3"
                                style={{ color: '#D4AF37', letterSpacing: '0.2em' }}
                            >
                                FEATURED
                            </span>
                            <h2
                                className="display-3 font-serif mb-3"
                                style={{ fontWeight: 400, fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                            >
                                The Wool Trench
                            </h2>
                            <p
                                className="lead opacity-75"
                                style={{ maxWidth: '400px', fontWeight: 300, fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
                            >
                                Woven from high-altitude Merino wool. Hand-finished seams for effortless motion.
                            </p>
                        </div>
                        <div className="col-lg-6 text-lg-end mt-4 mt-lg-0">
                            <a
                                href="#"
                                className="btn btn-outline-light rounded-0 px-4 px-md-5 py-3 text-uppercase"
                                style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}
                            >
                                Explore Piece
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Showcase;
