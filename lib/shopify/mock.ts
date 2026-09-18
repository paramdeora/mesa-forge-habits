import type { Product, ProductVariant, Collection, Cart, ShopifyImage, MoneyV2 } from './types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function inrMoney(amount: string): MoneyV2 {
  return { amount, currencyCode: 'INR' };
}

function placeholderImage(
  path: string,
  alt: string,
  width = 800,
  height = 1000
): ShopifyImage {
  return { id: undefined, url: path, altText: alt, width, height };
}

function buildVariant(
  id: string,
  title: string,
  amount: string,
  sku: string,
  image: ShopifyImage | null = null,
  weight?: number
): ProductVariant {
  return {
    id,
    title,
    availableForSale: true,
    selectedOptions: [{ name: 'Size', value: title }],
    price: inrMoney(amount),
    compareAtPrice: null,
    sku,
    barcode: null,
    weight: weight ?? null,
    weightUnit: weight ? 'GRAMS' : null,
    image,
    quantityAvailable: 50,
  };
}

function wrapVariants(variants: ProductVariant[]) {
  return {
    edges: variants.map((v) => ({ node: v })),
    nodes: variants,
  };
}

function wrapImages(images: ShopifyImage[]) {
  return {
    edges: images.map((img) => ({ node: img })),
    nodes: images,
  };
}

const now = new Date().toISOString();

// ─── Products ─────────────────────────────────────────────────────────────────

const duskVetiverImages: ShopifyImage[] = [
  placeholderImage('/images/dusk-vetiver-01.jpg', 'Dusk Vetiver candle – side view'),
  placeholderImage('/images/dusk-vetiver-02.jpg', 'Dusk Vetiver candle – top view'),
  placeholderImage('/images/dusk-vetiver-03.jpg', 'Dusk Vetiver lifestyle'),
];

const duskVetiverVariants: ProductVariant[] = [
  buildVariant('gid://shopify/ProductVariant/mock-dv-150', '150g', '1850.00', 'LTN-DV-150', duskVetiverImages[0], 150),
  buildVariant('gid://shopify/ProductVariant/mock-dv-300', '300g', '2850.00', 'LTN-DV-300', duskVetiverImages[0], 300),
  buildVariant('gid://shopify/ProductVariant/mock-dv-500', '500g', '4200.00', 'LTN-DV-500', duskVetiverImages[0], 500),
];

const DUSK_VETIVER: Product = {
  id: 'gid://shopify/Product/mock-001',
  handle: 'dusk-vetiver',
  title: 'Dusk Vetiver',
  description:
    'A slow-burning evening candle rooted in vetiver, aged sandalwood, and dark musk. Designed for the ritual of winding down.',
  descriptionHtml:
    '<p>A slow-burning evening candle rooted in vetiver, aged sandalwood, and dark musk. Designed for the ritual of winding down.</p><p>Notes: Vetiver · Sandalwood · Dark Musk</p>',
  availableForSale: true,
  productType: 'Candle',
  vendor: 'Lantern',
  tags: ['vetiver', 'sandalwood', 'dark-musk', 'evening-ritual', 'bestseller'],
  createdAt: now,
  updatedAt: now,
  publishedAt: now,
  options: [{ id: 'opt-dv-size', name: 'Size', values: ['150g', '300g', '500g'] }],
  priceRange: {
    minVariantPrice: inrMoney('1850.00'),
    maxVariantPrice: inrMoney('4200.00'),
  },
  compareAtPriceRange: {
    minVariantPrice: inrMoney('0.00'),
    maxVariantPrice: inrMoney('0.00'),
  },
  images: wrapImages(duskVetiverImages),
  variants: wrapVariants(duskVetiverVariants),
  featuredImage: duskVetiverImages[0],
  seo: {
    title: 'Dusk Vetiver Candle | Lantern',
    description: 'Evening ritual candle with vetiver, sandalwood, and dark musk.',
  },
  metafields: [],
};

// ─────────────────────────────────────────────────────────────────────────────

const greyCardamomImages: ShopifyImage[] = [
  placeholderImage('/images/grey-cardamom-01.jpg', 'Grey Cardamom candle – side view'),
  placeholderImage('/images/grey-cardamom-02.jpg', 'Grey Cardamom candle – lifestyle'),
];

const greyCardamomVariants: ProductVariant[] = [
  buildVariant('gid://shopify/ProductVariant/mock-gc-150', '150g', '1850.00', 'LTN-GC-150', greyCardamomImages[0], 150),
  buildVariant('gid://shopify/ProductVariant/mock-gc-300', '300g', '2850.00', 'LTN-GC-300', greyCardamomImages[0], 300),
];

const GREY_CARDAMOM: Product = {
  id: 'gid://shopify/Product/mock-002',
  handle: 'grey-cardamom',
  title: 'Grey Cardamom',
  description:
    'A bright, crisp morning candle with spiced green cardamom, white tea, and a touch of bergamot. Light a match and begin.',
  descriptionHtml:
    '<p>A bright, crisp morning candle with spiced green cardamom, white tea, and a touch of bergamot. Light a match and begin.</p><p>Notes: Cardamom · White Tea · Bergamot</p>',
  availableForSale: true,
  productType: 'Candle',
  vendor: 'Lantern',
  tags: ['cardamom', 'white-tea', 'bergamot', 'morning-calm'],
  createdAt: now,
  updatedAt: now,
  publishedAt: now,
  options: [{ id: 'opt-gc-size', name: 'Size', values: ['150g', '300g'] }],
  priceRange: {
    minVariantPrice: inrMoney('1850.00'),
    maxVariantPrice: inrMoney('2850.00'),
  },
  compareAtPriceRange: {
    minVariantPrice: inrMoney('0.00'),
    maxVariantPrice: inrMoney('0.00'),
  },
  images: wrapImages(greyCardamomImages),
  variants: wrapVariants(greyCardamomVariants),
  featuredImage: greyCardamomImages[0],
  seo: {
    title: 'Grey Cardamom Candle | Lantern',
    description: 'Morning ritual candle with cardamom, white tea, and bergamot.',
  },
  metafields: [],
};

// ─────────────────────────────────────────────────────────────────────────────

const whiteJasmineImages: ShopifyImage[] = [
  placeholderImage('/images/white-jasmine-01.jpg', 'White Jasmine candle – side view'),
  placeholderImage('/images/white-jasmine-02.jpg', 'White Jasmine candle – lifestyle'),
];

const whiteJasmineVariants: ProductVariant[] = [
  buildVariant('gid://shopify/ProductVariant/mock-wj-150', '150g', '1850.00', 'LTN-WJ-150', whiteJasmineImages[0], 150),
  buildVariant('gid://shopify/ProductVariant/mock-wj-300', '300g', '2850.00', 'LTN-WJ-300', whiteJasmineImages[0], 300),
];

const WHITE_JASMINE: Product = {
  id: 'gid://shopify/Product/mock-003',
  handle: 'white-jasmine',
  title: 'White Jasmine',
  description:
    'Sunlit and dewy, White Jasmine captures the scent of jasmine in full bloom, grounded with vetiver root and soft musks.',
  descriptionHtml:
    '<p>Sunlit and dewy, White Jasmine captures the scent of jasmine in full bloom, grounded with vetiver root and soft musks.</p><p>Notes: Jasmine · Vetiver Root · Soft Musk</p>',
  availableForSale: true,
  productType: 'Candle',
  vendor: 'Lantern',
  tags: ['jasmine', 'vetiver', 'musk', 'morning-calm', 'floral'],
  createdAt: now,
  updatedAt: now,
  publishedAt: now,
  options: [{ id: 'opt-wj-size', name: 'Size', values: ['150g', '300g'] }],
  priceRange: {
    minVariantPrice: inrMoney('1850.00'),
    maxVariantPrice: inrMoney('2850.00'),
  },
  compareAtPriceRange: {
    minVariantPrice: inrMoney('0.00'),
    maxVariantPrice: inrMoney('0.00'),
  },
  images: wrapImages(whiteJasmineImages),
  variants: wrapVariants(whiteJasmineVariants),
  featuredImage: whiteJasmineImages[0],
  seo: {
    title: 'White Jasmine Candle | Lantern',
    description: 'Floral morning candle with jasmine, vetiver root, and soft musks.',
  },
  metafields: [],
};

// ─────────────────────────────────────────────────────────────────────────────

const amberRainImages: ShopifyImage[] = [
  placeholderImage('/images/amber-rain-01.jpg', 'Amber Rain candle – side view'),
  placeholderImage('/images/amber-rain-02.jpg', 'Amber Rain candle – lifestyle'),
];

const amberRainVariants: ProductVariant[] = [
  buildVariant('gid://shopify/ProductVariant/mock-ar-150', '150g', '1850.00', 'LTN-AR-150', amberRainImages[0], 150),
  buildVariant('gid://shopify/ProductVariant/mock-ar-300', '300g', '2850.00', 'LTN-AR-300', amberRainImages[0], 300),
];

const AMBER_RAIN: Product = {
  id: 'gid://shopify/Product/mock-004',
  handle: 'amber-rain',
  title: 'Amber Rain',
  description:
    'The petrichor of the first monsoon shower distilled into wax. Amber, rain-kissed earth, and a whisper of oud.',
  descriptionHtml:
    '<p>The petrichor of the first monsoon shower distilled into wax. Amber, rain-kissed earth, and a whisper of oud.</p><p>Notes: Amber · Petrichor · Oud</p>',
  availableForSale: true,
  productType: 'Candle',
  vendor: 'Lantern',
  tags: ['amber', 'petrichor', 'oud', 'monsoon-noir', 'seasonal'],
  createdAt: now,
  updatedAt: now,
  publishedAt: now,
  options: [{ id: 'opt-ar-size', name: 'Size', values: ['150g', '300g'] }],
  priceRange: {
    minVariantPrice: inrMoney('1850.00'),
    maxVariantPrice: inrMoney('2850.00'),
  },
  compareAtPriceRange: {
    minVariantPrice: inrMoney('0.00'),
    maxVariantPrice: inrMoney('0.00'),
  },
  images: wrapImages(amberRainImages),
  variants: wrapVariants(amberRainVariants),
  featuredImage: amberRainImages[0],
  seo: {
    title: 'Amber Rain Candle | Lantern',
    description: 'Monsoon ritual candle with amber, petrichor, and oud.',
  },
  metafields: [],
};

// ─── All Mock Products ────────────────────────────────────────────────────────

const ALL_PRODUCTS: Product[] = [
  DUSK_VETIVER,
  GREY_CARDAMOM,
  WHITE_JASMINE,
  AMBER_RAIN,
];

// ─── Collections ──────────────────────────────────────────────────────────────

function buildProductConnection(products: Product[]) {
  return {
    edges: products.map((p) => ({ cursor: btoa(p.id), node: p })),
    nodes: products,
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null,
    },
  };
}

const EVENING_RITUAL: Collection = {
  id: 'gid://shopify/Collection/mock-col-001',
  handle: 'evening-ritual',
  title: 'Evening Ritual',
  description: 'Candles for the sacred hour between work and sleep.',
  descriptionHtml: '<p>Candles for the sacred hour between work and sleep.</p>',
  updatedAt: now,
  image: placeholderImage('/images/collection-evening-ritual.jpg', 'Evening Ritual collection', 1600, 900),
  seo: {
    title: 'Evening Ritual Collection | Lantern',
    description: 'Candles for the sacred hour between work and sleep.',
  },
  products: buildProductConnection([DUSK_VETIVER]),
};

const MORNING_CALM: Collection = {
  id: 'gid://shopify/Collection/mock-col-002',
  handle: 'morning-calm',
  title: 'Morning Calm',
  description: 'Candles to begin your day with intention.',
  descriptionHtml: '<p>Candles to begin your day with intention.</p>',
  updatedAt: now,
  image: placeholderImage('/images/collection-morning-calm.jpg', 'Morning Calm collection', 1600, 900),
  seo: {
    title: 'Morning Calm Collection | Lantern',
    description: 'Candles to begin your day with intention.',
  },
  products: buildProductConnection([GREY_CARDAMOM, WHITE_JASMINE]),
};

const MONSOON_NOIR: Collection = {
  id: 'gid://shopify/Collection/mock-col-003',
  handle: 'monsoon-noir',
  title: 'Monsoon Noir',
  description: 'Limited seasonal collection inspired by the Indian monsoon.',
  descriptionHtml: '<p>Limited seasonal collection inspired by the Indian monsoon.</p>',
  updatedAt: now,
  image: placeholderImage('/images/collection-monsoon-noir.jpg', 'Monsoon Noir collection', 1600, 900),
  seo: {
    title: 'Monsoon Noir Collection | Lantern',
    description: 'Limited seasonal collection inspired by the Indian monsoon.',
  },
  products: buildProductConnection([AMBER_RAIN]),
};

const ALL_COLLECTIONS: Collection[] = [EVENING_RITUAL, MORNING_CALM, MONSOON_NOIR];

// ─── Exported Functions ───────────────────────────────────────────────────────

export function getMockProducts(): Product[] {
  return structuredClone(ALL_PRODUCTS);
}

export function getMockProduct(handle: string): Product | null {
  const product = ALL_PRODUCTS.find((p) => p.handle === handle);
  return product ? structuredClone(product) : null;
}

export function getMockCollections(): Collection[] {
  return structuredClone(ALL_COLLECTIONS);
}

export function getMockCollection(handle: string): Collection | null {
  const collection = ALL_COLLECTIONS.find((c) => c.handle === handle);
  return collection ? structuredClone(collection) : null;
}

// Empty mock cart (used for cart initialisation before live API is available)
export function getMockCart(): Omit<Cart, 'checkoutUrl'> & { checkoutUrl: string } {
  return {
    id: 'gid://shopify/Cart/mock-cart-000',
    checkoutUrl: '#checkout-unavailable-no-credentials',
    createdAt: now,
    updatedAt: now,
    totalQuantity: 0,
    note: null,
    attributes: [],
    discountCodes: [],
    cost: {
      subtotalAmount: inrMoney('0.00'),
      totalAmount: inrMoney('0.00'),
      totalTaxAmount: null,
      totalDutyAmount: null,
      checkoutChargeAmount: inrMoney('0.00'),
    },
    lines: { edges: [], nodes: [] },
    buyerIdentity: { email: null, phone: null, countryCode: 'IN' },
  };
}
