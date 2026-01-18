import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Mood = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Parallax the whole container
        gsap.fromTo(containerRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: 1
                }
            }
        );
    }, []);

    return (
        <section id="mood" className="vh-100 d-flex align-items-center justify-content-center bg-white overflow-hidden">
            <div ref={containerRef} className="container text-center">

                {/* Single Object Focus */}
                <div className="mx-auto mb-5" style={{ maxWidth: '400px' }}>
                    <img
                        src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop"
                        alt="The Object"
                        className="w-100 object-fit-cover shadow-sm"
                        style={{ borderRadius: '2px' }}
                    />
                    <span className="d-block mt-2 text-meta text-muted text-end">Fig 01. — The Essence</span>
                </div>

                <h3 className="text-editorial display-campaign mb-4">
                    "Elegance is refusal."
                </h3>

                <p className="text-muted mx-auto" style={{ maxWidth: '400px' }}>
                    We stripped away the noise until only the feeling remained. A tribute to those who appreciate the silence between the notes.
                </p>

            </div>
        </section>
    );
};

export default Mood;
