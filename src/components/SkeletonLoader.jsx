import React from 'react';

/**
 * SkeletonLoader — Reusable shimmer placeholder components
 *
 * Usage:
 *   <Skeleton width="100%" height="200px" />
 *   <ProductCardSkeleton />
 */

// Base Skeleton element with shimmer animation
const Skeleton = ({
    width = '100%',
    height = '20px',
    borderRadius = '6px',
    style = {},
}) => (
    <div
        className="skeleton-shimmer"
        style={{
            width,
            height,
            borderRadius,
            backgroundColor: '#DEE4EF',
            ...style,
        }}
    />
);

// Composite: mimics a product card skeleton
const ProductCardSkeleton = () => (
    <div style={s.card}>
        <Skeleton width="100%" height="0" borderRadius="12px 12px 0 0" style={s.imageSkeleton} />
        <div style={s.infoWrap}>
            <Skeleton width="50px" height="10px" borderRadius="4px" />
            <Skeleton width="70%" height="16px" borderRadius="4px" style={{ marginTop: '8px' }} />
            <div style={s.metaRow}>
                <Skeleton width="80px" height="12px" borderRadius="4px" />
                <Skeleton width="60px" height="14px" borderRadius="4px" />
            </div>
            <Skeleton width="100%" height="36px" borderRadius="8px" style={{ marginTop: '12px' }} />
        </div>
    </div>
);

// Grid of skeleton cards
const SkeletonGrid = ({ count = 6 }) => (
    <>
        <div className="skeleton-grid" style={s.grid}>
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
        <style>{shimmerCSS}</style>
    </>
);


// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════
const s = {
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #DEE4EF',
    },
    imageSkeleton: {
        aspectRatio: '3/4',
        paddingBottom: '133.33%', /* fallback for aspect-ratio */
    },
    infoWrap: {
        padding: '1rem 1.25rem 1.25rem',
    },
    metaRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
    },
};

const shimmerCSS = `
    @keyframes skeleton-shimmer {
        0% { background-position: -400px 0; }
        100% { background-position: 400px 0; }
    }
    .skeleton-shimmer {
        background-image: linear-gradient(
            90deg,
            #DEE4EF 0%,
            #EEF1F6 40%,
            #DEE4EF 80%
        );
        background-size: 800px 100%;
        animation: skeleton-shimmer 1.6s ease-in-out infinite;
    }

    @media (max-width: 1024px) {
        .skeleton-grid {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }
    @media (max-width: 640px) {
        .skeleton-grid {
            grid-template-columns: 1fr !important;
        }
    }
`;

export { Skeleton, ProductCardSkeleton, SkeletonGrid };
export default SkeletonGrid;
