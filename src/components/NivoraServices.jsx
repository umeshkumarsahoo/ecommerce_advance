import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * NivoraServices - Horizontal Scroll Marquee
 * Jewellery-focused service categories
 */
const NivoraServices = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    const services = [
        { id: 1, label: "Bespoke Design", icon: "✦" },
        { id: 2, label: "Diamond Setting", icon: "💎" },
        { id: 3, label: "Gold Crafting", icon: "✸" },
        { id: 4, label: "Engraving", icon: "◎" },
        { id: 5, label: "Gemstone Sourcing", icon: "⌘" },
        { id: 6, label: "Restoration", icon: "✣" }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(trackRef.current, {
                xPercent: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section services-section overflow-hidden">
            <div className="services-track" ref={trackRef}>
                {[...services, ...services].map((item, index) => (
                    <div key={`${item.id}-${index}`} className="service-item">
                        <span className="service-icon">{item.icon}</span>
                        <span className="service-label">{item.label}</span>
                    </div>
                ))}
            </div>

            <style>{`
                .services-section {
                    padding: 8rem 0;
                    border-top: 1px solid var(--border-light);
                    border-bottom: 1px solid var(--border-light);
                    background: var(--bg-secondary);
                }

                .services-track {
                    display: flex;
                    gap: 6rem;
                    width: max-content;
                    padding-left: 5vw;
                }

                .service-item {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    opacity: 0.5;
                    transition: opacity 0.3s ease;
                    cursor: default;
                }

                .service-item:hover {
                    opacity: 1;
                }

                .service-icon {
                    font-size: 2rem;
                    color: var(--accent);
                }

                .service-label {
                    font-family: var(--font-display);
                    font-size: clamp(2rem, 5vw, 4rem);
                    font-weight: 600;
                    text-transform: uppercase;
                    color: var(--text-primary);
                    white-space: nowrap;
                }
            `}</style>
        </section>
    );
};

export default NivoraServices;
