import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/shopify/types';
import AddToCartButton from './AddToCartButton';

const PRODUCT_IMAGES: Record<string, { primary: string; hover: string }> = {
  'dusk-vetiver':  { primary: '/images/hero_candle_1788712275307.png',      hover: '/images/product_lifestyle_1788712311819.png' },
  'grey-cardamom': { primary: '/images/product_card_2_1788712370744.png',   hover: '/images/product_card_1_1788712341526.png' },
  'white-jasmine': { primary: '/images/product_card_3_1788712385453.png',   hover: '/images/product_lifestyle_1788712311819.png' },
  'amber-rain':    { primary: '/images/product_card_4_1788713547615.png',   hover: '/images/editorial_interior_1788713535450.png' },
};

const DEFAULT_IMAGES = {
  primary: '/images/hero_candle_1788712275307.png',
  hover: '/images/product_lifestyle_1788712311819.png',
};

function getImages(handle: string) {
  return PRODUCT_IMAGES[handle] ?? DEFAULT_IMAGES;
}

export default function ProductCard({ product }: { product: Product }) {
  const imgs = getImages(product.handle);
  const firstVariant = product.variants?.edges?.[0]?.node ?? product.variants?.nodes?.[0];
  const price = firstVariant?.price?.amount
    ? `₹${Number(firstVariant.price.amount).toLocaleString('en-IN')}`
    : '₹1,850';
  const variantId = firstVariant?.id ?? '';

  // Get short scent tagline from description
  const scent = product.description?.split('.')[0] ?? '';

  return (
    <div className="product-card">
      <Link href={`/products/${product.handle}`} className="product-card-link" aria-label={`${product.title} candle`}>
        <div className="product-card-media">
          <Image
            src={imgs.primary}
            alt={product.title}
            fill
            sizes="(max-width:600px) 50vw, (max-width:1100px) 25vw, 350px"
            className="product-card-img product-card-img--primary"
            style={{ objectFit: 'cover' }}
          />
          <Image
            src={imgs.hover}
            alt=""
            fill
            sizes="(max-width:600px) 50vw, (max-width:1100px) 25vw, 350px"
            className="product-card-img product-card-img--hover"
            style={{ objectFit: 'cover' }}
            aria-hidden
          />
        </div>
        <div className="product-card-info">
          <div>
            <p className="product-card-name">{product.title}</p>
            {scent && <p className="product-card-scent">{scent}</p>}
          </div>
          <p className="product-card-price">{price}</p>
        </div>
      </Link>
      {variantId && (
        <div style={{ marginTop: '0.75rem' }}>
          <AddToCartButton variantId={variantId} productTitle={product.title} available={product.availableForSale} className="btn--full btn--sm" />
        </div>
      )}
    </div>
  );
}
