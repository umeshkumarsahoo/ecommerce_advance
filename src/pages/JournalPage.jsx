import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * JournalPage - Editorial Storytelling
 * 
 * Luxury fashion magazine-style layout with:
 * - Featured article hero
 * - Typography-driven design
 * - Editorial article blocks
 * - Generous whitespace
 */

// Sample journal articles data
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
    const featuredRef = useRef(null);
    const articlesRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Featured article entrance
            gsap.set('.journal-featured', { opacity: 0 });
            gsap.set('.journal-featured-image', { scale: 1.1 });
            gsap.set('.journal-featured-content', { opacity: 0, y: 60 });

            const tl = gsap.timeline({ delay: 0.3 });

            tl.to('.journal-featured', {
                opacity: 1,
                duration: 0.5
            })
                .to('.journal-featured-image', {
                    scale: 1,
                    duration: 1.4,
                    ease: 'power3.out'
                }, '-=0.3')
                .to('.journal-featured-content', {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=1');

            // Article cards scroll animation
            gsap.utils.toArray('.journal-article').forEach((article, i) => {
                gsap.set(article, { opacity: 0, y: 50 });

                ScrollTrigger.create({
                    trigger: article,
                    start: 'top 85%',
                    onEnter: () => {
                        gsap.to(article, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            delay: i * 0.1,
                            ease: 'power3.out'
                        });
                    }
                });
            });

        }, pageRef);

        return () => ctx.revert();
    }, []);

    const featured = articles.find(a => a.featured);
    const otherArticles = articles.filter(a => !a.featured);

    return (
        <div className="journal-page" ref={pageRef}>

            {/* Navigation */}
            <nav className="journal-nav">
                <Link to="/" className="journal-brand font-serif">BECANÉ</Link>
                <span className="journal-title text-meta">The Journal</span>
            </nav>

            {/* Featured Article Hero */}
            <section className="journal-featured" ref={featuredRef}>
                <div className="journal-featured-image-wrapper">
                    <img
                        src={featured.image}
                        alt={featured.title}
                        className="journal-featured-image"
                    />
                    <div className="journal-featured-overlay"></div>
                </div>
                <div className="journal-featured-content">
                    <span className="text-meta">{featured.category}</span>
                    <h1 className="font-serif">{featured.title}</h1>
                    <p>{featured.excerpt}</p>
                    <span className="text-meta">{featured.date}</span>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="journal-articles" ref={articlesRef}>
                <div className="journal-articles-header">
                    <h2 className="display-lg font-serif">Recent Stories</h2>
                    <p className="text-muted">Perspectives on craft, culture, and contemporary life</p>
                </div>

                <div className="journal-articles-grid">
                    {otherArticles.map((article) => (
                        <article key={article.id} className="journal-article">
                            <div className="journal-article-image-wrapper">
                                <img src={article.image} alt={article.title} />
                            </div>
                            <div className="journal-article-content">
                                <span className="text-meta">{article.category}</span>
                                <h3 className="font-serif">{article.title}</h3>
                                <p>{article.excerpt}</p>
                                <span className="text-meta journal-article-date">{article.date}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="journal-footer">
                <p className="text-meta">Designed by Aditi · Ayushkant · Umesh</p>
            </footer>

        </div>
    );
}

export default JournalPage;
