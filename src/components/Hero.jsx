import React from 'react';

const Hero = () => {
    return (
        <header className="section-padding" style={{ paddingBottom: '0', paddingTop: '120px' }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0 fade-in">
                        <span className="d-block text-uppercase tracking-wider mb-3 text-gold" style={{ fontSize: '0.8rem' }}>
                            Est. 2024
                        </span>
                        <h1 className="display-3 mb-4 text-balance" style={{ fontSize: '4.5rem', lineHeight: '1.1' }}>
                            Redefining <br />
                            <span style={{ fontStyle: 'italic' }}>Modern Luxury</span>
                        </h1>
                        <p className="lead text-muted mb-5" style={{ maxWidth: '400px', fontSize: '1.1rem' }}>
                            Curated essentials for the contemporary lifestyle.
                            Minimalist design meeting exceptional craftsmanship.
                        </p>
                        <a href="#collections" className="btn-premium">
                            Explore Collection
                        </a>
                    </div>
                    <div className="col-lg-6 fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="position-relative" style={{ height: '600px', background: '#f0f0f0' }}>
                            <img
                                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                                alt="Luxury Interior"
                                className="img-cover"
                                style={{ borderRadius: '0px' }}
                            />
                            <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', background: '#fff', padding: '30px', maxWidth: '200px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }} className="d-none d-md-block">
                                <p className="mb-0 font-heading" style={{ fontSize: '1.2rem' }}>New Arrivals</p>
                                <span className="text-muted" style={{ fontSize: '0.9rem' }}>Spring/Summer '24</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
