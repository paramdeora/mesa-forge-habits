import type {
  ShopifyAPIResponse,
  GetProductsResponse,
  GetProductResponse,
  GetCollectionsResponse,
  GetCollectionResponse,
  CreateCartResponse,
  AddToCartResponse,
  RemoveFromCartResponse,
  UpdateCartLineResponse,
  GetCartResponse,
  Product,
  Collection,
  Cart,
  CartLineInput,
  CartLineUpdateInput,
} from './types';

import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_QUERY,
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_LINE_MUTATION,
  GET_CART_QUERY,
} from './queries';

import {
  getMockProducts,
  getMockProduct,
  getMockCollections,
  getMockCollection,
} from './mock';

// ─── Config ───────────────────────────────────────────────────────────────────

const SHOPIFY_STORE_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? 'lantern-candles.myshopify.com';

const STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? '';

const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION ?? '2024-04';

const ENDPOINT = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

// ─── Fetch Helper ─────────────────────────────────────────────────────────────

type ShopifyFetchOptions<TVars = Record<string, unknown>> = {
  query: string;
  variables?: TVars;
  tags?: string[];
  cache?: RequestCache;
  revalidate?: number;
};

export async function shopifyFetch<TData, TVars = Record<string, unknown>>(
  options: ShopifyFetchOptions<TVars>
): Promise<ShopifyAPIResponse<TData>> {
  const { query, variables, tags, cache = 'force-cache', revalidate } = options;

  const nextOptions: NextFetchRequestConfig = {};
  if (tags) nextOptions.tags = tags;
  if (revalidate !== undefined) nextOptions.revalidate = revalidate;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
  });

  if (!res.ok) {
    throw new Error(
      `Shopify API error: ${res.status} ${res.statusText} at ${ENDPOINT}`
    );
  }

  const json = (await res.json()) as ShopifyAPIResponse<TData>;

  if (json.errors?.length) {
    const messages = json.errors.map((e) => e.message).join('; ');
    throw new Error(`Shopify GraphQL errors: ${messages}`);
  }

  return json;
}

// Helper to determine whether we have a real token and should hit live API
function hasLiveCredentials(): boolean {
  return Boolean(STOREFRONT_ACCESS_TOKEN && STOREFRONT_ACCESS_TOKEN.trim() !== '');
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(options?: {
  first?: number;
  after?: string;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  if (!hasLiveCredentials()) {
    return getMockProducts();
  }

  try {
    const { data } = await shopifyFetch<GetProductsResponse>({
      query: GET_PRODUCTS_QUERY,
      variables: {
        first: options?.first ?? 20,
        after: options?.after,
        query: options?.query,
        sortKey: options?.sortKey,
        reverse: options?.reverse,
      },
      tags: ['products'],
    });

    return data.products.nodes ?? data.products.edges.map((e) => e.node);
  } catch (error) {
    console.warn('[shopify] getProducts fell back to mock data:', (error as Error).message);
    return getMockProducts();
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!hasLiveCredentials()) {
    return getMockProduct(handle);
  }

  try {
    const { data } = await shopifyFetch<GetProductResponse>({
      query: GET_PRODUCT_QUERY,
      variables: { handle },
      tags: [`product-${handle}`],
    });

    return data.productByHandle ?? null;
  } catch (error) {
    console.warn(`[shopify] getProduct(${handle}) fell back to mock data:`, (error as Error).message);
    return getMockProduct(handle);
  }
}

// ─── Collections ──────────────────────────────────────────────────────────────

export async function getCollections(options?: {
  first?: number;
  after?: string;
}): Promise<Collection[]> {
  if (!hasLiveCredentials()) {
    return getMockCollections();
  }

  try {
    const { data } = await shopifyFetch<GetCollectionsResponse>({
      query: GET_COLLECTIONS_QUERY,
      variables: {
        first: options?.first ?? 20,
        after: options?.after,
      },
      tags: ['collections'],
    });

    return data.collections.nodes ?? data.collections.edges.map((e) => e.node);
  } catch (error) {
    console.warn('[shopify] getCollections fell back to mock data:', (error as Error).message);
    return getMockCollections();
  }
}

export async function getCollection(
  handle: string,
  options?: {
    first?: number;
    after?: string;
    sortKey?: string;
    reverse?: boolean;
  }
): Promise<Collection | null> {
  if (!hasLiveCredentials()) {
    return getMockCollection(handle);
  }

  try {
    const { data } = await shopifyFetch<GetCollectionResponse>({
      query: GET_COLLECTION_QUERY,
      variables: {
        handle,
        first: options?.first ?? 20,
        after: options?.after,
        sortKey: options?.sortKey,
        reverse: options?.reverse,
      },
      tags: [`collection-${handle}`],
    });

    return data.collectionByHandle ?? null;
  } catch (error) {
    console.warn(`[shopify] getCollection(${handle}) fell back to mock data:`, (error as Error).message);
    return getMockCollection(handle);
  }
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function createCart(
  lines: CartLineInput[] = []
): Promise<Cart> {
  const { data } = await shopifyFetch<CreateCartResponse>({
    query: CREATE_CART_MUTATION,
    variables: { input: { lines } },
    cache: 'no-store',
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(
      data.cartCreate.userErrors.map((e) => e.message).join('; ')
    );
  }

  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  lines: CartLineInput[]
): Promise<Cart> {
  const { data } = await shopifyFetch<AddToCartResponse>({
    query: ADD_TO_CART_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(
      data.cartLinesAdd.userErrors.map((e) => e.message).join('; ')
    );
  }

  return data.cartLinesAdd.cart;
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const { data } = await shopifyFetch<RemoveFromCartResponse>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: { cartId, lineIds },
    cache: 'no-store',
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(
      data.cartLinesRemove.userErrors.map((e) => e.message).join('; ')
    );
  }

  return data.cartLinesRemove.cart;
}

export async function updateCartQuantity(
  cartId: string,
  lines: CartLineUpdateInput[]
): Promise<Cart> {
  const { data } = await shopifyFetch<UpdateCartLineResponse>({
    query: UPDATE_CART_LINE_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(
      data.cartLinesUpdate.userErrors.map((e) => e.message).join('; ')
    );
  }

  return data.cartLinesUpdate.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const { data } = await shopifyFetch<GetCartResponse>({
      query: GET_CART_QUERY,
      variables: { cartId },
      cache: 'no-store',
    });

    return data.cart ?? null;
  } catch (error) {
    console.warn('[shopify] getCart error:', (error as Error).message);
    return null;
  }
}

// ─── Type augment for Next.js fetch ──────────────────────────────────────────

type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};
