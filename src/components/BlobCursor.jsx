import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * BlobCursor - PERFORMANCE OPTIMIZED
 * 
 * FIXES:
 * - Using 'transform: translate3d' instead of 'top/left' to avoid layout thrashing (Reflows).
 * - Added 'will-change' hints.
 * - Reduced math in loop.
 */
const BlobCursor = ({
    blobCount = 3,
    blobColor = 'rgba(177, 221, 52, 0.3)',
    sizes = [80, 50, 30]
}) => {
    const blobsRef = useRef([]);
    const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleClick = () => {
            blobsRef.current.forEach((blob) => {
                if (!blob) return;
                gsap.to(blob, {
                    scale: 1.4,
                    duration: 0.15,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.out'
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('click', handleClick);

        // State trackers for Lerp to avoid repeated DOM reads
        const states = Array.from({ length: blobCount }, () => ({ x: 0, y: 0 }));

        function animate() {
            states.forEach((state, index) => {
                const blob = blobsRef.current[index];
                if (!blob) return;

                const speed = 0.15 - (index * 0.03);
                const targetX = index === 0 ? mouseRef.current.x : states[index - 1].x;
                const targetY = index === 0 ? mouseRef.current.y : states[index - 1].y;

                // LERP
                state.x += (targetX - state.x) * speed;
                state.y += (targetY - state.y) * speed;

                // GPU ACCELERATED TRANSFORMS
                blob.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${gsap.getProperty(blob, "scale") || 1})`;
            });

            requestAnimationFrame(animate);
        }

        const rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(rafId);
        };
    }, [blobCount]);

    return (
        <div className="blob-cursor-container">
            {Array.from({ length: blobCount }).map((_, index) => (
                <div
                    key={index}
                    ref={el => blobsRef.current[index] = el}
                    className="blob-cursor-item"
                    style={{
                        width: `${sizes[index]}px`,
                        height: `${sizes[index]}px`,
                        backgroundColor: blobColor,
                        filter: `blur(${index * 4}px)`,
                        opacity: 0.8 - (index * 0.2),
                        zIndex: 10000 - index
                    }}
                />
            ))}
            <style>{`
                .blob-cursor-container {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 9999;
                    overflow: hidden;
                }
                .blob-cursor-item {
                    position: absolute;
                    top: 0; left: 0;
                    border-radius: 50%;
                    pointer-events: none;
                    /* Removed mix-blend-mode to save layer composite time */
                    will-change: transform;
                    margin-top: -40px; /* Offset for center start */
                    margin-left: -40px;
                }
            `}</style>
        </div>
    );
};

export default BlobCursor;
