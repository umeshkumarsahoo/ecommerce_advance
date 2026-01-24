import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../components/AnimatedText';
import LuxuryButton from '../components/LuxuryButton';

gsap.registerPlugin(ScrollTrigger);

const storyDatabase = {
    "urban-silence": {
        title: "Urban Silence",
        subtitle: "The quiet language of the city",
        heroImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600",
        intro: "In the density of the metropolis, silence is a luxury. We explore the architectural forms that carve out space for quiet reflection.",
        content: [
            { type: 'text', text: "Concrete and glass speak a language of permanence. Our collection mirrors this resilience, using fabrics that hold their shape and structure." },
            { type: 'image', src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200", caption: "Structured forms." },
            { type: 'text', text: "The palette is drawn from the shadows of skyscrapers at dusk. Deep charcoals, slate greys, and the occasional glimmer of metallic light." },
            { type: 'grid', images: ["https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800", "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=800"] }
        ],
        relatedProducts: [1, 3]
    },
    // Fallback
    default: {
        title: "Urban Silence",
        subtitle: "The quiet language of the city",
        heroImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600",
        intro: "In the density of the metropolis, silence is a luxury. We explore the architectural forms that carve out space for quiet reflection.",
        content: [],
        relatedProducts: []
    }
};

function StoryDetailPage() {
    const { id } = useParams();
    const story = storyDatabase[id] || storyDatabase.default;
    const pageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Hero
            gsap.to('.story-hero-img', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.story-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Content Reveals
            gsap.utils.toArray('.story-content-block').forEach(block => {
                gsap.fromTo(block,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: block,
                            start: 'top 85%'
                        }
                    }
                );
            });
        }, pageRef);
        return () => ctx.revert();
    }, [id]);

    return (
        <div ref={pageRef} style={{ paddingBottom: '10vh' }}>

            {/* Hero */}
            <div className="story-hero" style={{ height: '80vh', position: 'relative', overflow: 'hidden' }}>
                <img
                    src={story.heroImage}
                    alt={story.title}
                    className="story-hero-img"
                    style={{ width: '100%', height: '120%', objectFit: 'cover', position: 'absolute', top: 0 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }}></div>
                <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <AnimatedText>
                        <span className="text-caption" style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>Story</span>
                    </AnimatedText>
                    <AnimatedText delay={0.2}>
                        <h1 className="text-hero" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', textShadow: '0 0 20px rgba(0,0,0,0.5)' }}>{story.title}</h1>
                    </AnimatedText>
                    <AnimatedText delay={0.4}>
                        <p className="text-h2" style={{ fontStyle: 'italic', opacity: 0.9 }}>{story.subtitle}</p>
                    </AnimatedText>
                </div>
            </div>

            {/* Intro */}
            <div className="container section story-content-block" style={{ maxWidth: '800px', textAlign: 'center', margin: '5rem auto' }}>
                <p className="text-h2" style={{ lineHeight: 1.4 }}>{story.intro}</p>
            </div>

            {/* Content Blocks */}
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {story.content.map((block, i) => (
                    <div key={i} className="story-content-block" style={{ marginBottom: '6rem' }}>
                        {block.type === 'image' && (
                            <div style={{ width: '100%' }}>
                                <img src={block.src} alt={block.caption} style={{ width: '100%', height: 'auto', display: 'block' }} />
                                {block.caption && <span className="text-caption" style={{ display: 'block', marginTop: '1rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>{block.caption}</span>}
                            </div>
                        )}
                        {block.type === 'text' && (
                            <p className="text-body-lg" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>{block.text}</p>
                        )}
                        {block.type === 'grid' && (
                            <div className="grid-2">
                                {block.images.map((img, idx) => (
                                    <div key={idx} style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Related Products Link */}
            <div className="container section story-content-block" style={{ textAlign: 'center' }}>
                <Link to="/collections">
                    <LuxuryButton>Shop the Collection</LuxuryButton>
                </Link>
            </div>

        </div>
    );
}

export default StoryDetailPage;
