import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Local Assets
import img1 from '../assets/images/team-1.jpg';
import img2 from '../assets/images/team-2.jpg';
import img3 from '../assets/images/team-3.jpg';
import img4 from '../assets/images/team-4.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * NivoraTeam - Creative Minds
 * 
 * EMERGENCY FIX:
 * - Removed GSAP entry animation (opacity: 0) to ensure images are ALWAYS visible
 * - Removed heavy filters to fix lag
 * - Simplified structure
 */
const NivoraTeam = () => {
    const sectionRef = useRef(null);

    const team = [
        { name: "Alexander V.", role: "Master Jeweller", img: img1 },
        { name: "Isabella R.", role: "Head Gemologist", img: img2 },
        { name: "Marcus L.", role: "Lead Goldsmith", img: img3 },
        { name: "Sarah K.", role: "Design Curator", img: img4 }
    ];

    return (
        <section ref={sectionRef} className="section team-section">
            <div className="container">
                <div className="text-center mb-16">
                    <p className="text-eyebrow mb-4">Master Artisans</p>
                    <h2 className="text-h2">OUR CRAFTSMEN</h2>
                </div>
                <div className="grid-4">
                    {team.map((member, index) => (
                        <div key={index} className="team-card">
                            <div className="team-image-wrap">
                                <img src={member.img} alt={member.name} className="team-image" />
                                <div className="team-overlay"></div>
                            </div>
                            <div className="team-info">
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                .team-card { position: relative; cursor: pointer; }
                .team-image-wrap {
                    aspect-ratio: 3/4; overflow: hidden; margin-bottom: 1.5rem; position: relative;
                    border-radius: var(--radius-sm); background: #DEE4EF;
                    /* GPU Promotion */
                    transform: translateZ(0); 
                }
                .team-image {
                    width: 100%; height: 100%; object-fit: cover;
                    /* Removed heavy filter transition. Just simple B&W */
                    filter: grayscale(100%);
                    transition: filter 0.3s ease;
                }
                .team-card:hover .team-image { 
                    /* Simple restore color */
                    filter: grayscale(0%); 
                }
                .team-name {
                    font-family: var(--font-display); font-size: 1.25rem; font-weight: 500;
                    margin-bottom: 0.25rem; color: var(--text-primary);
                }
                .team-role { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.15em; }
            `}</style>
        </section>
    );
};

export default NivoraTeam;
