import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const products = [
    { id: 1, name: "The Trench", price: "€1,200", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop" },
    { id: 2, name: "Silk Blouse", price: "€450", img: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2072&auto=format&fit=crop" },
    { id: 3, name: "Wool Coat", price: "€2,400", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop" },
    { id: 4, name: "Leather Tote", price: "€890", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop" },
];

/**
 * Collection Section
 * 
 * Staggered grid layout.
 */
const Collection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.product-card.odd').forEach(card => {
                gsap.to(card, {
                    y: -50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="collection" className="section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                    <AnimatedText>
                        <span className="text-meta" style={{ marginBottom: '1rem', display: 'block' }}>SPRING / SUMMER 2026</span>
                    </AnimatedText>
                    <AnimatedText delay={0.2}>
                        <h2 className="text-display-md font-serif">The Collection</h2>
                    </AnimatedText>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '4rem 2rem'
                    }}
                >
                    {products.map((p, i) => (
                        <div
                            key={p.id}
                            className={`product-card ${i % 2 !== 0 ? 'odd' : ''}`}
                            style={{ paddingTop: i % 2 !== 0 ? '4rem' : '0' }}
                        >
                            <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                <img
                                    src={p.img}
                                    alt={p.name}
                                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                            <div className="flex-between">
                                <h3 className="text-body-lg font-serif">{p.name}</h3>
                                <span className="text-meta">{p.price}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '8rem' }}>
                    <a href="#" className="hover-underline text-meta" style={{ color: 'var(--text-main)' }}>
                        View All Products
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Collection;
