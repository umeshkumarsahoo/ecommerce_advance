import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedText from '../components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const stories = [
    {
        id: 'urban-silence',
        title: 'Urban Silence',
        subtitle: 'The quiet language of the city',
        description: 'Where architecture meets solitude. Pieces crafted for those who find poetry in concrete and glass.',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400',
        products: ['Structured Overcoat', 'Minimalist Tote', 'Shadow Grey Knit']
    },
    {
        id: 'evening-rituals',
        title: 'Evening Rituals',
        subtitle: 'When daylight softens',
        description: 'The transition from day to night. Elegant essentials for those quiet hours of reflection.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400',
        products: ['Silk Robe', 'Cashmere Throw', 'Ceramic Vessel']
    },
    {
        id: 'soft-architecture',
        title: 'Soft Architecture',
        subtitle: 'Form follows feeling',
        description: 'Garments that sculpt and flow. The intersection of structure and movement.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400',
        products: ['Draped Blazer', 'Pleated Trousers', 'Sculptural Scarf']
    },
    {
        id: 'coastal-memory',
        title: 'Coastal Memory',
        subtitle: 'Salt air and distant horizons',
        description: 'Inspired by shorelines at dawn. Natural textures and the colors of sea glass.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400',
        products: ['Linen Shirt', 'Canvas Espadrilles', 'Woven Belt']
    }
];

function ShopByStoryPage() {
    const pageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.story-section').forEach((section, i) => {
                const img = section.querySelector('.story-img');
                const content = section.querySelector('.story-content');

                // Parallax for image
                gsap.fromTo(img,
                    { yPercent: -10, scale: 1.1 },
                    {
                        yPercent: 10,
                        scale: 1.1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
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

            <div className="container" style={{ textAlign: 'center', padding: '10vh 0' }}>
                <AnimatedText>
                    <h1 className="text-display-xl font-serif">Narratives</h1>
                </AnimatedText>
                <AnimatedText delay={0.2}>
                    <p className="text-body-lg" style={{ color: 'var(--text-muted)', marginTop: '2rem' }}>
                        Curated worlds defining our aesthetic.
                    </p>
                </AnimatedText>
            </div>

            <div className="stories-container">
                {stories.map((story, index) => (
                    <section
                        key={story.id}
                        className="story-section section"
                        style={{ padding: '0 0 10vh 0' }}
                    >
                        <div className="container">
                            <div
                                className={`grid-cols-2`}
                                style={{
                                    gap: '4rem',
                                    alignItems: 'center',
                                    direction: index % 2 === 1 ? 'rtl' : 'ltr'
                                }}
                            >
                                {/* Image Side */}
                                <div style={{
                                    height: '80vh',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    <div className="story-img" style={{ width: '100%', height: '110%', position: 'absolute', top: -10 }}>
                                        <img
                                            src={story.image}
                                            alt={story.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div
                                    className="story-content"
                                    style={{
                                        direction: 'ltr',
                                        padding: '2rem'
                                    }}
                                >
                                    <AnimatedText>
                                        <span className="text-meta" style={{ color: 'var(--accent)' }}>0{index + 1} / STORY</span>
                                    </AnimatedText>

                                    <AnimatedText delay={0.2}>
                                        <h2 className="text-display-lg font-serif" style={{ margin: '1rem 0' }}>{story.title}</h2>
                                    </AnimatedText>

                                    <AnimatedText delay={0.3}>
                                        <p className="font-serif fst-italic text-body-lg" style={{ marginBottom: '2rem', opacity: 0.8 }}>"{story.subtitle}"</p>
                                    </AnimatedText>

                                    <AnimatedText delay={0.4}>
                                        <p className="text-body-lg" style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>{story.description}</p>
                                    </AnimatedText>

                                    <div style={{ marginBottom: '3rem' }}>
                                        {story.products.map((prod, i) => (
                                            <span
                                                key={i}
                                                className="text-meta"
                                                style={{
                                                    display: 'inline-block',
                                                    marginRight: '1rem',
                                                    marginBottom: '0.5rem',
                                                    border: '1px solid var(--border-light)',
                                                    padding: '0.5rem 1rem'
                                                }}
                                            >
                                                {prod}
                                            </span>
                                        ))}
                                    </div>

                                    <AnimatedText delay={0.5}>
                                        <button className="text-meta hover-underline" style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>
                                            Explore Narrative
                                        </button>
                                    </AnimatedText>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default ShopByStoryPage;
