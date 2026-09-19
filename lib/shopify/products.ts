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
  // ─── 1. RITUALS COLLECTION (Core Candles from Live Shopify Store) ────────────
  {
    id: 'gid://shopify/Product/7561550856277',
    slug: 'liquid-sunshine',
    name: 'Liquid Sunshine',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'Salted Zest · Citrus skies and ocean air.',
    shortDescription: 'The spirit of the ocean, bottled in sunlight. Salted citrus zest mingling with sea-kissed air, ginger, geranium, and earthy vetiver.',
    description:
      'The spirit of the ocean, bottled in sunlight. A burst of citrus zest mingles with sea-kissed air, awakening the senses. Beneath it, ginger and geranium bring a green, aromatic elegance — all of it grounded by the earthy calm of vetiver.',
    fragranceNotes: {
      top: ['Citrus Zest', 'Sea Air', 'Bergamot'],
      heart: ['Fresh Ginger', 'Geranium Leaf'],
      base: ['Vetiver Root', 'Clean Musk'],
    },
    price: 499,
    size: '125 g',
    burnTime: '~40 hours',
    materials: '100% Natural Soy Wax, Cotton Wick, IFRA-Compliant French Fragrance',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: false,
    newArrival: false,
    isConcept: false,
    benefits: ['Mood Elevation', 'Fresh Energy & Clarity', 'Boosts Focus'],
    images: {
      primary: 'https://cdn.shopify.com/s/files/1/0667/4982/5109/files/fragrance_01.jpg?v=1789755102',
      hover: '/images/products/liquid-sunshine.jpg',
      alt: 'Liquid Sunshine Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/7561550856277',
    shopifyVariantId: 'gid://shopify/ProductVariant/43015671054421',
  },
  {
    id: 'gid://shopify/Product/7561552035925',
    slug: 'sushupthi',
    name: 'Sushupthi',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'Oceanic Warmth · The serene yet powerful essence of the sea.',
    shortDescription: 'A refreshing, aromatic blend opening with vibrant citrus, soothing lavender and sage, accented by nutmeg and a deep woody amber base.',
    description:
      'A refreshing, aromatic blend that opens with vibrant, zesty citrus, then moves into a heart of soothing lavender and sage, accented by nutmeg and a hint of black pepper. It settles into a rich, woody base with deep ambery undertones — the serene yet powerful essence of the ocean.',
    fragranceNotes: {
      top: ['Zesty Citrus', 'Black Pepper'],
      heart: ['Lavender', 'Clary Sage', 'Nutmeg'],
      base: ['Deep Amber', 'Woody Notes'],
    },
    price: 499,
    size: '125 g',
    burnTime: '~40 hours',
    materials: '100% Natural Soy Wax, Cotton Wick, IFRA-Compliant French Fragrance',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: true,
    newArrival: false,
    isConcept: false,
    benefits: ['Deep Relaxation', 'Peaceful Sleep Rituals', 'Calm Living Spaces'],
    images: {
      primary: 'https://cdn.shopify.com/s/files/1/0667/4982/5109/files/fragrance_02.jpg?v=1789755173',
      hover: '/images/products/oceanic-warmth.jpg',
      alt: 'Sushupthi Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/7561552035925',
    shopifyVariantId: 'gid://shopify/ProductVariant/43015672496213',
  },
  {
    id: 'gid://shopify/Product/7561552166997',
    slug: 'rosaria',
    name: 'Rosaria',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'Rose Serenity · Like a gentle touch, comforting and warm.',
    shortDescription: 'Dewy morning rose petals with serene green notes, grounded with quiet strength by a rounded woody base.',
    description:
      "Rosaria is like a mother's gentle touch — comforting, warm and full of love. It opens with the fresh, sweet scent of dewy rose petals, delicate yet vibrant, as if plucked at dawn. Serene green notes emerge, then it settles into a well-rounded woody base that grounds the sweetness with quiet strength.",
    fragranceNotes: {
      top: ['Dewy Rose Petals', 'Morning Dew'],
      heart: ['Serene Green Notes', 'Wild Peony'],
      base: ['Warm Sandalwood', 'Soft Cedar'],
    },
    price: 499,
    size: '125 g',
    burnTime: '~40 hours',
    materials: '100% Natural Soy Wax, Cotton Wick, IFRA-Compliant French Fragrance',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: false,
    newArrival: false,
    isConcept: false,
    benefits: ['Comforting Warmth', 'Heart Opening', 'Serene Presence'],
    images: {
      primary: 'https://cdn.shopify.com/s/files/1/0667/4982/5109/files/fragrance_03.jpg?v=1789755186',
      hover: '/images/products/rose.jpg',
      alt: 'Rosaria Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/7561552166997',
    shopifyVariantId: 'gid://shopify/ProductVariant/43015672660053',
  },
  {
    id: 'gid://shopify/Product/7561552330837',
    slug: 'flavido',
    name: 'Flavido',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'Plum & Citrus Flower · The definition of floral-fruity warmth.',
    shortDescription: 'Fresh notes of plum and sparkling citrus, backed by exotic white florals through the middle with a long-lasting amber and sandalwood base.',
    description:
      'The true definition of a floral-fruity fragrance. It opens on fresh notes of plum and citrus, backed by exotic white florals through the middle. A base of amber and sandal makes this one of the longest-lasting scents in the collection.',
    fragranceNotes: {
      top: ['Fresh Plum', 'Sparkling Citrus'],
      heart: ['Exotic White Florals', 'Orange Blossom'],
      base: ['Golden Amber', 'Mysore Sandalwood'],
    },
    price: 499,
    size: '125 g',
    burnTime: '~40 hours',
    materials: '100% Natural Soy Wax, Cotton Wick, IFRA-Compliant French Fragrance',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: false,
    newArrival: true,
    isConcept: false,
    benefits: ['Long-Lasting Aroma', 'Luminous Ambiance', 'Delightful Warmth'],
    images: {
      primary: 'https://cdn.shopify.com/s/files/1/0667/4982/5109/files/fragrance_04.jpg?v=1789755200',
      hover: 'https://cdn.shopify.com/s/files/1/0667/4982/5109/files/fragrance_04.jpg?v=1789755200',
      alt: 'Flavido Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/7561552330837',
    shopifyVariantId: 'gid://shopify/ProductVariant/43015672823893',
  },
  {
    id: 'gid://shopify/Product/7561552658517',
    slug: 'sweet-sin',
    name: 'Sweet Sin',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'Strawberry · Playful sweetness with creamy elegance.',
    shortDescription: 'Sun-ripened strawberries burst open with juicy sweetness, softened by delicate florals and comforting creamy warmth.',
    description:
      'Sun-ripened strawberries burst open with juicy sweetness, filling the air with playful delight. A soft whisper of delicate florals weaves through the fruit, adding elegance to its vibrant charm. As it settles, creamy warmth lingers — bright freshness turning into comforting indulgence.',
    fragranceNotes: {
      top: ['Sun-Ripened Strawberry', 'Wild Berries'],
      heart: ['Soft Gardenia', 'White Blossom'],
      base: ['Sweet Cream', 'Madagascar Vanilla'],
    },
    price: 499,
    size: '125 g',
    burnTime: '~40 hours',
    materials: '100% Natural Soy Wax, Cotton Wick, IFRA-Compliant French Fragrance',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: false,
    newArrival: true,
    isConcept: false,
    benefits: ['Joyful Fragrance', 'Comforting Sweetness', 'Playful Energy'],
    images: {
      primary: 'https://cdn.shopify.com/s/files/1/0667/4982/5109/files/fragrance_05.jpg?v=1789755214',
      hover: 'https://cdn.shopify.com/s/files/1/0667/4982/5109/files/fragrance_05.jpg?v=1789755214',
      alt: 'Sweet Sin Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/7561552658517',
    shopifyVariantId: 'gid://shopify/ProductVariant/43015673348181',
  },
  {
    id: 'gid://shopify/Product/7561552887893',
    slug: 'verdant',
    name: 'Verdant',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'Fruited Oakmoss · Woodland freshness with warm spice.',
    shortDescription: 'Fresh, grassy and fruity notes of cassis, bergamot, apple and pineapple blending into woods, vanilla, amber and deep oakmoss.',
    description:
      'Opens with fresh, grassy and fruity notes of cassis, bergamot, apple and pineapple. The heart blends spices and woods. The dry down unveils warm vanilla and amber against a deep background of oak moss.',
    fragranceNotes: {
      top: ['Cassis', 'Bergamot', 'Crisp Apple', 'Pineapple'],
      heart: ['Exotic Spices', 'Cedarwood'],
      base: ['Golden Oakmoss', 'Vanilla Pod', 'Warm Amber'],
    },
    price: 499,
    size: '125 g',
    burnTime: '~40 hours',
    materials: '100% Natural Soy Wax, Cotton Wick, IFRA-Compliant French Fragrance',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: false,
    newArrival: true,
    isConcept: false,
    benefits: ['Grounded Clarity', 'Forest Serenity', 'Rich Sophistication'],
    images: {
      primary: 'https://cdn.shopify.com/s/files/1/0667/4982/5109/files/fragrance_06.jpg?v=1789755229',
      hover: 'https://cdn.shopify.com/s/files/1/0667/4982/5109/files/fragrance_06.jpg?v=1789755229',
      alt: 'Verdant Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/7561552887893',
    shopifyVariantId: 'gid://shopify/ProductVariant/43015673610325',
  },
  {
    id: 'gid://shopify/Product/7561553051733',
    slug: 'laniakea',
    name: 'Laniakea',
    category: 'rituals',
    collection: 'Rituals',
    collectionHandle: 'rituals',
    tagline: 'Spiced Tobacco · The bold warmth of tobacco and sweet vanilla.',
    shortDescription: 'A contemporary blend of hot tobacco leaf and vibrant fresh spices, softened by rich bourbon vanilla into a rugged yet refined aroma.',
    description:
      'A contemporary twist on an unexpected blend — the bold warmth of hot tobacco meeting the vibrant kick of fresh spices, all softened by the sweetness of vanilla. It fuses the rugged and the refined into a contrast that is both bold and inviting.',
    fragranceNotes: {
      top: ['Hot Tobacco Leaf', 'Crushed Spices'],
      heart: ['Ceylon Cinnamon', 'Aged Woods'],
      base: ['Bourbon Vanilla', 'Smoky Amber'],
    },
    price: 499,
    size: '125 g',
    burnTime: '~40 hours',
    materials: '100% Natural Soy Wax, Cotton Wick, IFRA-Compliant French Fragrance',
    vessel: 'Seamless Brushed Silver Tin with Illustrated Lid',
    stockStatus: 'in_stock',
    featured: true,
    bestseller: true,
    newArrival: false,
    isConcept: false,
    benefits: ['Intimate Atmosphere', 'Warm Presence', 'Evening Grounding'],
    images: {
      primary: 'https://cdn.shopify.com/s/files/1/0667/4982/5109/files/fragrance_07.jpg?v=1789755243',
      hover: '/images/products/spiced-tobacco.jpg',
      alt: 'Laniakea Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/7561553051733',
    shopifyVariantId: 'gid://shopify/ProductVariant/43015673774165',
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
    id: 'prod_aesthetic_strawberry_frappe',
    slug: 'strawberry-creme-frappe',
    name: 'Strawberry Creme Frappe',
    category: 'aesthetic',
    collection: 'Aesthetic',
    collectionHandle: 'aesthetic',
    tagline: 'Summer berries meet sweet cream in a cooling aesthetic object.',
    shortDescription: 'Pink strawberry and milk wax topped with wax strawberry cubes in a heavy-base café glass.',
    description:
      'Inspired by nostalgic summer iced beverages. Swirls of strawberry-pink wax layered with vanilla cream, topped with translucent red wax ice cubes. An eye-catching decorative piece that fills the room with berry sweetness.',
    fragranceNotes: {
      top: ['Fresh Strawberry', 'Summer Berries'],
      heart: ['Vanilla Cream', 'Steamed Milk'],
      base: ['Spun Sugar', 'White Musk'],
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
    benefits: ['Berry Sweet Throw', 'Aesthetic Object', 'Conversation Piece'],
    images: {
      primary: '/images/products/strawberry-creme-frappe.jpg',
      hover: '/images/products/strawberry-creme-frappe.jpg',
      alt: 'Strawberry Creme Frappe Candle by Lantern',
    },
    shopifyProductId: 'gid://shopify/Product/concept-strawberry-creme-frappe',
    shopifyVariantId: 'gid://shopify/ProductVariant/concept-strawberry-creme-frappe-200ml',
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
    shortDescription: 'Matcha Iced Latte, Mocha Iced Latte, and Strawberry Creme Frappe 200ml tumblers in a bespoke collector box.',
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
  const s = slug.toLowerCase();
  if (s === 'oceanic-warmth') return PRODUCTS.find((p) => p.slug === 'sushupthi');
  if (s === 'rose') return PRODUCTS.find((p) => p.slug === 'rosaria');
  if (s === 'spiced-tobacco') return PRODUCTS.find((p) => p.slug === 'laniakea');
  return PRODUCTS.find((p) => p.slug === s);
}
