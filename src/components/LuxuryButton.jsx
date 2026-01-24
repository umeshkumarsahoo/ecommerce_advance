import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const LuxuryButton = ({ children, onClick, className = '', style = {} }) => {
    const buttonRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;
        if (!button || !text) return;

        const xTo = gsap.quickTo(button, "x", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(button, "y", { duration: 0.8, ease: "power3.out" });

        const xToText = gsap.quickTo(text, "x", { duration: 0.4, ease: "power3.out" });
        const yToText = gsap.quickTo(text, "y", { duration: 0.4, ease: "power3.out" });

        const mouseEnter = () => { };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
            xToText(0);
            yToText(0);
        };

        const mouseMove = (e) => {
            const { left, top, width, height } = button.getBoundingClientRect();
            const x = (e.clientX - (left + width / 2)) * 0.3; // Magnetic strength
            const y = (e.clientY - (top + height / 2)) * 0.3;

            xTo(x);
            yTo(y);
            xToText(x * 0.6); // Text moves slightly less
            yToText(y * 0.6);
        };

        button.addEventListener('mouseenter', mouseEnter);
        button.addEventListener('mouseleave', mouseLeave);
        button.addEventListener('mousemove', mouseMove);

        return () => {
            button.removeEventListener('mouseenter', mouseEnter);
            button.removeEventListener('mouseleave', mouseLeave);
            button.removeEventListener('mousemove', mouseMove);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={`luxury-btn ${className}`}
            style={{ position: 'relative', overflow: 'hidden', ...style }}
        >
            <span ref={textRef} style={{ display: 'inline-block', position: 'relative', zIndex: 2 }}>
                {children}
            </span>
        </button>
    );
};

export default LuxuryButton;
