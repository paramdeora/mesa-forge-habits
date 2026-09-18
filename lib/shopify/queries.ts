// ─── Fragment Definitions ─────────────────────────────────────────────────────

export const IMAGE_FRAGMENT = /* GraphQL */ `
  fragment ImageFields on Image {
    id
    url
    altText
    width
    height
  }
`;

export const MONEY_FRAGMENT = /* GraphQL */ `
  fragment MoneyFields on MoneyV2 {
    amount
    currencyCode
  }
`;

export const SEO_FRAGMENT = /* GraphQL */ `
  fragment SEOFields on SEO {
    title
    description
  }
`;

export const PRODUCT_VARIANT_FRAGMENT = /* GraphQL */ `
  fragment ProductVariantFields on ProductVariant {
    id
    title
    availableForSale
    sku
    barcode
    weight
    weightUnit
    quantityAvailable
    selectedOptions {
      name
      value
    }
    price {
      ...MoneyFields
    }
    compareAtPrice {
      ...MoneyFields
    }
    image {
      ...ImageFields
    }
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

export const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    productType
    vendor
    tags
    createdAt
    updatedAt
    publishedAt
    options {
      id
      name
      values
    }
    priceRange {
      minVariantPrice { ...MoneyFields }
      maxVariantPrice { ...MoneyFields }
    }
    compareAtPriceRange {
      minVariantPrice { ...MoneyFields }
      maxVariantPrice { ...MoneyFields }
    }
    featuredImage {
      ...ImageFields
    }
    images(first: 20) {
      nodes {
        ...ImageFields
      }
      edges {
        node {
          ...ImageFields
        }
      }
    }
    variants(first: 100) {
      nodes {
        ...ProductVariantFields
      }
      edges {
        node {
          ...ProductVariantFields
        }
      }
    }
    seo {
      ...SEOFields
    }
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${SEO_FRAGMENT}
`;

export const COLLECTION_FRAGMENT = /* GraphQL */ `
  fragment CollectionFields on Collection {
    id
    handle
    title
    description
    descriptionHtml
    updatedAt
    image {
      ...ImageFields
    }
    seo {
      ...SEOFields
    }
  }
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
`;

export const CART_LINE_FRAGMENT = /* GraphQL */ `
  fragment CartLineFields on CartLine {
    id
    quantity
    attributes {
      key
      value
    }
    cost {
      totalAmount { ...MoneyFields }
      amountPerQuantity { ...MoneyFields }
      compareAtAmountPerQuantity { ...MoneyFields }
      subtotalAmount { ...MoneyFields }
    }
    estimatedCost {
      totalAmount { ...MoneyFields }
      subtotalAmount { ...MoneyFields }
    }
    merchandise {
      ... on ProductVariant {
        id
        title
        availableForSale
        selectedOptions { name value }
        sku
        price { ...MoneyFields }
        compareAtPrice { ...MoneyFields }
        image { ...ImageFields }
        product {
          id
          handle
          title
          featuredImage { ...ImageFields }
          priceRange {
            minVariantPrice { ...MoneyFields }
            maxVariantPrice { ...MoneyFields }
          }
        }
      }
    }
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

export const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    createdAt
    updatedAt
    totalQuantity
    note
    attributes { key value }
    discountCodes { applicable code }
    cost {
      subtotalAmount { ...MoneyFields }
      totalAmount { ...MoneyFields }
      totalTaxAmount { ...MoneyFields }
      totalDutyAmount { ...MoneyFields }
      checkoutChargeAmount { ...MoneyFields }
    }
    buyerIdentity {
      email
      phone
      countryCode
    }
    lines(first: 100) {
      nodes {
        ...CartLineFields
      }
      edges {
        cursor
        node {
          ...CartLineFields
        }
      }
    }
  }
  ${MONEY_FRAGMENT}
  ${CART_LINE_FRAGMENT}
`;

// ─── Product Queries ──────────────────────────────────────────────────────────

export const GET_PRODUCTS_QUERY = /* GraphQL */ `
  query getProducts($first: Int = 20, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...ProductFields
        }
      }
      nodes {
        ...ProductFields
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_QUERY = /* GraphQL */ `
  query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      ...ProductFields
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// ─── Collection Queries ───────────────────────────────────────────────────────

export const GET_COLLECTIONS_QUERY = /* GraphQL */ `
  query getCollections($first: Int = 20, $after: String) {
    collections(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...CollectionFields
        }
      }
      nodes {
        ...CollectionFields
      }
    }
  }
  ${COLLECTION_FRAGMENT}
`;

export const GET_COLLECTION_QUERY = /* GraphQL */ `
  query getCollection($handle: String!, $first: Int = 20, $after: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collectionByHandle(handle: $handle) {
      ...CollectionFields
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            ...ProductFields
          }
        }
        nodes {
          ...ProductFields
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
  ${PRODUCT_FRAGMENT}
`;

// ─── Cart Mutations ───────────────────────────────────────────────────────────

export const CREATE_CART_MUTATION = /* GraphQL */ `
  mutation createCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const ADD_TO_CART_MUTATION = /* GraphQL */ `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const REMOVE_FROM_CART_MUTATION = /* GraphQL */ `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const UPDATE_CART_LINE_MUTATION = /* GraphQL */ `
  mutation updateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const GET_CART_QUERY = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
  ${CART_FRAGMENT}
`;
