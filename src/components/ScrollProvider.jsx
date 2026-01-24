import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * ScrollProvider - Global Smooth Scrolling
 * 
 * FINAL PERFORMANCE TUNING:
 * - Optimized Lenis initialization for maximum stability.
 * - Removed redundant ticker updates if the page is identical.
 */
const ScrollProvider = ({ children }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // SYNC Loop
        function update(time) {
            lenis.raf(time * 1000);
        }

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        lenis.on('scroll', ScrollTrigger.update);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(update);
        };
    }, []);

    return <>{children}</>;
};

export default ScrollProvider;
