import type { Product, ProductVariant, Collection, Cart, ShopifyImage, MoneyV2 } from './types';
import { PRODUCTS, CATEGORIES, type CatalogueProduct } from './products';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function inrMoney(amount: number): MoneyV2 {
  return { amount: amount.toFixed(2), currencyCode: 'INR' };
}

function toShopifyImage(url: string, alt: string): ShopifyImage {
  return { id: undefined, url, altText: alt, width: 1000, height: 1000 };
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

function catalogueProductToShopifyProduct(cp: CatalogueProduct): Product {
  const primaryImg = toShopifyImage(cp.images.primary, cp.images.alt);
  const hoverImg = cp.images.hover ? toShopifyImage(cp.images.hover, cp.images.alt) : primaryImg;
  const imageList = [primaryImg, hoverImg];

  const variant: ProductVariant = {
    id: cp.shopifyVariantId,
    title: cp.size,
    availableForSale: cp.stockStatus === 'in_stock',
    selectedOptions: [{ name: 'Size', value: cp.size }],
    price: inrMoney(cp.price),
    compareAtPrice: cp.compareAtPrice ? inrMoney(cp.compareAtPrice) : null,
    sku: `LTN-${cp.slug.toUpperCase().replace(/-/g, '')}`,
    barcode: null,
    weight: cp.size.includes('100') ? 100 : null,
    weightUnit: 'GRAMS',
    image: primaryImg,
    quantityAvailable: cp.stockStatus === 'in_stock' ? 50 : 0,
  };

  return {
    id: cp.shopifyProductId,
    handle: cp.slug,
    title: cp.name,
    description: cp.description,
    descriptionHtml: `<p>${cp.description}</p>${cp.fragranceNotes ? `<p><strong>Notes:</strong> ${[...cp.fragranceNotes.top, ...cp.fragranceNotes.heart, ...cp.fragranceNotes.base].join(' · ')}</p>` : ''}`,
    availableForSale: cp.stockStatus === 'in_stock',
    productType: cp.category === 'gifting' ? 'Gift Set' : 'Scented Candle',
    vendor: 'Lantern',
    tags: [cp.category, cp.collectionHandle, ...(cp.bestseller ? ['bestseller'] : []), ...(cp.newArrival ? ['new'] : [])],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
    options: [{ id: `opt-${cp.slug}-size`, name: 'Size', values: [cp.size] }],
    priceRange: {
      minVariantPrice: inrMoney(cp.price),
      maxVariantPrice: inrMoney(cp.price),
    },
    compareAtPriceRange: {
      minVariantPrice: cp.compareAtPrice ? inrMoney(cp.compareAtPrice) : inrMoney(0),
      maxVariantPrice: cp.compareAtPrice ? inrMoney(cp.compareAtPrice) : inrMoney(0),
    },
    images: wrapImages(imageList),
    variants: wrapVariants([variant]),
    featuredImage: primaryImg,
    seo: {
      title: `${cp.name} | Lantern Candles`,
      description: cp.shortDescription,
    },
    metafields: [],
    collections: {
      edges: [{ node: { title: cp.collection, handle: cp.collectionHandle } }],
    },
    category: cp.category,
    tagline: cp.tagline,
    size: cp.size,
    isConcept: cp.isConcept,
    safetyWarning: cp.safetyWarning,
    benefits: cp.benefits,
    vessel: cp.vessel,
    materials: cp.materials,
    burnTime: cp.burnTime,
    fragranceNotes: cp.fragranceNotes,
  };
}

export const MOCK_PRODUCTS: Product[] = PRODUCTS.map(catalogueProductToShopifyProduct);

export const MOCK_COLLECTIONS: Collection[] = CATEGORIES.map((cat) => {
  const collectionProducts =
    cat.handle === 'all'
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === cat.handle);

  const heroImage = collectionProducts[0]?.featuredImage ?? null;

  return {
    id: `gid://shopify/Collection/${cat.handle}`,
    handle: cat.handle,
    title: cat.title,
    description: cat.description,
    descriptionHtml: `<p>${cat.description}</p>`,
    image: heroImage,
    seo: {
      title: `${cat.title} | Lantern Candles`,
      description: cat.description,
    },
    updatedAt: now,
    products: {
      edges: collectionProducts.map((p) => ({ cursor: p.id, node: p })),
      nodes: collectionProducts,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: collectionProducts[0]?.id ?? null,
        endCursor: collectionProducts[collectionProducts.length - 1]?.id ?? null,
      },
    },
  };
});

// ─── Query Resolvers ──────────────────────────────────────────────────────────

export function getMockProducts(): Product[] {
  return MOCK_PRODUCTS;
}

export function getMockProduct(handle: string): Product | null {
  return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
}

export function getMockCollections(): Collection[] {
  return MOCK_COLLECTIONS;
}

export function getMockCollection(handle: string): Collection | null {
  // Support aliases
  const normalized = handle.toLowerCase();
  if (normalized === 'all-candles' || normalized === 'shop') {
    return MOCK_COLLECTIONS.find((c) => c.handle === 'all') ?? null;
  }
  return MOCK_COLLECTIONS.find((c) => c.handle === normalized) ?? null;
}

export function getMockCart(): Cart {
  return {
    id: 'gid://shopify/Cart/mock-session-cart',
    checkoutUrl: 'https://lantern-candles.myshopify.com/cart',
    cost: {
      subtotalAmount: inrMoney(0),
      totalAmount: inrMoney(0),
      totalTaxAmount: inrMoney(0),
      totalDutyAmount: null,
      checkoutChargeAmount: inrMoney(0),
    },
    lines: { edges: [], nodes: [] },
    totalQuantity: 0,
    note: null,
    attributes: [],
    discountCodes: [],
    buyerIdentity: {
      email: null,
      phone: null,
      countryCode: 'IN',
    },
    createdAt: now,
    updatedAt: now,
  };
}
