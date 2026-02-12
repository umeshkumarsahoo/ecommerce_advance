import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // OPTIMIZATION: Sped up interval to 30ms (from 100ms) for faster loading percepion
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                // Random increment increased to 5-15% per tick
                return prev + Math.floor(Math.random() * 10) + 5;
            });
        }, 30); // Much faster ticks

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            // Exit animation
            const tl = gsap.timeline({
                onComplete: onComplete
            });

            tl.to('.preloader-percent', {
                opacity: 0,
                y: -20,
                duration: 0.4, // Faster exit
                ease: 'power2.in'
            })
                .to('.preloader-bar', {
                    width: '100vw',
                    height: '100vh',
                    duration: 0.6, // Faster fill
                    ease: 'power4.inOut'
                })
                .to('.preloader', {
                    yPercent: -100,
                    duration: 0.6, // Faster slide out
                    ease: 'power4.inOut'
                }, '-=0.4');
        }
    }, [progress, onComplete]);

    return (
        <div className="preloader">
            <div className="preloader-content">
                <div className="preloader-percent">
                    {Math.min(progress, 100)}%
                </div>
                <div className="preloader-text">
                    BECANÉ
                </div>
            </div>

            <div className="preloader-line">
                <div
                    className="preloader-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <style>{`
                .preloader {
                    position: fixed; inset: 0; background-color: #F6F4FA; z-index: 9999;
                    display: flex; align-items: center; justify-content: center; color: #0C2340;
                }
                .preloader-content { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
                .preloader-percent { font-family: 'Instrument Sans', sans-serif; font-size: 8rem; font-weight: 700; line-height: 1; }
                .preloader-text {
                    font-family: 'Inter', sans-serif; letter-spacing: 0.5em; font-size: 0.875rem; text-transform: uppercase; opacity: 0.5;
                }
                .preloader-line { position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: rgba(0,0,0,0.08); }
                .preloader-fill { height: 100%; background: #4F7DB5; transition: width 0.1s ease-out; }
            `}</style>
        </div>
    );
};

export default Preloader;
