export interface ProductNoteProfile {
  top: string[];
  heart: string[];
  base: string[];
}

export interface CatalogueProduct {
  id: string;
  slug: string;
  name: string;
  category: 'rituals' | 'aesthetic' | 'gifting';
  collection: string;
  collectionHandle: string;
  tagline: string;
  shortDescription: string;
  description: string;
  fragranceNotes?: ProductNoteProfile;
  price: number; // in INR
  compareAtPrice?: number;
  size: string;
  burnTime: string;
  materials: string;
  vessel: string;
  stockStatus: 'in_stock' | 'coming_soon' | 'preorder';
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  isConcept: boolean; // concept items show Coming Soon and disable direct checkout
  safetyWarning?: string;
  benefits?: string[];
  images: {
    primary: string;
    hover?: string;
    gallery?: string[];
    alt: string;
  };
  shopifyProductId: string;
  shopifyVariantId: string;
}

export const PRODUCTS: CatalogueProduct[] = [
  // ─── 1. RITUALS COLLECTION (Core 100g Tins) ──────────────────────────────────
  {
    id: 'prod_rituals_first_rain',
    slug: 'first-rain',
    name: 'The First Rain',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'The calm after the rain.',
    shortDescription: 'Petrichor, damp soil and vetiver root captured at the very moment a downpour breaks the summer heat.',
    description:
      'Inspired by the earthy petrichor that rises when rain kisses baked stone. The First Rain brings the timeless sensory relief of monsoon showers into quiet living spaces. Poured with 100% natural coconut-soy wax and fine botanical fragrance oils.',
    fragranceNotes: {
      top: ['Petrichor', 'Fresh Rain', 'Ozone'],
      heart: ['Wet Earth', 'Green Foliage'],
      base: ['Vetiver Root', 'Cedarwood', 'Moss'],
    },
    price: 699,
    size: '100 g',
    burnTime: '~30-35 hours',
    materials: 'Natural Coconut-Soy Wax, Cotton Wick',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: true,
    newArrival: false,
    isConcept: false,
    benefits: ['Grounding & Calm', 'Stress Relief', 'A Deeper Presence'],
    images: {
      primary: '/images/products/first-rain.jpg',
      hover: '/images/products/first-rain.jpg',
      alt: 'The First Rain Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/10303181357140',
    shopifyVariantId: 'gid://shopify/ProductVariant/47682405892180',
  },
  {
    id: 'prod_rituals_coffee_cream',
    slug: 'coffee-and-cream',
    name: 'Coffee and Cream',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'A comforting embrace for slower moments.',
    shortDescription: 'Freshly ground roasted Arabica beans swirled into sweet vanilla cream and warm tonka.',
    description:
      'The morning pour, distilled into an aromatic ritual. Rich roasted coffee beans softened by golden cream and warm Madagascar vanilla bring comfort, clarity and gentle focus to desk mornings and quiet afternoons.',
    fragranceNotes: {
      top: ['Roasted Arabica', 'Espresso Foam'],
      heart: ['Vanilla Cream', 'Warm Cinnamon'],
      base: ['Tonka Bean', 'Caramelized Sugar'],
    },
    price: 699,
    size: '100 g',
    burnTime: '~30-35 hours',
    materials: 'Natural Coconut-Soy Wax, Cotton Wick',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: true,
    newArrival: false,
    isConcept: false,
    benefits: ['Comforting Blend', 'Cosy Atmosphere', 'Rich Coffee Aroma'],
    images: {
      primary: '/images/products/coffee-and-cream.jpg',
      hover: '/images/products/coffee-and-cream.jpg',
      alt: 'Coffee and Cream Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/10303181324372',
    shopifyVariantId: 'gid://shopify/ProductVariant/47682405859412',
  },
  {
    id: 'prod_rituals_liquid_sunshine',
    slug: 'liquid-sunshine',
    name: 'Liquid Sunshine',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'Citrus skies. Brighter days. Always.',
    shortDescription: 'Sun-drenched Valencia orange zest and uplifting neroli blossoms for instant clarity and energy.',
    description:
      'Liquid Sunshine captures radiant morning optimism. Crisp citrus peel, blooming orange blossom, and sun-warmed neroli illuminate rooms with vibrant freshness and mental lightness.',
    fragranceNotes: {
      top: ['Valencia Orange', 'Mandarin Zest', 'Bergamot'],
      heart: ['Neroli Blossom', 'White Tea'],
      base: ['Solar Amber', 'Clean Musk'],
    },
    price: 699,
    size: '100 g',
    burnTime: '~30-35 hours',
    materials: 'Natural Coconut-Soy Wax, Cotton Wick',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: false,
    newArrival: false,
    isConcept: false,
    benefits: ['Mood Elevation', 'Fresh Energy & Clarity', 'Boosts Focus'],
    images: {
      primary: '/images/products/liquid-sunshine.jpg',
      hover: '/images/products/liquid-sunshine.jpg',
      alt: 'Liquid Sunshine Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/10303181291604',
    shopifyVariantId: 'gid://shopify/ProductVariant/47682405826644',
  },
  {
    id: 'prod_rituals_spiced_tobacco',
    slug: 'spiced-tobacco',
    name: 'Spiced Tobacco',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'Warm notes for deeper conversations.',
    shortDescription: 'Rich cured tobacco leaves, Ceylon cinnamon, warm resinous amber and aged woods.',
    description:
      'An intimate, sophisticated evening scent designed for living rooms after dark. Dry cured tobacco leaves mingle with warming cinnamon bark and amber, evoking antique wooden bookshelves and quiet late-night dialogue.',
    fragranceNotes: {
      top: ['Ceylon Cinnamon', 'Crushed Clove', 'Bergamot'],
      heart: ['Cured Tobacco Leaf', 'Bourbon Vanilla'],
      base: ['Golden Amber', 'Sandalwood', 'Patchouli'],
    },
    price: 699,
    size: '100 g',
    burnTime: '~30-35 hours',
    materials: 'Natural Coconut-Soy Wax, Cotton Wick',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: true,
    newArrival: false,
    isConcept: false,
    benefits: ['Grounding & Calm', 'Stress Relief & Focus', 'A Warmer Atmosphere'],
    images: {
      primary: '/images/products/spiced-tobacco.jpg',
      hover: '/images/products/spiced-tobacco.jpg',
      alt: 'Spiced Tobacco Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/10303181258836',
    shopifyVariantId: 'gid://shopify/ProductVariant/47682405793876',
  },
  {
    id: 'prod_rituals_rose',
    slug: 'rose',
    name: 'Rose',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'A timeless bloom, in every moment.',
    shortDescription: 'Velvety Damascena rose petals layered with soft peony blooms and sensual sheer musk.',
    description:
      'Neither powdery nor heavy, Lantern Rose is modern, green and dewy. Petals gathered at sunrise balanced with garden greens and clean musk create an effortlessly serene atmosphere in bedrooms and private sanctuaries.',
    fragranceNotes: {
      top: ['Damascena Rose Petals', 'Dewy Greens'],
      heart: ['Peony Bloom', 'Geranium'],
      base: ['Sheer White Musk', 'Warm Cedar'],
    },
    price: 699,
    size: '100 g',
    burnTime: '~30-35 hours',
    materials: 'Natural Coconut-Soy Wax, Cotton Wick',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: false,
    newArrival: false,
    isConcept: false,
    benefits: ['Promotes Relaxation', 'Instantly Lifts Mood', 'A Calmer Atmosphere'],
    images: {
      primary: '/images/products/rose.jpg',
      hover: '/images/products/rose.jpg',
      alt: 'Rose Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/10303181226068',
    shopifyVariantId: 'gid://shopify/ProductVariant/47682405761108',
  },
  {
    id: 'prod_rituals_oceanic_warmth',
    slug: 'oceanic-warmth',
    name: 'Oceanic Warmth',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'A wave of calm, a touch of warmth.',
    shortDescription: 'Mineral sea salt and cooling ocean air warmed by sunlit amber and creamy sandalwood.',
    description:
      'The quiet shore at golden hour. Oceanic Warmth balances cool sea salt breeze and driftwood with comforting coastal amber and sandalwood, creating an expansive, grounding presence.',
    fragranceNotes: {
      top: ['Mineral Sea Salt', 'Coastal Mist'],
      heart: ['White Water Lily', 'Driftwood'],
      base: ['Sunlit Amber', 'Australian Sandalwood'],
    },
    price: 699,
    size: '100 g',
    burnTime: '~30-35 hours',
    materials: 'Natural Coconut-Soy Wax, Cotton Wick',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: false,
    newArrival: false,
    isConcept: false,
    benefits: ['Mental Clarity', 'Mood Elevation', 'Stress Relief & Calm'],
    images: {
      primary: '/images/products/oceanic-warmth.jpg',
      hover: '/images/products/oceanic-warmth.jpg',
      alt: 'Oceanic Warmth Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/10303181193300',
    shopifyVariantId: 'gid://shopify/ProductVariant/47682405728340',
  },

  // ─── 2. AESTHETIC COLLECTION (Café Beverage Tumblers - Concepts) ──────────────
  {
    id: 'prod_aesthetic_matcha_latte',
    slug: 'matcha-iced-latte',
    name: 'Matcha Iced Latte',
    category: 'aesthetic',
    collection: 'Aesthetic',
    collectionHandle: 'aesthetic',
    tagline: 'Ceremonial grade green tea notes meets creamy oat milk.',
    shortDescription: 'Layered botanical green tea wax and creamy milk wax topped with sculpted wax ice cubes.',
    description:
      'A tactile homage to morning café culture. Poured in a 200ml clear café tumbler with dual layers of sweet steamed milk and ceremonial matcha wax, crowned with translucent wax ice cubes and a central cotton wick.',
    fragranceNotes: {
      top: ['Ceremonial Matcha', 'Sweet Bergamot'],
      heart: ['Oat Milk Foam', 'Steamed Jasmine'],
      base: ['Vanilla Bean', 'Soft Musks'],
    },
    price: 1499,
    size: '200 ml',
    burnTime: '~45 hours',
    materials: 'Soy Wax Blend, Cotton Wick, Sculpted Wax Ice Cubes',
    vessel: 'Clear Café Tumbler with Minimal Screenprint Label',
    stockStatus: 'coming_soon',
    featured: true,
    bestseller: false,
    newArrival: true,
    isConcept: true,
    safetyWarning: 'Decorative scented candle. Not edible.',
    benefits: ['Café-Inspired Aesthetic', 'Layered Fragrance', 'Collector Vessel'],
    images: {
      primary: '/images/products/matcha-iced-latte.jpg',
      hover: '/images/products/matcha-iced-latte.jpg',
      alt: 'Matcha Iced Latte Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/concept-matcha-iced-latte',
    shopifyVariantId: 'gid://shopify/ProductVariant/concept-matcha-iced-latte-200ml',
  },
  {
    id: 'prod_aesthetic_mocha_latte',
    slug: 'mocha-iced-latte',
    name: 'Mocha Iced Latte',
    category: 'aesthetic',
    collection: 'Aesthetic',
    collectionHandle: 'aesthetic',
    tagline: 'Dark espresso and Dutch cacao in dual-layer wax.',
    shortDescription: 'Rich dark mocha and creamy milk wax with wax ice cubes in a heavy-base café glass.',
    description:
      'Inspired by iced mocha orders on hot afternoon walks. Deep chocolate and espresso wax layers contrast with silky milk-colored soy wax, finished with wax ice cubes and gentle cocoa scent throw.',
    fragranceNotes: {
      top: ['Dark Cocoa', 'Espresso Crema'],
      heart: ['Whole Milk', 'Nutmeg'],
      base: ['Vanilla Pod', 'Melted Chocolate'],
    },
    price: 1499,
    size: '200 ml',
    burnTime: '~45 hours',
    materials: 'Soy Wax Blend, Cotton Wick, Sculpted Wax Ice Cubes',
    vessel: 'Clear Café Tumbler with Minimal Screenprint Label',
    stockStatus: 'coming_soon',
    featured: true,
    bestseller: false,
    newArrival: true,
    isConcept: true,
    safetyWarning: 'Decorative scented candle. Not edible.',
    benefits: ['Artisanal Layering', 'Warm Gourmet Scent', 'Conversation Piece'],
    images: {
      primary: '/images/products/mocha-iced-latte.jpg',
      hover: '/images/products/mocha-iced-latte.jpg',
      alt: 'Mocha Iced Latte Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/concept-mocha-iced-latte',
    shopifyVariantId: 'gid://shopify/ProductVariant/concept-mocha-iced-latte-200ml',
  },
  {
    id: 'prod_aesthetic_caramel_latte',
    slug: 'caramel-latte',
    name: 'Caramel Latte',
    category: 'aesthetic',
    collection: 'Aesthetic',
    collectionHandle: 'aesthetic',
    tagline: 'Golden caramel drizzle rendered in handcrafted wax.',
    shortDescription: 'Buttery caramel swirl and milk wax with wax ice cubes in a minimal café tumbler.',
    description:
      'Warm salted caramel drizzle hand-poured over vanilla milk wax layers. An eye-catching decorative candle that brings café indulgence into living spaces.',
    fragranceNotes: {
      top: ['Salted Caramel Drizzle', 'Butterscotch'],
      heart: ['Steamed Milk', 'Light Coffee'],
      base: ['Brown Sugar', 'Whipped Cream'],
    },
    price: 1499,
    size: '200 ml',
    burnTime: '~45 hours',
    materials: 'Soy Wax Blend, Cotton Wick, Sculpted Wax Ice Cubes',
    vessel: 'Clear Café Tumbler with Minimal Screenprint Label',
    stockStatus: 'coming_soon',
    featured: true,
    bestseller: false,
    newArrival: true,
    isConcept: true,
    safetyWarning: 'Decorative scented candle. Not edible.',
    benefits: ['Subtle Caramel Swirl', 'Aesthetic Object', 'Sweet Warm Throw'],
    images: {
      primary: '/images/products/caramel-latte.jpg',
      hover: '/images/products/caramel-latte.jpg',
      alt: 'Caramel Latte Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/concept-caramel-latte',
    shopifyVariantId: 'gid://shopify/ProductVariant/concept-caramel-latte-200ml',
  },

  // ─── 3. GIFTING COLLECTION (Curated Bundles & Boxes) ─────────────────────────
  {
    id: 'prod_gifting_two_candle',
    slug: 'the-duo-gift-box',
    name: 'The Duo Gift Box',
    category: 'gifting',
    collection: 'Gifting',
    collectionHandle: 'gifting',
    tagline: 'Two signature scents in a cloth-lined rigid presentation box.',
    shortDescription: 'Pair any two 100g Rituals candles in our signature warm ivory slide drawer box with a personal gift card.',
    description:
      'A refined, considered gift for birthdays, thank-yous, and housewarmings. Two 100g silver tin candles nestled in custom espresso die-cut compartments with a cotton pull ribbon and a handwritten message card.',
    price: 1899,
    compareAtPrice: 1998,
    size: '2 × 100 g',
    burnTime: '~70 total hours',
    materials: 'Natural Coconut-Soy Wax, Cotton Wicks, Rigid Paperboard Gift Box',
    vessel: 'Double Gift Presentation Box',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: true,
    newArrival: false,
    isConcept: false,
    benefits: ['Gift-Ready Packaging', 'Custom Handwritten Note Card', 'Complimentary Shipping'],
    images: {
      primary: '/images/gifting/gift-two-candle.jpg',
      hover: '/images/gifting/gift-two-candle.jpg',
      alt: 'The Duo Gift Box by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/gifting-duo-box',
    shopifyVariantId: 'gid://shopify/ProductVariant/gifting-duo-box-set',
  },
  {
    id: 'prod_gifting_three_candle',
    slug: 'the-trio-collection-box',
    name: 'The Trio Collection Box',
    category: 'gifting',
    collection: 'Gifting',
    collectionHandle: 'gifting',
    tagline: 'Morning, evening, and quiet moments in three harmonious scents.',
    shortDescription: 'Three 100g botanical tin candles (Rose, The First Rain, Liquid Sunshine) in a gold-foil embossed gift drawer.',
    description:
      'Curated to escort the senses through the entire day. Features floral Rose for gentle awakenings, crisp Liquid Sunshine for afternoon focus, and grounding The First Rain for the hour after dusk.',
    price: 2699,
    compareAtPrice: 2997,
    size: '3 × 100 g',
    burnTime: '~100 total hours',
    materials: 'Natural Coconut-Soy Wax, Cotton Wicks, Gold Foil Drawer Box',
    vessel: 'Triple Slide-Out Drawer Box',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: false,
    newArrival: false,
    isConcept: false,
    benefits: ['Three Full 100g Tins', 'Gold Foil Detailing', 'Woven Note Card Included'],
    images: {
      primary: '/images/gifting/gift-three-candle.jpg',
      hover: '/images/gifting/gift-three-candle.jpg',
      alt: 'The Trio Collection Box by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/gifting-trio-box',
    shopifyVariantId: 'gid://shopify/ProductVariant/gifting-trio-box-set',
  },
  {
    id: 'prod_gifting_cafe_set',
    slug: 'cafe-collection-gift-set',
    name: 'The Café Collection Set',
    category: 'gifting',
    collection: 'Gifting',
    collectionHandle: 'gifting',
    tagline: 'All three café-inspired aesthetic candles in a velvet-lined casket.',
    shortDescription: 'Matcha Iced Latte, Mocha Iced Latte, and Caramel Latte 200ml tumblers in a bespoke collector box.',
    description:
      'The ultimate conversation gift set. Houses all three handcrafted beverage-inspired candles in custom foam inserts with gold foil calligraphy on the interior lid. Collector edition.',
    price: 3999,
    size: '3 × 200 ml',
    burnTime: '~135 total hours',
    materials: 'Soy Wax, Glass Tumblers, Velvet-Lined Rigid Casket',
    vessel: 'Collector Presentation Box',
    stockStatus: 'coming_soon',
    featured: true,
    bestseller: false,
    newArrival: true,
    isConcept: true,
    safetyWarning: 'Decorative scented candles. Not edible.',
    benefits: ['Full Aesthetic Trio', 'Velvet Interior', 'Limited Concept Release'],
    images: {
      primary: '/images/gifting/gift-cafe-collection.jpg',
      hover: '/images/gifting/gift-cafe-collection.jpg',
      alt: 'The Café Collection Gift Set by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/concept-cafe-gift-set',
    shopifyVariantId: 'gid://shopify/ProductVariant/concept-cafe-gift-set-bundle',
  },
  {
    id: 'prod_gifting_ritual_grand',
    slug: 'the-rituals-grand-box',
    name: 'The Rituals Grand Box',
    category: 'gifting',
    collection: 'Gifting',
    collectionHandle: 'gifting',
    tagline: 'The complete library of all six Lantern Rituals fragrances.',
    shortDescription: 'All six core candles (The First Rain, Coffee & Cream, Liquid Sunshine, Spiced Tobacco, Rose, Oceanic Warmth).',
    description:
      'The definitive Lantern experience. An expansive presentation box containing the complete spectrum of Indian home-fragrance rituals: petrichor, citrus, roasted coffee, florals, marine breeze, and rich spices.',
    price: 4999,
    compareAtPrice: 5994,
    size: '6 × 100 g',
    burnTime: '~200 total hours',
    materials: 'Natural Coconut-Soy Wax, Cotton Wicks, Rigid Display Box',
    vessel: 'Grand Presentation Box with Six Compartments',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: false,
    newArrival: false,
    isConcept: false,
    benefits: ['Full 6 Fragrance Spectrum', 'Keepsake Rigid Box', 'Complimentary Express Delivery'],
    images: {
      primary: '/images/gifting/gift-ritual-collection.jpg',
      hover: '/images/gifting/gift-ritual-collection.jpg',
      alt: 'The Rituals Grand Box by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/gifting-rituals-grand',
    shopifyVariantId: 'gid://shopify/ProductVariant/gifting-rituals-grand-box',
  },
  {
    id: 'prod_gifting_corporate',
    slug: 'custom-corporate-gifting',
    name: 'Custom & Corporate Gifting',
    category: 'gifting',
    collection: 'Gifting',
    collectionHandle: 'gifting',
    tagline: 'Bespoke packaging, curated scent portfolios and dedicated service.',
    shortDescription: 'For weddings, client appreciation, milestone celebrations, and luxury hospitality partnerships.',
    description:
      'We collaborate directly with founders, creative directors, event designers, and hospitality leaders to craft custom candle gifts with bespoke foil branding, personalized notes, and white-glove logistics.',
    price: 0,
    size: 'Customizable',
    burnTime: 'Varies by selection',
    materials: 'Custom Wax Formulations & Vessels Available',
    vessel: 'Bespoke Presentation Boxes with Client Branding',
    stockStatus: 'in_stock',
    featured: false,
    bestseller: false,
    newArrival: false,
    isConcept: false,
    benefits: ['Custom Foil Stamping', 'Volume Tier Pricing', 'Dedicated Account Concierge'],
    images: {
      primary: '/images/gifting/gift-corporate.jpg',
      hover: '/images/gifting/gift-corporate.jpg',
      alt: 'Custom and Corporate Gifting by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/gifting-corporate-enquiry',
    shopifyVariantId: 'gid://shopify/ProductVariant/gifting-corporate-enquiry-service',
  },
];

export const CATEGORIES = [
  {
    handle: 'all',
    title: 'All Candles',
    eyebrow: 'Full Collection',
    description: 'Every Lantern candle is handpoured with natural coconut-soy wax and fine fragrance oils. Built around the belief that scent is the most intimate form of design.',
  },
  {
    handle: 'rituals',
    title: 'Rituals',
    eyebrow: 'Everyday Fragrance',
    description: 'Scents for the little rituals that make life feel brighter. Six core fragrances crafted to accompany everyday moments, memories, and personal routines.',
  },
  {
    handle: 'aesthetic',
    title: 'Aesthetic',
    eyebrow: 'Café-Inspired Objects',
    description: 'Your favourite café rituals, reimagined as objects. Realistic beverage-inspired candles poured in clear café tumblers with sculpted wax ice cubes.',
  },
  {
    handle: 'gifting',
    title: 'Gifting',
    eyebrow: 'Considered Gestures',
    description: 'Thoughtful gifts, beautifully lit. Curated candle sets, gift-ready rigid boxes, and custom gifting for occasions that deserve more than a generic hamper.',
  },
];

export function getCatalogueProducts(category?: string): CatalogueProduct[] {
  if (!category || category === 'all') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export function getCatalogueProductBySlug(slug: string): CatalogueProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
