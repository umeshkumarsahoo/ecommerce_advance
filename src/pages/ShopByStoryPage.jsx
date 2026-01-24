import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../components/AnimatedText';
import LuxuryButton from '../components/LuxuryButton';

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

                // Parallax for image
                gsap.fromTo(img,
                    { scale: 1.1 },
                    {
                        scale: 1,
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
        <div ref={pageRef} style={{ paddingTop: '100px', minHeight: '100vh' }}>

            {/* Header */}
            <div className="container text-center" style={{ padding: '10vh 0' }}>
                <AnimatedText>
                    <span className="text-caption text-accent" style={{ display: 'block', marginBottom: '1rem' }}>
                        CURATED WORLDS
                    </span>
                </AnimatedText>
                <AnimatedText delay={0.2}>
                    <h1 className="text-hero" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>Narratives</h1>
                </AnimatedText>
                <AnimatedText delay={0.4}>
                    <p className="text-body-lg" style={{ marginTop: '2rem', maxWidth: '500px', marginInline: 'auto' }}>
                        Each collection tells a story. Discover the inspiration behind the pieces.
                    </p>
                </AnimatedText>
            </div>

            {/* Stories Loop */}
            <div className="stories-container">
                {stories.map((story, index) => (
                    <section
                        key={story.id}
                        className="story-section section"
                    >
                        <div className="container">
                            <div className="grid-2" style={{ alignItems: 'center', gap: '5rem' }}>

                                {/* Image Side - Alternating Order */}
                                <div style={{
                                    order: index % 2 === 1 ? 2 : 1,
                                    aspectRatio: '4/5',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="story-img"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>

                                {/* Content Side */}
                                <div style={{
                                    order: index % 2 === 1 ? 1 : 2,
                                    paddingLeft: index % 2 === 1 ? '0' : '2rem',
                                    paddingRight: index % 2 === 1 ? '2rem' : '0'
                                }}>
                                    <AnimatedText>
                                        <span className="text-caption" style={{ display: 'block', marginBottom: '1rem' }}>0{index + 1}</span>
                                    </AnimatedText>
                                    <AnimatedText delay={0.2}>
                                        <h2 className="text-h2" style={{ marginBottom: '0.5rem' }}>{story.title}</h2>
                                    </AnimatedText>
                                    <AnimatedText delay={0.3}>
                                        <h3 className="text-body-lg" style={{ fontStyle: 'italic', marginBottom: '2rem', color: 'var(--color-text-muted)' }}>{story.subtitle}</h3>
                                    </AnimatedText>
                                    <AnimatedText delay={0.4}>
                                        <p className="text-body-lg" style={{ marginBottom: '2.5rem' }}>
                                            {story.description}
                                        </p>
                                    </AnimatedText>

                                    <AnimatedText delay={0.6}>
                                        <Link to={`/stories/${story.id}`}>
                                            <LuxuryButton>Explore Narrative</LuxuryButton>
                                        </Link>
                                    </AnimatedText>
                                </div>

                            </div>
                        </div>
                    </section>
                ))}
            </div>

        </div>
    );
}

export default ShopByStoryPage;
