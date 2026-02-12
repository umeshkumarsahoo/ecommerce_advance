import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Local Assets
import img1 from '../assets/images/gallery-1.jpg';
import img2 from '../assets/images/gallery-2.jpg';
import img3 from '../assets/images/gallery-3.jpg';
import img4 from '../assets/images/gallery-4.jpg';
import img5 from '../assets/images/gallery-5.jpg';
import img6 from '../assets/images/gallery-6.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * NivoraGallery - Hybrid Product Grid
 * 
 * FINAL PERFORMANCE:
 * - Uses local assets
 */
const NivoraGallery = () => {
    const galleryRef = useRef(null);

    const products = [
        { id: 1, name: "Noir Trench", category: "Outerwear", price: "€850", image: img1 },
        { id: 2, name: "Lumina Dress", category: "Dresses", price: "€1,200", image: img2 },
        { id: 3, name: "Obsidian Bag", category: "Clothing", price: "€2,400", image: img3 },
        { id: 4, name: "Eclipse Boot", category: "Footwear", price: "€950", image: img4 },
        { id: 5, name: "Solaris Jacket", category: "Outerwear", price: "€1,100", image: img5 },
        { id: 6, name: "Void Silk", category: "Tops", price: "€450", image: img6 },
        { id: 7, name: "Midnight Blazer", category: "Outerwear", price: "€780", image: img1 },
        { id: 8, name: "Prism Scarf", category: "Clothing", price: "€320", image: img2 },
        { id: 9, name: "Shadow Loafer", category: "Footwear", price: "€620", image: img3 },
        { id: 10, name: "Onyx Gown", category: "Dresses", price: "€1,850", image: img4 },
        { id: 11, name: "Carbon Tee", category: "Tops", price: "€280", image: img5 },
        { id: 12, name: "Nebula Coat", category: "Outerwear", price: "€1,450", image: img6 }
    ];

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
                    <h2 className="text-h2">PHYSICAL<br />PRODUCTS</h2>
                    <div className="gallery-cta">
                        <button className="nivora-btn">View All</button>
                    </div>
                </div>

                <div className="grid-3">
                    {products.map((product) => (
                        <div key={product.id} className="nivora-card gallery-card">
                            <div className="card-image-wrap">
                                <img
                                    src={product.image} alt={product.name} className="card-image" loading="lazy"
                                />
                                <div className="card-overlay">
                                    <button className="add-btn">Add to Cart</button>
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
                }
                .nivora-card:hover .add-btn { transform: translateY(0); }
                .card-price { font-family: var(--font-display); font-size: 1rem; color: var(--text-primary); }
            `}</style>
        </section>
    );
};

export default NivoraGallery;
