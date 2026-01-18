import React from 'react';

/**
 * Journal Section - "Editorial Stories"
 * 
 * Horizontal scroll showcasing product collections or campaigns.
 * Uses CSS variables for proper Dark/Light mode support.
 */
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

const Journal = () => {
    return (
        <section
            className="py-5"
            style={{
                backgroundColor: 'var(--bg-color)',
                paddingTop: '15vh',
                paddingBottom: '15vh'
            }}
        >

            {/* Section Header - Uses CSS Variables for Dark Mode */}
            <div className="container-fluid px-4 px-md-5 mb-5">
                <div className="row align-items-end">
                    <div className="col-md-8">
                        <span
                            className="text-meta d-block mb-3"
                            style={{ letterSpacing: '0.2em', color: 'var(--text-muted)' }}
                        >
                            EDITORIAL
                        </span>
                        <h2
                            className="display-4 font-serif"
                            style={{
                                fontWeight: 400,
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                color: 'var(--text-main)'
                            }}
                        >
                            Shop by<br className="d-md-none" /> Story
                        </h2>
                    </div>
                    <div className="col-md-4 text-md-end d-none d-md-block">
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            Drag to explore →
                        </span>
                    </div>
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                className="d-flex gap-4 overflow-auto px-4 px-md-5 pb-4"
                style={{
                    cursor: 'grab',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                {entries.map((item) => (
                    <article
                        key={item.id}
                        className="flex-shrink-0"
                        style={{ width: 'clamp(280px, 35vw, 380px)' }}
                    >
                        {/* Portrait Image (4:5 Ratio) */}
                        <div
                            className="overflow-hidden mb-4"
                            style={{
                                aspectRatio: '4/5',
                                backgroundColor: 'var(--text-muted)'
                            }}
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-100 h-100 object-fit-cover"
                                style={{
                                    transition: 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)'
                                }}
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            />
                        </div>

                        {/* Card Info - Uses CSS Variables */}
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h3
                                    className="h5 font-serif mb-1"
                                    style={{ fontWeight: 400, color: 'var(--text-main)' }}
                                >
                                    {item.title}
                                </h3>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    {item.collection}
                                </span>
                            </div>
                            <span
                                className="text-meta"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {item.season}
                            </span>
                        </div>
                    </article>
                ))}

                {/* View All Card */}
                <div
                    className="flex-shrink-0 d-flex align-items-center justify-content-center"
                    style={{
                        width: 'clamp(200px, 25vw, 280px)',
                        aspectRatio: '4/5',
                        border: '1px solid var(--text-main)'
                    }}
                >
                    <a
                        href="#"
                        className="text-decoration-none text-center p-4"
                        style={{ color: 'var(--text-main)' }}
                    >
                        <span className="d-block font-serif h4 mb-2">View All</span>
                        <span className="text-meta" style={{ color: 'var(--text-muted)' }}>
                            Stories →
                        </span>
                    </a>
                </div>

                {/* End Spacer */}
                <div style={{ minWidth: '5vw' }}></div>
            </div>

            <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
        </section>
    );
};

export default Journal;
