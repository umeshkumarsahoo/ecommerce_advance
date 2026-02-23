/**
 * productData.js — Single source of truth for all product data
 * BECANÉ Fine Jewellery — Men & Women collections
 */

export const PRODUCTS = [
    // ═══════════════════════════════════════
    // WOMEN'S JEWELLERY
    // ═══════════════════════════════════════
    {
        id: 1,
        name: 'Diamond Solitaire Ring',
        price: 375000,
        gender: 'Women',
        category: 'Rings',
        inStock: true,
        rating: 4.9,
        brand: 'BECANÉ',
        description: 'A brilliant-cut 1.5ct diamond set in 18K white gold. The timeless expression of eternal elegance.',
        sizes: ['5', '6', '7', '8'],
        images: [
            'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
        ],
    },
    {
        id: 2,
        name: 'Pearl Strand Necklace',
        price: 245000,
        gender: 'Women',
        category: 'Necklaces',
        inStock: true,
        rating: 4.7,
        brand: 'BECANÉ',
        description: 'Lustrous South Sea pearls hand-knotted on silk thread. 18K gold clasp with diamond accent.',
        sizes: [],
        images: [
            'https://images.unsplash.com/photo-1515562141589-67f0d569b6c3?w=800',
        ],
    },
    {
        id: 3,
        name: 'Emerald Tennis Bracelet',
        price: 499000,
        gender: 'Women',
        category: 'Bracelets',
        inStock: true,
        rating: 4.8,
        brand: 'BECANÉ',
        description: 'Colombian emeralds totalling 8ct, channel-set in platinum. A green fire that demands attention.',
        sizes: [],
        images: [
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
        ],
    },
    {
        id: 4,
        name: 'Diamond Drop Earrings',
        price: 295000,
        gender: 'Women',
        category: 'Earrings',
        inStock: true,
        rating: 4.6,
        brand: 'BECANÉ',
        description: 'Pear-shaped diamonds suspended from pavé-set hooks. Movement and light captured in 18K rose gold.',
        sizes: [],
        images: [
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
        ],
    },
    {
        id: 5,
        name: 'Gold Anklet Chain',
        price: 85000,
        gender: 'Women',
        category: 'Anklets',
        inStock: true,
        rating: 4.3,
        brand: 'BECANÉ',
        description: 'Delicate 14K gold figaro chain with charm accents. Understated luxury for the modern woman.',
        sizes: [],
        images: [
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
        ],
    },
    {
        id: 6,
        name: 'Ruby Halo Ring',
        price: 599000,
        gender: 'Women',
        category: 'Rings',
        inStock: false,
        rating: 4.9,
        brand: 'BECANÉ',
        description: 'A 2ct Burmese ruby surrounded by a halo of brilliant diamonds. Set in platinum for eternity.',
        sizes: ['5', '6', '7', '8'],
        images: [
            'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800',
        ],
    },
    {
        id: 7,
        name: 'Sapphire Pendant Necklace',
        price: 275000,
        gender: 'Women',
        category: 'Necklaces',
        inStock: true,
        rating: 4.5,
        brand: 'BECANÉ',
        description: 'Oval Ceylon sapphire on an 18K white gold cable chain. Deep blue meets radiant brilliance.',
        sizes: [],
        images: [
            'https://images.unsplash.com/photo-1599459183200-59c3aede37f0?w=800',
        ],
    },
    {
        id: 8,
        name: 'Diamond Huggie Earrings',
        price: 139000,
        gender: 'Women',
        category: 'Earrings',
        inStock: true,
        rating: 4.4,
        brand: 'BECANÉ',
        description: 'Pavé-set diamonds wrapping 14K yellow gold hoops. Everyday sparkle, elevated.',
        sizes: [],
        images: [
            'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800',
        ],
    },

    // ═══════════════════════════════════════
    // MEN'S JEWELLERY
    // ═══════════════════════════════════════
    {
        id: 9,
        name: 'Gold Signet Ring',
        price: 155000,
        gender: 'Men',
        category: 'Rings',
        inStock: true,
        rating: 4.6,
        brand: 'BECANÉ',
        description: '18K yellow gold signet ring with a hand-engraved family crest panel. Heritage meets modern luxury.',
        sizes: ['9', '10', '11', '12'],
        images: [
            'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800',
        ],
    },
    {
        id: 10,
        name: 'Cuban Link Chain',
        price: 425000,
        gender: 'Men',
        category: 'Chains',
        inStock: true,
        rating: 4.8,
        brand: 'BECANÉ',
        description: 'Solid 18K gold Cuban link chain. 22-inch, 8mm width. Bold presence, impeccable weight.',
        sizes: [],
        images: [
            'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800',
        ],
    },
    {
        id: 11,
        name: 'Diamond Cufflinks',
        price: 189000,
        gender: 'Men',
        category: 'Cufflinks',
        inStock: true,
        rating: 4.5,
        brand: 'BECANÉ',
        description: 'Round brilliant diamonds centred in brushed platinum cufflinks. The finishing touch for black-tie.',
        sizes: [],
        images: [
            'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=800',
        ],
    },
    {
        id: 12,
        name: 'Leather & Gold Bracelet',
        price: 105000,
        gender: 'Men',
        category: 'Bracelets',
        inStock: true,
        rating: 4.3,
        brand: 'BECANÉ',
        description: 'Hand-braided Italian leather with an 18K gold magnetic clasp. Rugged sophistication.',
        sizes: [],
        images: [
            'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800',
        ],
    },
    {
        id: 13,
        name: 'Onyx Band Ring',
        price: 82000,
        gender: 'Men',
        category: 'Rings',
        inStock: true,
        rating: 4.2,
        brand: 'BECANÉ',
        description: 'Polished black onyx inlaid in a brushed titanium band. Minimal, dark, powerful.',
        sizes: ['9', '10', '11', '12', '13'],
        images: [
            'https://images.unsplash.com/photo-1609942072796-a1e1fae024cb?w=800',
        ],
    },
    {
        id: 14,
        name: 'Gold Rope Chain',
        price: 315000,
        gender: 'Men',
        category: 'Chains',
        inStock: false,
        rating: 4.7,
        brand: 'BECANÉ',
        description: '14K gold rope chain, hand-twisted for maximum light reflection. 24-inch statement piece.',
        sizes: [],
        images: [
            'https://images.unsplash.com/photo-1602752250015-52934bc45613?w=800',
        ],
    },
    {
        id: 15,
        name: 'Platinum ID Bracelet',
        price: 245000,
        gender: 'Men',
        category: 'Bracelets',
        inStock: true,
        rating: 4.6,
        brand: 'BECANÉ',
        description: 'Solid platinum curb-link bracelet with engravable ID plate. Quietly commanding.',
        sizes: [],
        images: [
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
        ],
    },
    {
        id: 16,
        name: 'Black Diamond Studs',
        price: 119000,
        gender: 'Men',
        category: 'Earrings',
        inStock: true,
        rating: 4.4,
        brand: 'BECANÉ',
        description: 'Black diamond studs set in matte black rhodium-plated gold. Edge and elegance in one.',
        sizes: [],
        images: [
            'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=800',
        ],
    },
];

export const CATEGORIES = ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Chains', 'Cufflinks', 'Anklets'];
export const GENDERS = ['Men', 'Women'];

/** Sub-categories available per gender */
export const GENDER_CATEGORIES = {
    Men: ['Rings', 'Bracelets', 'Chains', 'Cufflinks', 'Earrings'],
    Women: ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Anklets'],
};

/** Look up a single product by ID */
export const getProductById = (id) => PRODUCTS.find((p) => p.id === Number(id)) || PRODUCTS[0];
