import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Hybrid Nivora Components
// NivoraNav and NivoraFooter removed as they are now global in App.jsx
import NivoraHero from '../components/NivoraHero';
import NivoraGallery from '../components/NivoraGallery';
import NivoraServices from '../components/NivoraServices';
import NivoraShowcase from '../components/NivoraShowcase';
import NivoraTeam from '../components/NivoraTeam';
import NivoraTestimonials from '../components/NivoraTestimonials';
import NivoraFAQ from '../components/NivoraFAQ';
import BlobCursor from '../components/BlobCursor'; // RESTORED

/**
 * HomePage - The Hybrid Luxury Experience
 */
const HomePage = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        gsap.to(pageRef.current, {
            opacity: 1, duration: 1, ease: 'power3.out'
        });
        setTimeout(() => { ScrollTrigger.refresh(); }, 500);
    }, []);

    return (
        <div ref={pageRef} className="home-page" style={{ opacity: 0 }}>
            <div className="edge-vignette"></div>

            {/* RESTORED: User requested this logic back */}
            <BlobCursor blobCount={3} blobColor="rgba(177, 221, 52, 0.4)" sizes={[60, 40, 20]} />

            <main>
                <NivoraHero />
                <NivoraServices />
                <NivoraGallery />
                <NivoraShowcase />
                <NivoraTeam />
                <NivoraTestimonials />
                <NivoraFAQ />
            </main>
        </div>
    );
};

export default HomePage;
