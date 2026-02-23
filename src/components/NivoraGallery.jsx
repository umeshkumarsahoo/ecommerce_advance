import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

// Local Assets
import img1 from '../assets/images/gallery-1.jpg';
import img2 from '../assets/images/gallery-2.jpg';
import img3 from '../assets/images/gallery-3.jpg';
import img4 from '../assets/images/gallery-4.jpg';
import img5 from '../assets/images/gallery-5.jpg';
import img6 from '../assets/images/gallery-6.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * NivoraGallery - Jewellery Product Grid
 * 
 * Actionable "Add to Cart" buttons wired to CartContext
 */
const NivoraGallery = () => {
    const galleryRef = useRef(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const products = [
        { id: 1, name: "Diamond Solitaire Ring", category: "Women · Rings", price: "₹3,75,000", numPrice: 375000, image: img1 },
        { id: 9, name: "Gold Signet Ring", category: "Men · Rings", price: "₹1,55,000", numPrice: 155000, image: img2 },
        { id: 2, name: "Pearl Strand Necklace", category: "Women · Necklaces", price: "₹2,45,000", numPrice: 245000, image: img3 },
        { id: 10, name: "Cuban Link Chain", category: "Men · Chains", price: "₹4,25,000", numPrice: 425000, image: img4 },
        { id: 3, name: "Emerald Tennis Bracelet", category: "Women · Bracelets", price: "₹4,99,000", numPrice: 499000, image: img5 },
        { id: 11, name: "Diamond Cufflinks", category: "Men · Cufflinks", price: "₹1,89,000", numPrice: 189000, image: img6 },
        { id: 4, name: "Diamond Drop Earrings", category: "Women · Earrings", price: "₹2,95,000", numPrice: 295000, image: img1 },
        { id: 12, name: "Leather & Gold Bracelet", category: "Men · Bracelets", price: "₹1,05,000", numPrice: 105000, image: img2 },
        { id: 7, name: "Sapphire Pendant", category: "Women · Necklaces", price: "₹2,75,000", numPrice: 275000, image: img3 },
        { id: 13, name: "Onyx Band Ring", category: "Men · Rings", price: "₹82,000", numPrice: 82000, image: img4 },
        { id: 8, name: "Diamond Huggie Earrings", category: "Women · Earrings", price: "₹1,39,000", numPrice: 139000, image: img5 },
        { id: 16, name: "Black Diamond Studs", category: "Men · Earrings", price: "₹1,19,000", numPrice: 119000, image: img6 }
    ];

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAuthenticated) {
            showToast('Please login to add items to cart', 'error');
            navigate('/login');
            return;
        }
        addToCart({
            id: product.id,
            name: product.name,
            price: product.numPrice,
            category: product.category,
            image: product.image,
        });
        showToast(`${product.name} added to cart`, 'success');
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.gallery-card',
                { y: 100, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: galleryRef.current, start: 'top 70%', toggleActions: 'play none none reverse'
                    }
                }
            );
        }, galleryRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={galleryRef} className="section gallery-section">
            <div className="container">
                <div className="gallery-header flex-between mb-12">
                    <h2 className="text-h2">FINE<br />JEWELLERY</h2>
                    <div className="gallery-cta">
                        <button className="nivora-btn" onClick={() => navigate('/collections')}>View All</button>
                    </div>
                </div>

                <div className="grid-3">
                    {products.map((product) => (
                        <div key={product.id} className="nivora-card gallery-card" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
                            <div className="card-image-wrap">
                                <img
                                    src={product.image} alt={product.name} className="card-image" loading="lazy"
                                />
                                <div className="card-overlay">
                                    <button className="add-btn" onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
                                </div>
                            </div>
                            <div className="card-info flex-between">
                                <div>
                                    <h3 className="card-title">{product.name}</h3>
                                    <span className="card-category">{product.category}</span>
                                </div>
                                <span className="card-price">{product.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .gallery-section { background-color: var(--bg-primary); }
                .card-image-wrap { transform: translateZ(0); overflow: hidden; border-radius: var(--radius-sm); }
                .card-image { will-change: transform; transition: transform 0.6s ease; width: 100%; }
                .nivora-card:hover .card-image { transform: scale(1.05); }
                .card-overlay {
                    position: absolute; inset: 0; background: rgba(0,0,0,0.3);
                    display: flex; align-items: center; justify-content: center;
                    opacity: 0; transition: opacity 0.4s ease;
                }
                .nivora-card:hover .card-overlay { opacity: 1; }
                .add-btn {
                    padding: 1rem 2rem; background: var(--accent); color: var(--bg-primary);
                    border-radius: 99px; font-weight: 600; text-transform: uppercase;
                    letter-spacing: 0.1em; font-size: 0.75rem;
                    transform: translateY(20px); transition: transform 0.4s ease;
                    cursor: pointer; border: none;
                }
                .nivora-card:hover .add-btn { transform: translateY(0); }
                .card-price { font-family: var(--font-display); font-size: 1rem; color: var(--text-primary); }
            `}</style>
        </section>
    );
};

export default NivoraGallery;
