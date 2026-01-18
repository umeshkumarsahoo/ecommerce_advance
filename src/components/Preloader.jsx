import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Preloader - "The Curtain"
 * 
 * Luxury brand intro. Simple, elegant, memorable.
 * Brand name fades in, then the curtain rises to reveal the site.
 * This sets the emotional tone before the experience begins.
 */
const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // 1. Fade in brand name
        tl.fromTo('.preloader-brand',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
        )
            // 2. Hold for a moment
            .to('.preloader-brand', {
                opacity: 1,
                duration: 0.8
            })
            // 3. Fade out brand
            .to('.preloader-brand', {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in'
            })
            // 4. Curtain rises
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: 'power4.inOut',
                onComplete: onComplete
            });

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="position-fixed top-0 start-0 w-100 vh-100 d-flex flex-column justify-content-center align-items-center"
            style={{
                zIndex: 9999,
                backgroundColor: '#111'
            }}
        >
            {/* Brand Name */}
            <h1
                className="preloader-brand font-serif text-white mb-0"
                style={{
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    fontWeight: 400,
                    letterSpacing: '0.1em'
                }}
            >
                BECANE.
            </h1>

            {/* Subtle Loading Indicator */}
            <div
                className="preloader-brand mt-4"
                style={{ opacity: 0.5 }}
            >
                <div
                    className="bg-white"
                    style={{
                        width: '40px',
                        height: '1px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                    }}
                ></div>
            </div>

            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scaleX(0.5); }
          50% { opacity: 1; transform: scaleX(1); }
        }
      `}</style>
        </div>
    );
};

export default Preloader;
