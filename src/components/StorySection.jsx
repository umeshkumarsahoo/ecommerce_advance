import React from 'react';

const StorySection = () => {
    return (
        <section className="section-padding bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center fade-in">
                        <span className="text-uppercase tracking-wider text-muted mb-3 d-block" style={{ fontSize: '0.8rem' }}>The Philosophy</span>
                        <h2 className="display-4 mb-4 font-heading">
                            Designed for the <br />
                            <span className="text-gold" style={{ fontStyle: 'italic' }}>Discerning Eye</span>
                        </h2>
                        <p className="lead text-muted mb-5" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            We believe that true luxury lies in simplicity. Our collection is a result of a
                            relentless pursuit of balance between form and function. Every piece is curated
                            to bring a sense of calm and sophistication to your environment.
                        </p>
                        <div className="row g-4 mt-4">
                            <div className="col-md-4">
                                <h4 className="h6 text-uppercase tracking-wider mb-2">Sustainable</h4>
                                <p className="small text-muted">Ethically sourced materials and responsible production.</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className="h6 text-uppercase tracking-wider mb-2">Timeless</h4>
                                <p className="small text-muted">Designs that transcend trends and seasons.</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className="h6 text-uppercase tracking-wider mb-2">Artisan</h4>
                                <p className="small text-muted">Hand-finished details by master craftsmen.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StorySection;
