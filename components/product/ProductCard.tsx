import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/shopify/types';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  const images = product.images?.nodes ?? product.images?.edges?.map((e) => e.node) ?? [];
  const primaryImageUrl = product.featuredImage?.url || images[0]?.url || '/images/hero/hero_candle_flame.jpg';
  const hoverImageUrl = images[1]?.url || primaryImageUrl;

  const firstVariant = product.variants?.edges?.[0]?.node ?? product.variants?.nodes?.[0];
  const price = firstVariant?.price?.amount
    ? Number(firstVariant.price.amount) > 0
      ? `₹${Number(firstVariant.price.amount).toLocaleString('en-IN')}`
      : 'Bespoke Enquiry'
    : '₹999';

  const compareAtPrice = firstVariant?.compareAtPrice?.amount
    ? Number(firstVariant.compareAtPrice.amount) > 0
      ? `₹${Number(firstVariant.compareAtPrice.amount).toLocaleString('en-IN')}`
      : null
    : null;

  const variantId = firstVariant?.id ?? '';
  const collectionName = product.collections?.edges?.[0]?.node?.title ?? (product.category ? product.category.toUpperCase() : 'CANDLES');

  // Subtitle / scent tagline
  const descriptor = product.tagline || product.description?.split('.')[0] || '';

  const isConcept = product.isConcept === true;
  const isCorporate = product.handle === 'custom-corporate-gifting';

  return (
    <div className={`product-card ${isConcept ? 'product-card--concept' : ''}`}>
      <Link href={`/products/${product.handle}`} className="product-card-link" aria-label={`${product.title}`}>
        <div className="product-card-media">
          <Image
            src={primaryImageUrl}
            alt={product.title}
            fill
            sizes="(max-width:600px) 50vw, (max-width:1100px) 33vw, 380px"
            className="product-card-img product-card-img--primary"
            style={{ objectFit: 'cover' }}
          />
          {hoverImageUrl && hoverImageUrl !== primaryImageUrl && (
            <Image
              src={hoverImageUrl}
              alt=""
              fill
              sizes="(max-width:600px) 50vw, (max-width:1100px) 33vw, 380px"
              className="product-card-img product-card-img--hover"
              style={{ objectFit: 'cover' }}
              aria-hidden
            />
          )}

          {/* Badge for concept / coming soon or category */}
          <div className="product-card-badges">
            {isConcept && (
              <span className="product-badge product-badge--concept">Coming Soon</span>
            )}
            {!isConcept && product.tags?.includes('bestseller') && (
              <span className="product-badge product-badge--bestseller">Bestseller</span>
            )}
            {product.category === 'aesthetic' && !isConcept && (
              <span className="product-badge product-badge--aesthetic">Aesthetic</span>
            )}
          </div>
        </div>

        <div className="product-card-info">
          <div>
            <span className="product-card-collection">{collectionName}</span>
            <p className="product-card-name">{product.title}</p>
            {descriptor && <p className="product-card-scent">{descriptor}</p>}
          </div>

          <div className="product-card-pricing">
            <span className="product-card-price">{price}</span>
            {compareAtPrice && (
              <span className="product-card-compare-price">{compareAtPrice}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Action button */}
      <div className="product-card-action">
        {isConcept ? (
          <Link href={`/products/${product.handle}`} className="btn btn--outline btn--full btn--sm">
            Coming Soon · View Details
          </Link>
        ) : isCorporate ? (
          <Link href="/contact" className="btn btn--primary btn--full btn--sm">
            Enquire for Gifting
          </Link>
        ) : (
          <AddToCartButton
            variantId={variantId}
            productTitle={product.title}
            available={product.availableForSale}
            className="btn--full btn--sm"
          />
        )}
      </div>
    </div>
  );
}
