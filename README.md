# Lantern — Next.js + Sanity + Shopify

Premium Indian home-fragrance brand. Headless commerce stack: **Next.js 15 (App Router) + Sanity v3 + Shopify Storefront API**, deployed on Vercel.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| CMS | Sanity v3 (embedded Studio at `/studio`) |
| Commerce | Shopify Storefront API (Cart + Checkout) |
| Hosting | Vercel |

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.local.example` to `.env.local` and fill in your values:
```bash
cp .env.local.example .env.local
```

### 3. Shopify — Get Storefront API token
1. Go to [Shopify Admin](https://admin.shopify.com/store/lantern-candles) → Settings → Apps → Develop Apps
2. Create app → Configure Storefront API scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
3. Install app → copy **Storefront API access token**
4. Paste into `.env.local` as `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`

> **Note:** The site runs on mock data until Shopify credentials are added. No errors will occur.

### 4. Sanity — Create a project
```bash
npx sanity@latest init
```
Follow the prompts — log in, create a new project called "Lantern", use dataset `production`.
Copy the Project ID and paste into `.env.local`.

### 5. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Sanity Studio runs at [http://localhost:3000/studio](http://localhost:3000/studio)

## Project Structure

```
app/              → Next.js App Router pages
components/       → React components (layout, cart, product, ui)
lib/
  shopify/        → Storefront API client, queries, types, mock data
  sanity/         → Sanity client, GROQ queries, types
sanity/
  schemaTypes/    → Sanity content schemas
public/
  images/         → Product images
sanity.config.ts  → Sanity Studio configuration
```

## Vercel Deployment

Add these environment variables in Vercel dashboard:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_TOKEN
NEXT_PUBLIC_SITE_URL
```

## Product Images

Current images are in `public/images/`. When Shopify products are live, images will be served from Shopify CDN automatically.

## Adding Products to Shopify

When you create products in Shopify Admin, use these handles:
- `dusk-vetiver`
- `grey-cardamom`
- `white-jasmine`
- `amber-rain`

And create collections with these handles:
- `morning-calm`
- `evening-ritual`
- `monsoon-noir`
- `deep-focus`
- `all` (for showing all products)

## Checkout

Cart is managed in Next.js via React Context. "Proceed to Checkout" redirects users to Shopify's native checkout page, which handles payment, taxes, and shipping.
