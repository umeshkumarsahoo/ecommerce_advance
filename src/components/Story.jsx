import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Story Section - "The Vortex"
 * 
 * Anti-Grid Layout with floating parallax images.
 * Uses CSS variables for Dark/Light mode support.
 */
const Story = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax each image at different speeds
            gsap.to('.float-img-1', {
                yPercent: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.to('.float-img-2', {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.to('.float-img-3', {
                yPercent: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
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
            id="story"
            className="position-relative overflow-hidden"
            style={{
                minHeight: '150vh',
                backgroundColor: 'var(--bg-color)',
                paddingTop: '20vh',
                paddingBottom: '20vh'
            }}
        >

            {/* Floating Image 1 - Top Left */}
            <div
                className="float-img-1 position-absolute d-none d-md-block"
                style={{
                    top: '10%',
                    left: '5%',
                    width: '25vw',
                    height: '35vh',
                    zIndex: 1
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=1978&auto=format&fit=crop"
                    alt="Atmosphere 1"
                    className="w-100 h-100 object-fit-cover"
                    style={{ filter: 'grayscale(20%)' }}
                />
            </div>

            {/* Floating Image 2 - Bottom Right */}
            <div
                className="float-img-2 position-absolute d-none d-md-block"
                style={{
                    bottom: '15%',
                    right: '8%',
                    width: '30vw',
                    height: '40vh',
                    zIndex: 1
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
                    alt="Atmosphere 2"
                    className="w-100 h-100 object-fit-cover"
                    style={{ filter: 'grayscale(20%)' }}
                />
            </div>

            {/* Floating Image 3 - Center Left, Behind */}
            <div
                className="float-img-3 position-absolute d-none d-lg-block"
                style={{
                    top: '40%',
                    left: '15%',
                    width: '20vw',
                    height: '25vh',
                    zIndex: 0,
                    opacity: 0.6
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop"
                    alt="Atmosphere 3"
                    className="w-100 h-100 object-fit-cover"
                    style={{ filter: 'grayscale(40%)' }}
                />
            </div>

            {/* Central Text - Uses CSS Variables */}
            <div
                className="position-relative d-flex flex-column align-items-center justify-content-center text-center px-4"
                style={{
                    minHeight: '100vh',
                    zIndex: 2
                }}
            >
                <span
                    className="text-meta mb-4"
                    style={{ letterSpacing: '0.2em', color: 'var(--accent)' }}
                >
                    THE PHILOSOPHY
                </span>
                <h2
                    className="display-1 font-serif mb-5"
                    style={{
                        lineHeight: 0.9,
                        fontWeight: 400,
                        maxWidth: '800px',
                        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                        color: 'var(--text-main)'
                    }}
                >
                    We design for<br />
                    <span className="fst-italic" style={{ opacity: 0.7 }}>the silence</span><br />
                    between moments.
                </h2>
                <p
                    className="lead mx-auto"
                    style={{ maxWidth: '500px', fontWeight: 300, color: 'var(--text-muted)' }}
                >
                    In a world of noise, we create the pause. Every piece is a meditation on restraint,
                    crafted for those who understand that true luxury whispers.
                </p>
                <Link
                    to="/manifesto"
                    className="mt-5 text-decoration-none text-uppercase pb-1"
                    style={{
                        fontSize: '0.75rem',
                        letterSpacing: '0.15em',
                        color: 'var(--text-main)',
                        borderBottom: '1px solid var(--text-main)'
                    }}
                >
                    Read The Manifesto
                </Link>
            </div>

        </section>
    );
};

export default Story;
