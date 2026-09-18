import type { Product, ProductVariant, Collection, Cart, CartLine, ShopifyImage, MoneyV2 } from './types';
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

export function addLinesToLocalCart(
  currentCart: Cart | null,
  newLines: { merchandiseId: string; quantity: number }[]
): Cart {
  const existingNodes: CartLine[] =
    currentCart?.lines?.nodes ?? currentCart?.lines?.edges?.map((e) => e.node) ?? [];
  const linesMap = new Map<string, CartLine>();

  for (const l of existingNodes) {
    linesMap.set(l.merchandise.id, { ...l });
  }

  for (const input of newLines) {
    const p = PRODUCTS.find(
      (prod) =>
        prod.shopifyVariantId === input.merchandiseId ||
        prod.id === input.merchandiseId ||
        prod.shopifyProductId === input.merchandiseId
    );
    if (!p) continue;

    const existing = linesMap.get(p.shopifyVariantId);
    const newQty = (existing?.quantity ?? 0) + input.quantity;
    const unitPrice = p.price;
    const totalLinePrice = unitPrice * newQty;
    const primaryImg = toShopifyImage(p.images.primary, p.images.alt);

    const line: CartLine = {
      id: `gid://shopify/CartLine/${p.shopifyVariantId}`,
      quantity: newQty,
      attributes: [],
      cost: {
        totalAmount: inrMoney(totalLinePrice),
        amountPerQuantity: inrMoney(unitPrice),
        compareAtAmountPerQuantity: p.compareAtPrice ? inrMoney(p.compareAtPrice) : null,
        subtotalAmount: inrMoney(totalLinePrice),
      },
      merchandise: {
        id: p.shopifyVariantId,
        title: p.size,
        availableForSale: p.stockStatus === 'in_stock',
        selectedOptions: [{ name: 'Size', value: p.size }],
        price: inrMoney(unitPrice),
        compareAtPrice: p.compareAtPrice ? inrMoney(p.compareAtPrice) : null,
        sku: `LTN-${p.slug.toUpperCase().replace(/-/g, '')}`,
        barcode: null,
        weight: 100,
        weightUnit: 'GRAMS',
        image: primaryImg,
        quantityAvailable: 50,
        product: {
          id: p.shopifyProductId,
          handle: p.slug,
          title: p.name,
          featuredImage: primaryImg,
          priceRange: {
            minVariantPrice: inrMoney(unitPrice),
            maxVariantPrice: inrMoney(unitPrice),
          },
        },
      },
      estimatedCost: {
        totalAmount: inrMoney(totalLinePrice),
        subtotalAmount: inrMoney(totalLinePrice),
      },
    };

    linesMap.set(p.shopifyVariantId, line);
  }

  const updatedNodes = Array.from(linesMap.values());
  const totalQty = updatedNodes.reduce((sum, n) => sum + n.quantity, 0);
  const totalSum = updatedNodes.reduce((sum, n) => sum + Number(n.cost.totalAmount.amount), 0);

  return {
    id: currentCart?.id && !currentCart.id.includes('mock-session-cart')
      ? currentCart.id
      : `gid://shopify/Cart/local-${Date.now()}`,
    checkoutUrl: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'lantern-candles.myshopify.com'}/cart`,
    cost: {
      subtotalAmount: inrMoney(totalSum),
      totalAmount: inrMoney(totalSum),
      totalTaxAmount: inrMoney(0),
      totalDutyAmount: null,
      checkoutChargeAmount: inrMoney(totalSum),
    },
    lines: {
      edges: updatedNodes.map((n) => ({ cursor: n.id, node: n })),
      nodes: updatedNodes,
    },
    totalQuantity: totalQty,
    note: null,
    attributes: [],
    discountCodes: [],
    buyerIdentity: {
      email: null,
      phone: null,
      countryCode: 'IN',
    },
    createdAt: currentCart?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function removeLineFromLocalCart(currentCart: Cart, lineIds: string[]): Cart {
  const existingNodes: CartLine[] =
    currentCart?.lines?.nodes ?? currentCart?.lines?.edges?.map((e) => e.node) ?? [];
  const updatedNodes = existingNodes.filter((n) => !lineIds.includes(n.id) && !lineIds.includes(n.merchandise.id));
  const totalQty = updatedNodes.reduce((sum, n) => sum + n.quantity, 0);
  const totalSum = updatedNodes.reduce((sum, n) => sum + Number(n.cost.totalAmount.amount), 0);

  return {
    ...currentCart,
    cost: {
      subtotalAmount: inrMoney(totalSum),
      totalAmount: inrMoney(totalSum),
      totalTaxAmount: inrMoney(0),
      totalDutyAmount: null,
      checkoutChargeAmount: inrMoney(totalSum),
    },
    lines: {
      edges: updatedNodes.map((n) => ({ cursor: n.id, node: n })),
      nodes: updatedNodes,
    },
    totalQuantity: totalQty,
    updatedAt: new Date().toISOString(),
  };
}

export function updateLineInLocalCart(
  currentCart: Cart,
  updates: { id: string; quantity: number }[]
): Cart {
  const existingNodes: CartLine[] =
    currentCart?.lines?.nodes ?? currentCart?.lines?.edges?.map((e) => e.node) ?? [];
  const updatedNodes: CartLine[] = [];

  for (const node of existingNodes) {
    const upd = updates.find((u) => u.id === node.id || u.id === node.merchandise.id);
    if (upd) {
      if (upd.quantity > 0) {
        const unitPrice = Number(node.cost.amountPerQuantity.amount);
        const totalLinePrice = unitPrice * upd.quantity;
        updatedNodes.push({
          ...node,
          quantity: upd.quantity,
          cost: {
            ...node.cost,
            totalAmount: inrMoney(totalLinePrice),
            subtotalAmount: inrMoney(totalLinePrice),
          },
          estimatedCost: {
            totalAmount: inrMoney(totalLinePrice),
            subtotalAmount: inrMoney(totalLinePrice),
          },
        });
      }
    } else {
      updatedNodes.push(node);
    }
  }

  const totalQty = updatedNodes.reduce((sum, n) => sum + n.quantity, 0);
  const totalSum = updatedNodes.reduce((sum, n) => sum + Number(n.cost.totalAmount.amount), 0);

  return {
    ...currentCart,
    cost: {
      subtotalAmount: inrMoney(totalSum),
      totalAmount: inrMoney(totalSum),
      totalTaxAmount: inrMoney(0),
      totalDutyAmount: null,
      checkoutChargeAmount: inrMoney(totalSum),
    },
    lines: {
      edges: updatedNodes.map((n) => ({ cursor: n.id, node: n })),
      nodes: updatedNodes,
    },
    totalQuantity: totalQty,
    updatedAt: new Date().toISOString(),
  };
}
