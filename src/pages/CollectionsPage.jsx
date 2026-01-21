import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedText from '../components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const products = [
    { id: 1, name: "The Trench", price: "€1,200", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800" },
    { id: 2, name: "Silk Blouse", price: "€450", img: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=800" },
    { id: 3, name: "Wool Coat", price: "€2,400", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800" },
    { id: 4, name: "Leather Tote", price: "€890", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800" },
    { id: 5, name: "Cashmere Scarf", price: "€320", img: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=800" },
    { id: 6, name: "Pleated Trousers", price: "€550", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800" },
    { id: 7, name: "Ankle Boots", price: "€780", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800" },
    { id: 8, name: "Evening Dress", price: "€1,800", img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800" },
];

function CollectionsPage() {
    const pageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.collection-item').forEach((item, i) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: i * 0.05,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%'
                        }
                    }
                );
            });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} style={{ background: 'var(--bg-color)', minHeight: '100vh', paddingTop: '100px' }}>
            <Navbar />

            <div className="container section">
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <AnimatedText>
                        <h1 className="text-display-lg font-serif">Spring / Summer 2026</h1>
                    </AnimatedText>
                    <AnimatedText delay={0.2}>
                        <p className="text-body-lg" style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '1rem auto' }}>
                            A study in kinetics and silence. Pieces designed to move with you, fading into the rhythm of your life.
                        </p>
                    </AnimatedText>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '4rem 2rem'
                    }}
                >
                    {products.map((p) => (
                        <div key={p.id} className="collection-item" style={{ cursor: 'pointer' }}>
                            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', marginBottom: '1rem' }}>
                                <img
                                    src={p.img}
                                    alt={p.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                            <div className="flex-between">
                                <h3 className="text-body-lg font-serif">{p.name}</h3>
                                <span className="text-meta">{p.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default CollectionsPage;
