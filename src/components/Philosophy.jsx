import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
    const quoteRef = useRef(null);

    useEffect(() => {
        // Reveal animation
        gsap.fromTo(quoteRef.current,
            { opacity: 0.2, filter: 'blur(10px)' },
            {
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: quoteRef.current,
                    start: 'top 75%',
                    end: 'bottom 25%',
                    scrub: 1
                }
            }
        );
    }, []);

    return (
        <section id="philosophy" className="py-5" style={{ minHeight: '60vh', background: '#f5f3ed' }}>
            <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center text-center py-5">
                <span className="text-subtitle mb-5">Our Philosophy</span>
                <div className="col-lg-8">
                    <h3 ref={quoteRef} className="display-2-xl text-serif fst-italic" style={{ lineHeight: 1.2 }}>
                        "We believe that beauty is not found in the object itself, but in the feeling it evokes."
                    </h3>
                    <div className="mt-5">
                        <div style={{ height: '60px', width: '1px', background: '#000', margin: '0 auto' }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
