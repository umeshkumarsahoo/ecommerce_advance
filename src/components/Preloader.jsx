import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.to(textRef.current, {
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out'
        })
            .to(textRef.current, {
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: 'power2.in'
            })
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
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: '#050505',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <h1
                ref={textRef}
                className="font-serif text-display-md"
                style={{ color: '#fff', opacity: 0, letterSpacing: '0.1em' }}
            >
                BECANÉ.
            </h1>
        </div>
    );
};

export default Preloader;
