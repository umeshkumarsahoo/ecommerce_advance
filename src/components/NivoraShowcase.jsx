import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Local Assets
import img1 from '../assets/images/showcase-1.jpg';
import img2 from '../assets/images/showcase-2.jpg';
import img3 from '../assets/images/showcase-3.jpg';
import img4 from '../assets/images/showcase-4.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * NivoraShowcase - Signature Collections
 * 
 * Jewellery-focused featured pieces with actionable navigation
 */
const NivoraShowcase = () => {
    const componentRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const products = [
        {
            id: 1, productId: 1, name: "Diamond Solitaire", description: "Brilliant-cut 1.5ct diamond in 18K white gold. Eternal radiance.", image: img1
        },
        {
            id: 2, productId: 6, name: "Ruby Halo", description: "Burmese ruby encircled by a constellation of diamonds.", image: img2
        },
        {
            id: 3, productId: 3, name: "Emerald Tennis", description: "8ct of Colombian emeralds channel-set in platinum.", image: img3
        },
        {
            id: 4, productId: 10, name: "Cuban Link", description: "Solid 18K gold chain. Bold presence, impeccable weight.", image: img4
        },
        {
            id: 5, productId: 2, name: "Pearl Strand", description: "South Sea pearls hand-knotted on silk. Timeless grace.", image: img1
        },
        {
            id: 6, productId: 11, name: "Diamond Cufflinks", description: "Brilliant diamonds centred in brushed platinum.", image: img2
        },
        {
            id: 7, productId: 7, name: "Sapphire Pendant", description: "Ceylon sapphire on 18K white gold. Deep blue brilliance.", image: img3
        },
        {
            id: 8, productId: 15, name: "Platinum ID", description: "Solid platinum curb-link bracelet. Quietly commanding.", image: img4
        }
    ];

    useEffect(() => {
        const productItems = document.querySelectorAll('.showcase-item');
        productItems.forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item, start: 'top 60%', end: 'bottom 60%',
                onEnter: () => setActiveIndex(index),
                onEnterBack: () => setActiveIndex(index), markers: false
            });
        });
        return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
    }, []);

    return (
        <section ref={componentRef} className="section showcase-section">
            <div className="container grid-2">
                <div className="showcase-list">
                    <p className="text-eyebrow mb-8">Signature Collections</p>
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className={`showcase-item ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => navigate(`/product/${product.productId}`)}
                        >
                            <h3 className="item-title">{product.name}</h3>
                            <p className="item-desc">{product.description}</p>
                            <button
                                className="showcase-view-btn"
                                onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.productId}`); }}
                            >
                                View Product →
                            </button>
                        </div>
                    ))}
                </div>
                <div className="showcase-preview">
                    <div className="preview-sticky">
                        {products.map((product, index) => (
                            <img
                                key={product.id} src={product.image} alt={product.name}
                                className={`preview-image ${activeIndex === index ? 'active' : ''}`}
                                loading="lazy"
                            />
                        ))}
                        <div className="preview-overlay"><div className="scanline"></div></div>
                    </div>
                </div>
            </div>
            <style>{`
                .showcase-section { padding: 10rem 0; }
                .showcase-list { padding-right: 2rem; }
                .showcase-item {
                    padding: 4rem 0; border-top: 1px solid var(--border-light);
                    transition: all 0.5s ease; opacity: 0.3; cursor: pointer;
                    will-change: opacity, padding; 
                }
                .showcase-item.active { opacity: 1; padding-left: 2rem; border-color: var(--accent); }
                .item-title {
                    font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.5rem);
                    font-weight: 600; margin-bottom: 0.5rem; text-transform: uppercase;
                }
                .item-desc { font-size: 1rem; color: var(--text-muted); max-width: 400px; margin-bottom: 1rem; }
                .showcase-view-btn {
                    background: none; border: 1px solid var(--accent); color: var(--accent);
                    padding: 0.6rem 1.5rem; border-radius: 99px; font-size: 0.75rem;
                    font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;
                    cursor: pointer; opacity: 0; transform: translateY(10px);
                    transition: all 0.4s ease;
                }
                .showcase-item.active .showcase-view-btn { opacity: 1; transform: translateY(0); }
                .showcase-view-btn:hover { background: var(--accent); color: var(--bg-primary); }
                .showcase-preview { position: relative; height: 100%; }
                .preview-sticky {
                    position: sticky; top: 20vh; height: 60vh; width: 100%;
                    border-radius: var(--radius-lg); overflow: hidden; background: #DEE4EF;
                    z-index: 10; transform: translateZ(0); 
                }
                .preview-image {
                    position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
                    opacity: 0; transform: scale(1.1); transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    will-change: opacity, transform;
                }
                .preview-image.active { opacity: 1; transform: scale(1); z-index: 1; }
                .preview-overlay {
                    position: absolute; inset: 0; z-index: 2; pointer-events: none;
                    background: rgba(0,0,0,0.05); box-shadow: inset 0 0 50px rgba(0,0,0,0.1);
                }
                .scanline {
                    position: absolute; top: 0; left: 0; width: 100%; height: 2px;
                    background: rgba(79, 125, 181, 0.5); animation: scan 3s linear infinite; opacity: 0.5;
                }
                @keyframes scan {
                    0% { top: 0; opacity: 0; } 10% { opacity: 0.5; } 90% { opacity: 0.5; } 100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </section>
    );
};

export default NivoraShowcase;
