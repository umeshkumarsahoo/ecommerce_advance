import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light pt-5 pb-4" style={{ marginTop: 'var(--spacing-xl)' }}>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <h4 className="font-heading mb-4">LUMIÈRE</h4>
                        <p className="text-muted" style={{ maxWidth: '300px' }}>
                            Elevating everyday living through thoughtful design and sustainable practices.
                        </p>
                    </div>
                    <div className="col-lg-2 col-md-4 mb-4">
                        <h5 className="h6 text-uppercase tracking-wider mb-3">Shop</h5>
                        <a href="#" className="footer-link">New Arrivals</a>
                        <a href="#" className="footer-link">Best Sellers</a>
                        <a href="#" className="footer-link">Home Office</a>
                        <a href="#" className="footer-link">Gift Cards</a>
                    </div>
                    <div className="col-lg-2 col-md-4 mb-4">
                        <h5 className="h6 text-uppercase tracking-wider mb-3">Company</h5>
                        <a href="#" className="footer-link">Our Story</a>
                        <a href="#" className="footer-link">Sustainability</a>
                        <a href="#" className="footer-link">Careers</a>
                        <a href="#" className="footer-link">Press</a>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <h5 className="h6 text-uppercase tracking-wider mb-3">Newsletter</h5>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control border-end-0 bg-transparent" placeholder="Your email address" style={{ borderRadius: 0, borderColor: '#ddd', padding: '10px' }} />
                            <button className="btn btn-outline-secondary border-start-0" type="button" style={{ borderRadius: 0, borderColor: '#ddd', color: '#000' }}>Subscribe</button>
                        </div>
                    </div>
                </div>

                <hr style={{ opacity: 0.1 }} />

                <div className="row align-items-center pt-3">
                    <div className="col-md-6 text-center text-md-start">
                        <p className="small text-muted mb-0">© 2024 Lumière. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <p className="small text-muted mb-0">
                            Designed by <span style={{ color: 'var(--text-dark)', fontWeight: 500 }}>Aditi</span>, <span style={{ color: 'var(--text-dark)', fontWeight: 500 }}>Ayushkant</span>, <span style={{ color: 'var(--text-dark)', fontWeight: 500 }}>Umesh</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
