import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ManifestoPage - The Brand Philosophy
 * 
 * Ultra-minimal, typographic, cinematic experience.
 * Dark mode default. Slow motion. High contrast.
 */
function ManifestoPage() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Entrance Sequence
            const tl = gsap.timeline();

            tl.to('.manifesto-intro-word', {
                opacity: 1,
                y: 0,
                duration: 2,
                stagger: 0.4,
                ease: 'power3.out'
            })
                .to('.scroll-hint', {
                    opacity: 0.5,
                    duration: 1,
                    delay: 0.5
                });

            // 2. Scroll Sections - Text Reveal
            gsap.utils.toArray('.manifesto-section').forEach((section) => {
                const text = section.querySelector('.manifesto-text');

                gsap.fromTo(text,
                    {
                        opacity: 0,
                        y: 50,
                        filter: 'blur(10px)'
                    },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 70%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // 3. Signature
            gsap.fromTo('.manifesto-signature',
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 2,
                    scrollTrigger: {
                        trigger: '.manifesto-footer',
                        start: 'top 80%'
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="manifesto-page" ref={containerRef}>

            {/* Navigation - Minimal */}
            <nav className="manifesto-nav">
                <Link to="/" className="manifesto-close">✕ CLOSE</Link>
            </nav>

            {/* Hero / Entrance */}
            <section className="manifesto-hero">
                <div className="manifesto-title-container">
                    <span className="manifesto-intro-word font-serif">Silence.</span>
                    <span className="manifesto-intro-word font-serif">Time.</span>
                    <span className="manifesto-intro-word font-serif">Essence.</span>
                </div>
                <div className="scroll-hint">Scroll to read</div>
            </section>

            {/* Content Sections */}
            <div className="manifesto-content">

                {/* Section 1: Noise */}
                <section className="manifesto-section">
                    <p className="manifesto-label text-meta">01. THE NOISE</p>
                    <h2 className="manifesto-text font-serif">
                        The world is too loud.<br />
                        It demands your attention,<br />
                        but offers nothing in return.
                    </h2>
                </section>

                {/* Section 2: Silence */}
                <section className="manifesto-section">
                    <p className="manifesto-label text-meta">02. THE SILENCE</p>
                    <h2 className="manifesto-text font-serif">
                        We design for the pause.<br />
                        The quiet moment between thoughts.<br />
                        Where true luxury resides.
                    </h2>
                </section>

                {/* Section 3: Object */}
                <section className="manifesto-section">
                    <p className="manifesto-label text-meta">03. THE OBJECT</p>
                    <h2 className="manifesto-text font-serif">
                        Not just a garment.<br />
                        But an architecture for the body.<br />
                        Built to last, designed to fade<br />
                        into your life, not from it.
                    </h2>
                </section>

            </div>

            {/* Footer */}
            <footer className="manifesto-footer">
                <div className="manifesto-signature font-serif">BECANÉ.</div>
                <p className="manifesto-credits text-meta">EST. 2026</p>
            </footer>

        </div>
    );
}

export default ManifestoPage;
