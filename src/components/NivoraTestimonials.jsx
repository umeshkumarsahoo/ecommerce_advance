import React, { useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * NivoraTestimonials - Editorial Quotes
 */
const NivoraTestimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const contentRef = useRef(null);

    const testimonials = [
        {
            quote: "Becané redesigns reality through fabric. It’s not just clothing; it’s an architectural statement for the body.",
            author: "Elena Fisher",
            role: "Vogue Paris"
        },
        {
            quote: "A masterclass in modern luxury. The attention to detail is bordering on obsessional, in the best way possible.",
            author: "Marcus Chen",
            role: "Hypebeast"
        },
        {
            quote: "Finally, a brand that understands silence. The pieces speak volume without shouting.",
            author: "Sarah Jenkins",
            role: "Independent Curator"
        }
    ];

    const handleNext = () => {
        gsap.to(contentRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            onComplete: () => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                gsap.to(contentRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.1
                });
            }
        });
    };

    const handlePrev = () => {
        gsap.to(contentRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.4,
            onComplete: () => {
                setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                gsap.to(contentRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.1
                });
            }
        });
    };

    return (
        <section className="section testimonials-section">
            <div className="container">
                <p className="text-eyebrow mb-12 text-center">What People Say</p>

                <div className="testimonial-container text-center">
                    <div ref={contentRef} className="testimonial-content">
                        <blockquote className="testimonial-quote">
                            "{testimonials[currentIndex].quote}"
                        </blockquote>
                        <div className="testimonial-meta">
                            <p className="testimonial-author">{testimonials[currentIndex].author}</p>
                            <p className="testimonial-role">{testimonials[currentIndex].role}</p>
                        </div>
                    </div>

                    <div className="testimonial-controls">
                        <button onClick={handlePrev} className="control-btn prev" aria-label="Previous">
                            ←
                        </button>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
                            ></div>
                        </div>
                        <button onClick={handleNext} className="control-btn next" aria-label="Next">
                            →
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .testimonials-section {
                    background: var(--bg-primary);
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                }

                .testimonial-container {
                    max-width: 900px;
                    margin: 0 auto;
                }

                .testimonial-quote {
                    font-family: var(--font-display);
                    font-size: clamp(1.5rem, 4vw, 3rem);
                    line-height: 1.3;
                    margin-bottom: 3rem;
                    color: var(--text-primary);
                }

                .testimonial-meta {
                    margin-bottom: 4rem;
                }

                .testimonial-author {
                    font-size: 1.1rem;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                }

                .testimonial-controls {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 2rem;
                }

                .control-btn {
                    font-size: 1.5rem;
                    padding: 1rem;
                    border: 1px solid var(--border-light);
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .control-btn:hover {
                    background: var(--accent);
                    color: var(--bg-primary);
                    border-color: var(--accent);
                }

                .progress-bar {
                    width: 200px;
                    height: 1px;
                    background: var(--border-light);
                    position: relative;
                }

                .progress-fill {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    background: var(--accent);
                    transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </section >
    );
};

export default NivoraTestimonials;
