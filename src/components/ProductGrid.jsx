import React from 'react';

const products = [
    { id: 1, name: 'The Classic Chair', price: '$850', category: 'Furniture', img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Marble Lamp', price: '$420', category: 'Lighting', img: 'https://images.unsplash.com/photo-1540932296235-d84c01570d22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Ceramic Vase Set', price: '$180', category: 'Decor', img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Linen Throw', price: '$120', category: 'Textiles', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

const ProductGrid = () => {
    return (
        <section id="collections" className="section-padding">
            <div className="container">
                <div className="row mb-5 align-items-end">
                    <div className="col-md-6">
                        <h2 className="display-5 mb-0">Curated Objects</h2>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <a href="#" className="text-muted" style={{ textDecoration: 'underline' }}>View All Products</a>
                    </div>
                </div>

                <div className="row g-5">
                    {products.map((product) => (
                        <div className="col-md-6 col-lg-3 fade-in" key={product.id}>
                            <div className="product-card">
                                <div className="hover-zoom mb-3 position-relative" style={{ overflow: 'hidden', aspectRatio: '3/4' }}>
                                    <img src={product.img} alt={product.name} className="img-cover" />
                                </div>
                                <div>
                                    <span className="text-uppercase text-muted" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>{product.category}</span>
                                    <h3 className="font-heading mt-1 mb-1" style={{ fontSize: '1.2rem' }}>{product.name}</h3>
                                    <p className="mb-0" style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
