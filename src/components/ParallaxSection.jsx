import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxSection Component
 * 
 * A container for images that need a smooth parallax, zoom, or reveal effect.
 */
const ParallaxSection = ({
    image,
    alt = 'Luxury Visual',
    height = '60vh',
    speed = 0.5,
    className = ''
}) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const img = imageRef.current;

        // Parallax Effect
        gsap.fromTo(img,
            {
                yPercent: -15,
                scale: 1.1
            },
            {
                yPercent: 15,
                scale: 1.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );

    }, []);

    return (
        <div
            ref={containerRef}
            className={`parallax-container ${className}`}
            style={{ height: height, overflow: 'hidden', position: 'relative' }}
        >
            <div
                ref={imageRef}
                className="parallax-inner"
                style={{
                    width: '100%',
                    height: '110%', // Taller for parallax
                    position: 'absolute',
                    top: '-5%',
                    left: 0
                }}
            >
                <img
                    src={image}
                    alt={alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
        </div>
    );
};

export default ParallaxSection;
