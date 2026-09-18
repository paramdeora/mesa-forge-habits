'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product, ProductVariant } from '@/lib/shopify/types';
import AddToCartButton from './AddToCartButton';

interface ProductFormProps {
  product: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const variants = product.variants?.edges?.map((e) => e.node) ?? product.variants?.nodes ?? [];
  const rawImages = product.images?.nodes ?? product.images?.edges?.map((e) => e.node) ?? [];
  const images = rawImages.length > 0
    ? rawImages.map((img) => img.url)
    : [product.featuredImage?.url || '/images/hero/hero_candle_flame.jpg'];

  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(variants[0]);
  const [quantity, setQuantity] = useState(1);

  const priceAmount = selectedVariant?.price?.amount
    ? Number(selectedVariant.price.amount)
    : 0;

  const priceFormatted = priceAmount > 0
    ? `₹${priceAmount.toLocaleString('en-IN')}`
    : 'Bespoke Enquiry';

  const compareAtPriceFormatted = selectedVariant?.compareAtPrice?.amount
    ? Number(selectedVariant.compareAtPrice.amount) > 0
      ? `₹${Number(selectedVariant.compareAtPrice.amount).toLocaleString('en-IN')}`
      : null
    : null;

  const isConcept = product.isConcept === true;
  const isCorporate = product.handle === 'custom-corporate-gifting';
  const collectionTitle = product.collections?.edges?.[0]?.node?.title ?? (product.category ? product.category.toUpperCase() : 'CANDLES');

  return (
    <div className="pdp-grid" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(2.5rem,5vw,7rem)',
      alignItems: 'start',
      maxWidth: 'var(--max-w)',
      margin: '0 auto',
      padding: '0 var(--gutter) clamp(4rem,8vw,8rem)',
    }}>
      {/* Gallery */}
      <div>
        <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: 'var(--c-cream)', position: 'relative', borderRadius: '2px' }}>
          <Image
            src={images[activeImg] || images[0]}
            alt={`${product.title} — view ${activeImg + 1}`}
            fill
            sizes="(max-width:860px) 100vw, 50vw"
            style={{ objectFit: 'cover', transition: 'opacity 0.25s ease' }}
            priority
          />
          {isConcept && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: 'var(--c-ink)',
              color: 'var(--c-ivory)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.35rem 0.85rem',
              fontWeight: 500,
              zIndex: 2,
            }}>
              Concept Release · Coming Soon
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
            {images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setActiveImg(i)}
                style={{
                  width: '80px',
                  height: '80px',
                  overflow: 'hidden',
                  border: i === activeImg ? '1.5px solid var(--c-ink)' : '1px solid var(--c-border)',
                  background: 'var(--c-cream)',
                  padding: 0,
                  cursor: 'pointer',
                  position: 'relative',
                  opacity: i === activeImg ? 1 : 0.7,
                  transition: 'opacity 0.2s, border-color 0.2s',
                }}
                aria-label={`View image ${i + 1}`}
                aria-pressed={i === activeImg}
              >
                <Image src={src} alt="" fill style={{ objectFit: 'cover' }} sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 2rem)' }}>
        {/* Collection & Category */}
        <p style={{
          fontFamily: 'var(--f-sans)',
          fontSize: 'var(--t-xs)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--c-cognac)',
          marginBottom: '0.75rem',
          fontWeight: 500,
        }}>
          {collectionTitle}
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--f-serif)',
          fontSize: 'clamp(2.25rem,4vw,3.5rem)',
          fontWeight: 400,
          color: 'var(--c-ink)',
          letterSpacing: '-0.02em',
          lineHeight: 1.08,
          marginBottom: '0.75rem',
        }}>
          {product.title}
        </h1>

        {/* Tagline */}
        {product.tagline && (
          <p style={{
            fontFamily: 'var(--f-serif)',
            fontSize: 'var(--t-lg)',
            fontStyle: 'italic',
            color: 'var(--c-charcoal)',
            marginBottom: '1.25rem',
          }}>
            {product.tagline}
          </p>
        )}

        {/* Pricing */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-2xl)', color: 'var(--c-ink)' }}>
            {priceFormatted}
          </span>
          {compareAtPriceFormatted && (
            <span style={{
              fontFamily: 'var(--f-serif)',
              fontSize: 'var(--t-lg)',
              color: 'var(--c-charcoal)',
              textDecoration: 'line-through',
              opacity: 0.6,
            }}>
              {compareAtPriceFormatted}
            </span>
          )}
        </div>

        {/* Safety Warning for Aesthetic items */}
        {product.safetyWarning && (
          <div style={{
            background: 'var(--c-cream)',
            borderLeft: '3px solid var(--c-cognac)',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            fontSize: 'var(--t-xs)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--c-ink)',
            fontWeight: 500,
          }}>
            Notice: {product.safetyWarning}
          </div>
        )}

        {/* Description */}
        <p style={{ fontSize: 'var(--t-base)', color: 'var(--c-charcoal)', lineHeight: 1.85, marginBottom: '1.75rem' }}>
          {product.description}
        </p>

        {/* Key Specifications Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: '1rem',
          paddingBlock: '1.25rem',
          borderTop: '1px solid var(--c-border)',
          borderBottom: '1px solid var(--c-border)',
          marginBottom: '1.75rem',
        }}>
          <div>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-charcoal)', display: 'block' }}>Size</span>
            <span style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-md)', color: 'var(--c-ink)' }}>{selectedVariant?.title || '100 g'}</span>
          </div>
          {product.burnTime && (
            <div>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-charcoal)', display: 'block' }}>Burn Time</span>
              <span style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-md)', color: 'var(--c-ink)' }}>{product.burnTime}</span>
            </div>
          )}
          {product.materials && (
            <div>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-charcoal)', display: 'block' }}>Wax</span>
              <span style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-md)', color: 'var(--c-ink)' }}>Coconut-Soy</span>
            </div>
          )}
          {product.vessel && (
            <div>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-charcoal)', display: 'block' }}>Vessel</span>
              <span style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-md)', color: 'var(--c-ink)' }}>{product.vessel.split(' ')[0]}</span>
            </div>
          )}
        </div>

        {/* Benefits Tags if available */}
        {product.benefits && product.benefits.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            {product.benefits.map((b) => (
              <span key={b} style={{
                fontSize: 'var(--t-xs)',
                padding: '0.35rem 0.75rem',
                background: 'var(--c-cream)',
                color: 'var(--c-ink)',
                letterSpacing: '0.04em',
                borderRadius: '1px',
              }}>
                {b}
              </span>
            ))}
          </div>
        )}

        {/* Action Button: Coming Soon vs Enquire vs Add to Cart */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {isConcept ? (
            <button
              disabled
              className="btn btn--outline btn--full"
              style={{ opacity: 0.85, cursor: 'not-allowed', background: 'var(--c-cream)', borderColor: 'var(--c-border)' }}
            >
              Coming Soon · Concept Candle
            </button>
          ) : isCorporate ? (
            <Link href="/contact" className="btn btn--primary btn--full" style={{ textAlign: 'center' }}>
              Enquire for Bespoke Orders
            </Link>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
              {/* Quantity selector */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--c-border)',
                background: 'transparent',
              }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '0.5rem 0.9rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--c-ink)' }}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span style={{ minWidth: '24px', textAlign: 'center', fontSize: 'var(--t-sm)' }}>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '0.5rem 0.9rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--c-ink)' }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <AddToCartButton
                variantId={selectedVariant?.id ?? ''}
                productTitle={product.title}
                available={selectedVariant?.availableForSale ?? product.availableForSale}
                quantity={quantity}
                className="btn--full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
