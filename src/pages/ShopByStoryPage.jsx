import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ShopByStoryPage - Curated Collections Through Narratives
 * 
 * Users browse by themes rather than categories:
 * - Each section is a curated world
 * - Story-driven editorial approach
 * - Discovery-focused experience
 */

// Story collections data
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
            // Hero entrance
            gsap.set('.stories-hero-title', { opacity: 0, y: 80 });
            gsap.set('.stories-hero-subtitle', { opacity: 0 });

            gsap.to('.stories-hero-title', {
                opacity: 1,
                y: 0,
                duration: 1.2,
                delay: 0.3,
                ease: 'power3.out'
            });
            gsap.to('.stories-hero-subtitle', {
                opacity: 1,
                duration: 1,
                delay: 0.8,
                ease: 'power2.out'
            });

            // Story sections scroll animation
            gsap.utils.toArray('.story-section').forEach((section) => {
                const image = section.querySelector('.story-image');
                const content = section.querySelector('.story-content');

                gsap.set(image, { clipPath: 'inset(0 100% 0 0)' });
                gsap.set(content, { opacity: 0, x: 50 });

                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 70%',
                    onEnter: () => {
                        gsap.to(image, {
                            clipPath: 'inset(0 0% 0 0)',
                            duration: 1.2,
                            ease: 'power4.out'
                        });
                        gsap.to(content, {
                            opacity: 1,
                            x: 0,
                            duration: 1,
                            delay: 0.3,
                            ease: 'power3.out'
                        });
                    }
                });
            });

        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="stories-page" ref={pageRef}>

            {/* Navigation */}
            <nav className="journal-nav">
                <Link to="/" className="journal-brand font-serif">BECANÉ</Link>
                <span className="journal-title text-meta">Shop by Story</span>
            </nav>

            {/* Hero */}
            <section className="stories-hero">
                <h1 className="stories-hero-title display-mega font-serif">
                    Discover<br />Through<br />Narrative
                </h1>
                <p className="stories-hero-subtitle">
                    Collections curated not by category, but by feeling
                </p>
            </section>

            {/* Story Sections */}
            <div className="stories-container">
                {stories.map((story, index) => (
                    <section
                        key={story.id}
                        className={`story-section ${index % 2 === 1 ? 'story-section-reverse' : ''}`}
                    >
                        <div className="story-image-wrapper">
                            <img
                                src={story.image}
                                alt={story.title}
                                className="story-image"
                            />
                        </div>
                        <div className="story-content">
                            <span className="text-meta story-number">0{index + 1}</span>
                            <h2 className="display-lg font-serif">{story.title}</h2>
                            <span className="story-subtitle">{story.subtitle}</span>
                            <p className="story-description">{story.description}</p>
                            <div className="story-products">
                                {story.products.map((product, i) => (
                                    <span key={i} className="story-product text-meta">{product}</span>
                                ))}
                            </div>
                            <button className="story-cta">Explore Collection</button>
                        </div>
                    </section>
                ))}
            </div>

            {/* Footer */}
            <footer className="journal-footer">
                <Link to="/" className="story-back-link text-meta">← Back to Home</Link>
                <p className="text-meta">Designed by Aditi · Ayushkant · Umesh</p>
            </footer>

        </div>
    );
}

export default ShopByStoryPage;
