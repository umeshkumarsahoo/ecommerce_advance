import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedText Component
 * 
 * simple wrapper for text that reveals itself when scrolled into view.
 * Uses a "clip-path" or "translateY" reveal effect.
 */
const AnimatedText = ({
    children,
    className = '',
    tag = 'div',
    delay = 0,
    stagger = 0.05,
    type = 'lines' // 'lines', 'words', 'chars' (simplified for now to just standard reveal)
}) => {
    const elementRef = useRef(null);
    const Tag = tag;

    useEffect(() => {
        const element = elementRef.current;

        // Simple reveal animation
        // Ideally we would split text, but for stability we'll just animate the container 
        // or assume children are block-level if complex.

        gsap.fromTo(element,
            {
                y: 50,
                opacity: 0,
                rotateX: -10
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.2,
                delay: delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [delay]);

    return (
        <Tag ref={elementRef} className={`animated-text ${className}`}>
            {children}
        </Tag>
    );
};

export default AnimatedText;
