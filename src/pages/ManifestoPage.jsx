import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedText from '../components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

/**
 * ManifestoPage - The Brand Philosophy
 * 
 * Cinematic typography.
 */
function ManifestoPage() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.manifesto-highlight').forEach((text) => {
                gsap.fromTo(text,
                    { opacity: 0.2 },
                    {
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: text,
                            start: 'top 60%',
                            end: 'top 40%',
                            scrub: true
                        }
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingTop: '100px' }}>
            <Navbar />

            <div className="container section">
                <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <AnimatedText delay={0.5}>
                        <h1 className="text-display-xl font-serif">Silence.</h1>
                    </AnimatedText>
                    <AnimatedText delay={0.7}>
                        <h1 className="text-display-xl font-serif" style={{ marginLeft: '10vw' }}>Time.</h1>
                    </AnimatedText>
                    <AnimatedText delay={0.9}>
                        <h1 className="text-display-xl font-serif" style={{ marginLeft: '20vw' }}>Essence.</h1>
                    </AnimatedText>
                </div>

                <div style={{ maxWidth: '800px', margin: '20vh auto', textAlign: 'left' }}>
                    <div className="mb-5 pb-5">
                        <span className="text-meta" style={{ color: 'var(--accent)', display: 'block', marginBottom: '2rem' }}>01. THE NOISE</span>
                        <h2 className="text-display-md font-serif manifesto-highlight">
                            The world is too loud. It demands your attention, but offers nothing in return.
                        </h2>
                    </div>

                    <div className="mb-5 pb-5">
                        <span className="text-meta" style={{ color: 'var(--accent)', display: 'block', marginBottom: '2rem' }}>02. THE SILENCE</span>
                        <h2 className="text-display-md font-serif manifesto-highlight">
                            We design for the pause. The quiet moment between thoughts. Where true luxury resides.
                        </h2>
                    </div>

                    <div className="mb-5 pb-5">
                        <span className="text-meta" style={{ color: 'var(--accent)', display: 'block', marginBottom: '2rem' }}>03. THE OBJECT</span>
                        <h2 className="text-display-md font-serif manifesto-highlight">
                            Not just a garment. But an architecture for the body. Built to last, designed to fade into your life, not from it.
                        </h2>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ManifestoPage;
