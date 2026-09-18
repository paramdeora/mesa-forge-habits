// ─── Primitive Scalars ───────────────────────────────────────────────────────

export type ID = string;
export type URL = string;
export type DateTime = string;
export type Decimal = string;
export type HTML = string;
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

// ─── Money ────────────────────────────────────────────────────────────────────

export interface MoneyV2 {
  amount: Decimal;
  currencyCode: string;
}

// ─── Image ────────────────────────────────────────────────────────────────────

export interface ShopifyImage {
  id?: ID;
  url: URL;
  altText: string | null;
  width: number | null;
  height: number | null;
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

export interface SEO {
  title: string | null;
  description: string | null;
}

// ─── Metafield ────────────────────────────────────────────────────────────────

export interface Metafield {
  id: ID;
  namespace: string;
  key: string;
  value: string;
  type: string;
}

// ─── Selected Option ─────────────────────────────────────────────────────────

export interface SelectedOption {
  name: string;
  value: string;
}

// ─── Product Option ──────────────────────────────────────────────────────────

export interface ProductOption {
  id: ID;
  name: string;
  values: string[];
}

// ─── Product Variant ─────────────────────────────────────────────────────────

export interface ProductVariant {
  id: ID;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: MoneyV2;
  compareAtPrice: MoneyV2 | null;
  sku: string | null;
  barcode: string | null;
  weight: number | null;
  weightUnit: string | null;
  image: ShopifyImage | null;
  quantityAvailable: number | null;
}

export interface ProductVariantConnection {
  edges: Array<{ node: ProductVariant }>;
  nodes: ProductVariant[];
}

// ─── Product ──────────────────────────────────────────────────────────────────

export interface Product {
  id: ID;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: HTML;
  availableForSale: boolean;
  productType: string;
  vendor: string;
  tags: string[];
  createdAt: DateTime;
  updatedAt: DateTime;
  publishedAt: DateTime;
  options: ProductOption[];
  priceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  compareAtPriceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  images: {
    edges: Array<{ node: ShopifyImage }>;
    nodes: ShopifyImage[];
  };
  variants: {
    edges: Array<{ node: ProductVariant }>;
    nodes: ProductVariant[];
  };
  featuredImage: ShopifyImage | null;
  seo: SEO;
  metafields: Array<Metafield | null>;
  collections?: {
    edges: Array<{ node: { title: string; handle?: string } }>;
  };
  category?: 'rituals' | 'aesthetic' | 'gifting';
  tagline?: string;
  size?: string;
  isConcept?: boolean;
  safetyWarning?: string;
  benefits?: string[];
  vessel?: string;
  materials?: string;
  burnTime?: string;
  fragranceNotes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface ProductConnection {
  edges: Array<{ cursor: string; node: Product }>;
  nodes: Product[];
  pageInfo: PageInfo;
}

// ─── Collection ───────────────────────────────────────────────────────────────

export interface Collection {
  id: ID;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: HTML;
  updatedAt: DateTime;
  image: ShopifyImage | null;
  seo: SEO;
  products: ProductConnection;
}

export interface CollectionConnection {
  edges: Array<{ cursor: string; node: Collection }>;
  nodes: Collection[];
  pageInfo: PageInfo;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export type CartLineInput = {
  merchandiseId: ID;
  quantity: number;
  attributes?: Array<{ key: string; value: string }>;
};

export type CartLineUpdateInput = {
  id: ID;
  quantity: number;
  attributes?: Array<{ key: string; value: string }>;
};

export interface CartAttribute {
  key: string;
  value: string;
}

export interface CartDiscountCode {
  applicable: boolean;
  code: string;
}

export interface CartCost {
  subtotalAmount: MoneyV2;
  totalAmount: MoneyV2;
  totalTaxAmount: MoneyV2 | null;
  totalDutyAmount: MoneyV2 | null;
  checkoutChargeAmount: MoneyV2;
}

export interface CartLine {
  id: ID;
  quantity: number;
  attributes: CartAttribute[];
  cost: {
    totalAmount: MoneyV2;
    amountPerQuantity: MoneyV2;
    compareAtAmountPerQuantity: MoneyV2 | null;
    subtotalAmount: MoneyV2;
  };
  merchandise: ProductVariant & {
    product: Pick<Product, 'id' | 'handle' | 'title' | 'featuredImage' | 'priceRange'>;
  };
  estimatedCost: {
    totalAmount: MoneyV2;
    subtotalAmount: MoneyV2;
  };
}

export interface CartLineConnection {
  edges: Array<{ cursor: string; node: CartLine }>;
  nodes: CartLine[];
}

export interface CartBuyerIdentity {
  email: string | null;
  phone: string | null;
  countryCode: string | null;
}

export interface Cart {
  id: ID;
  checkoutUrl: URL;
  createdAt: DateTime;
  updatedAt: DateTime;
  totalQuantity: number;
  note: string | null;
  attributes: CartAttribute[];
  discountCodes: CartDiscountCode[];
  cost: CartCost;
  lines: CartLineConnection;
  buyerIdentity: CartBuyerIdentity;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ShopifyAPIError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
  extensions?: Record<string, unknown>;
}

export interface ShopifyAPIResponse<T> {
  data: T;
  errors?: ShopifyAPIError[];
  extensions?: {
    cost?: {
      requestedQueryCost: number;
      actualQueryCost: number;
      throttleStatus: {
        maximumAvailable: number;
        currentlyAvailable: number;
        restoreRate: number;
      };
    };
  };
}

export interface ShopifyUserError {
  field: string[] | null;
  message: string;
  code?: string;
}

export interface GetProductsResponse {
  products: ProductConnection;
}

export interface GetProductResponse {
  productByHandle: Product | null;
}

export interface GetCollectionsResponse {
  collections: CollectionConnection;
}

export interface GetCollectionResponse {
  collectionByHandle: Collection | null;
}

export interface CreateCartResponse {
  cartCreate: {
    cart: Cart;
    userErrors: ShopifyUserError[];
  };
}

export interface AddToCartResponse {
  cartLinesAdd: {
    cart: Cart;
    userErrors: ShopifyUserError[];
  };
}

export interface RemoveFromCartResponse {
  cartLinesRemove: {
    cart: Cart;
    userErrors: ShopifyUserError[];
  };
}

export interface UpdateCartLineResponse {
  cartLinesUpdate: {
    cart: Cart;
    userErrors: ShopifyUserError[];
  };
}

export interface GetCartResponse {
  cart: Cart | null;
}

export type FlattenEdges<T> = T extends { edges: Array<{ node: infer N }> } ? N[] : never;
