import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const entries = [
    {
        id: 1,
        title: "The Minimalist",
        collection: "Essentials",
        season: "SS26",
        img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Evening Noir",
        collection: "Eveningwear",
        season: "AW25",
        img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Urban Flow",
        collection: "Ready-to-Wear",
        season: "SS26",
        img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Heritage",
        collection: "Accessories",
        season: "Timeless",
        img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop"
    },
];

/**
 * Journal Section
 * 
 * Horizontal scrolling editorial list.
 */
const Journal = () => {
    const scrollContainerRef = useRef(null);

    return (
        <section className="section" style={{ overflow: 'hidden' }}>
            <div className="container flex-between" style={{ marginBottom: '4rem' }}>
                <div>
                    <span className="text-meta" style={{ display: 'block', marginBottom: '1rem' }}>EDITORIAL</span>
                    <h2 className="text-display-md font-serif">Shop by Story</h2>
                </div>
                <div className="text-meta d-none d-md-block">Drag to explore &rarr;</div>
            </div>

            {/* Horizontal Scroll Area */}
            <div
                ref={scrollContainerRef}
                className="journal-scroll"
                style={{
                    display: 'flex',
                    gap: '2vw',
                    paddingLeft: 'var(--spacing-container)',
                    paddingRight: 'var(--spacing-container)',
                    overflowX: 'auto',
                    paddingBottom: '2rem',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                {entries.map((item) => (
                    <article key={item.id} style={{ minWidth: '350px', width: '30vw', position: 'relative' }}>
                        <div style={{ aspectRatio: '3/4', overflow: 'hidden', marginBottom: '1.5rem', background: '#222' }}>
                            <img
                                src={item.img}
                                alt={item.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.6s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            />
                        </div>
                        <div className="flex-between">
                            <div>
                                <h3 className="text-body-lg font-serif">{item.title}</h3>
                                <span className="text-meta" style={{ fontSize: '0.7rem' }}>{item.collection}</span>
                            </div>
                            <span className="text-meta" style={{ opacity: 0.5 }}>{item.season}</span>
                        </div>
                    </article>
                ))}

                {/* View All Link at end of scroll */}
                <div style={{ minWidth: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)' }}>
                    <Link to="/stories" className="text-meta hover-underline">
                        View All Stories
                    </Link>
                </div>
            </div>
            <style>{`
                .journal-scroll::-webkit-scrollbar { display: none; }
            `}</style>
        </section>
    );
};

export default Journal;
