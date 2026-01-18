import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Collection Section - "The Gallery"
 * 
 * Parallax product grid with staggered columns.
 * Uses CSS variables for Dark/Light mode support.
 */
const products = [
    { id: 1, name: "The Trench", price: "€1,200", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop" },
    { id: 2, name: "Silk Blouse", price: "€450", img: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2072&auto=format&fit=crop" },
    { id: 3, name: "Wool Coat", price: "€2,400", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop" },
    { id: 4, name: "Leather Tote", price: "€890", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop" },
];

const Collection = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect for odd items
            gsap.utils.toArray('.product-card.odd').forEach(card => {
                gsap.to(card, {
                    y: -80,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            id="collection"
            className="py-5"
            style={{
                minHeight: '100vh',
                backgroundColor: 'var(--bg-color)',
                paddingTop: '15vh',
                paddingBottom: '15vh'
            }}
        >
            <div className="container-fluid px-4 px-md-5">

                {/* Section Header */}
                <div className="text-center mb-5 pb-5">
                    <span
                        className="text-meta d-block mb-3"
                        style={{ color: 'var(--text-muted)', letterSpacing: '0.2em' }}
                    >
                        SPRING / SUMMER 2026
                    </span>
                    <h2
                        className="display-lg"
                        style={{ color: 'var(--text-main)' }}
                    >
                        The Collection
                    </h2>
                </div>

                {/* Product Grid */}
                <div className="row g-4 g-md-5">
                    {products.map((p, i) => (
                        <div
                            key={p.id}
                            className={`col-6 col-lg-3 product-card ${i % 2 !== 0 ? 'odd pt-md-5 mt-md-5' : ''}`}
                        >
                            <div className="position-relative overflow-hidden" style={{ cursor: 'pointer' }}>
                                {/* Image */}
                                <div className="overflow-hidden mb-3">
                                    <img
                                        src={p.img}
                                        alt={p.name}
                                        className="w-100 object-fit-cover"
                                        style={{
                                            aspectRatio: '3/4',
                                            transition: 'transform 1s cubic-bezier(0.19, 1, 0.22, 1)'
                                        }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                </div>

                                {/* Product Info */}
                                <div
                                    className="d-flex justify-content-between align-items-baseline pb-2"
                                    style={{ borderBottom: '1px solid var(--text-main)' }}
                                >
                                    <h3
                                        className="h6 font-serif mb-0"
                                        style={{ fontWeight: 400, color: 'var(--text-main)' }}
                                    >
                                        {p.name}
                                    </h3>
                                    <span
                                        className="text-meta"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {p.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-5 pt-5">
                    <a
                        href="#"
                        className="btn btn-outline-dark rounded-0 px-5 py-3 text-uppercase"
                        style={{
                            fontSize: '0.75rem',
                            letterSpacing: '0.15em',
                            color: 'var(--text-main)',
                            borderColor: 'var(--text-main)'
                        }}
                    >
                        View All Products
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Collection;
