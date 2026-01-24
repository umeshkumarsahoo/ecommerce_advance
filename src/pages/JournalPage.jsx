import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../components/AnimatedText';
import LuxuryButton from '../components/LuxuryButton';

gsap.registerPlugin(ScrollTrigger);

const articles = [
    {
        id: 1,
        category: 'Editorial',
        title: 'The Art of Quiet Luxury',
        excerpt: 'In a world of noise, true elegance whispers. Exploring the philosophy of understated refinement.',
        date: 'January 2026',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
        featured: true
    },
    {
        id: 2,
        category: 'Craftsmanship',
        title: 'Hands That Shape Heritage',
        excerpt: 'Behind every piece lies a story of dedication, skill, and generations of knowledge passed down.',
        date: 'January 2026',
        image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800'
    },
    {
        id: 3,
        category: 'Culture',
        title: 'Tokyo After Dark',
        excerpt: 'The city transforms as evening falls. A visual journey through nocturnal elegance.',
        date: 'December 2025',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800'
    },
    {
        id: 4,
        category: 'Design',
        title: 'Minimalism Redefined',
        excerpt: 'Less becomes more when intention guides every decision. The new language of modern design.',
        date: 'December 2025',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800'
    },
    {
        id: 5,
        category: 'Travel',
        title: 'The Amalfi Light',
        excerpt: 'Where Mediterranean warmth meets timeless sophistication. A journey through coastal beauty.',
        date: 'November 2025',
        image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800'
    }
];

function JournalPage() {
    const pageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.journal-article').forEach((article, i) => {
                gsap.fromTo(article,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: article,
                            start: 'top 85%'
                        }
                    }
                );
            });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    const featured = articles.find(a => a.featured);
    const otherArticles = articles.filter(a => !a.featured);

    return (
        <div ref={pageRef} style={{ paddingTop: '100px', minHeight: '100vh' }}>

            <div className="container section">
                <AnimatedText>
                    <span className="text-caption text-accent" style={{ display: 'block', marginBottom: '1rem', textAlign: 'center' }}>THE JOURNAL</span>
                </AnimatedText>

                {/* Featured Article */}
                <div style={{ marginBottom: '8rem' }} className="journal-article">
                    <div style={{ aspectRatio: '21/9', overflow: 'hidden', marginBottom: '2rem' }}>
                        <img
                            src={featured.image}
                            alt={featured.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <AnimatedText>
                            <span className="text-caption" style={{ color: 'var(--color-text-muted)' }}>{featured.category} — {featured.date}</span>
                        </AnimatedText>
                        <AnimatedText delay={0.2}>
                            <h1 className="text-h1" style={{ margin: '1rem 0' }}>{featured.title}</h1>
                        </AnimatedText>
                        <AnimatedText delay={0.4}>
                            <p className="text-body-lg">{featured.excerpt}</p>
                        </AnimatedText>
                        <div style={{ marginTop: '2rem' }}>
                            <Link to={`/journal/${featured.id}`}>
                                <LuxuryButton>Read Article</LuxuryButton>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Article Grid */}
                <div className="grid-2">
                    {otherArticles.map((article) => (
                        <article key={article.id} className="journal-article product-card">
                            <div className="card-image-wrap">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="card-image"
                                />
                            </div>
                            <div>
                                <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                    <span className="text-caption text-accent">{article.category}</span>
                                    <span className="text-caption">{article.date}</span>
                                </div>
                                <h3 className="text-h2" style={{ fontSize: '1.8rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>{article.title}</h3>
                                <p className="text-body-lg" style={{ fontSize: '1rem' }}>{article.excerpt}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default JournalPage;
