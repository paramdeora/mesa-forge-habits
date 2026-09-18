'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product, ProductVariant } from '@/lib/shopify/types';
import AddToCartButton from './AddToCartButton';

const PRODUCT_IMAGES: Record<string, string[]> = {
  'dusk-vetiver':  ['/images/hero_candle_1788712275307.png', '/images/product_card_1_1788712341526.png', '/images/product_lifestyle_1788712311819.png', '/images/editorial_interior_1788713535450.png'],
  'grey-cardamom': ['/images/product_card_2_1788712370744.png', '/images/product_lifestyle_1788712311819.png', '/images/editorial_interior_1788713535450.png'],
  'white-jasmine': ['/images/product_card_3_1788712385453.png', '/images/product_lifestyle_1788712311819.png', '/images/hero_candle_1788712275307.png'],
  'amber-rain':    ['/images/product_card_4_1788713547615.png', '/images/editorial_interior_1788713535450.png', '/images/product_lifestyle_1788712311819.png'],
};

const DEFAULT_IMAGES = ['/images/hero_candle_1788712275307.png', '/images/product_card_1_1788712341526.png', '/images/product_lifestyle_1788712311819.png'];

interface ProductFormProps {
  product: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const variants = product.variants?.edges?.map(e => e.node) ?? product.variants?.nodes ?? [];
  const images = PRODUCT_IMAGES[product.handle] ?? DEFAULT_IMAGES;

  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(variants[0]);

  const price = selectedVariant?.price?.amount
    ? `₹${Number(selectedVariant.price.amount).toLocaleString('en-IN')}`
    : '₹1,850';

  const handleThumbClick = (index: number) => {
    setActiveImg(index);
  };

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
        <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: 'var(--c-cream)', position: 'relative', cursor: 'zoom-in' }}>
          <Image
            src={images[activeImg]}
            alt={`${product.title} — view ${activeImg + 1}`}
            fill
            sizes="(max-width:860px) 100vw, 50vw"
            style={{ objectFit: 'cover', transition: 'opacity 0.2s ease' }}
            priority
          />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => handleThumbClick(i)}
              style={{
                flex: 1,
                aspectRatio: '1',
                overflow: 'hidden',
                border: i === activeImg ? '1px solid var(--c-ink)' : '1px solid transparent',
                background: 'var(--c-cream)',
                padding: 0,
                cursor: 'pointer',
                position: 'relative',
              }}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === activeImg}
            >
              <Image src={src} alt="" fill style={{ objectFit: 'cover' }} sizes="100px" />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 2rem)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--c-border-light)' }}>
          <div style={{ color: 'var(--c-cognac)', letterSpacing: '0.1em' }} aria-label="5 out of 5 stars">★★★★★</div>
          <span style={{ fontSize: 'var(--t-xs)', color: 'var(--c-charcoal)' }}>147 reviews</span>
        </div>
        <div style={{ height: '1.5rem' }} />
        <p style={{ fontFamily: 'var(--f-sans)', fontSize: 'var(--t-xs)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-charcoal)', marginBottom: '1rem' }}>
          {product.collections?.edges?.[0]?.node?.title ?? 'Signature Collection'}
        </p>
        <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2.25rem,4vw,3.75rem)', fontWeight: 400, color: 'var(--c-ink)', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '0.75rem' }}>
          {product.title}
        </h1>
        <p style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-lg)', fontStyle: 'italic', color: 'var(--c-charcoal)', marginBottom: '1.5rem' }}>
          {product.description?.split('.')[0]}.
        </p>
        <p style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-2xl)', color: 'var(--c-ink)', marginBottom: '1.5rem' }}>
          {price}
        </p>
        <div style={{ height: '1px', background: 'var(--c-border)', margin: '1.5rem 0' }} />

        {/* Specs */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', paddingBlock: '1.25rem', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)', marginBottom: '1.5rem' }}>
          {[
            { label: 'Size', value: selectedVariant?.title ?? '300g' },
            { label: 'Burn Time', value: '~55 hours' },
            { label: 'Wax', value: 'Coconut-Soy' },
            { label: 'Vessel', value: 'Frosted Glass' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: 'var(--t-xs)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--c-charcoal)' }}>{s.label}</span>
              <span style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-md)', color: 'var(--c-ink)' }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Variant selector */}
        {variants.length > 1 && (
          <>
            <span className="pdp-label" style={{ fontFamily: 'var(--f-sans)', fontSize: 'var(--t-xs)', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-charcoal)', marginBottom: '0.75rem', display: 'block' }}>Choose Size</span>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {variants.map(variant => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  aria-pressed={selectedVariant?.id === variant.id}
                  style={{
                    padding: '0.75rem 1.25rem',
                    border: `1px solid ${selectedVariant?.id === variant.id ? 'var(--c-ink)' : 'var(--c-border)'}`,
                    background: selectedVariant?.id === variant.id ? 'var(--c-ink)' : 'transparent',
                    color: selectedVariant?.id === variant.id ? 'var(--c-ivory)' : 'var(--c-charcoal)',
                    fontFamily: 'var(--f-sans)',
                    fontSize: 'var(--t-xs)',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                  }}
                >
                  {variant.title} · ₹{Number(variant.price.amount).toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ATC */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <AddToCartButton
            variantId={selectedVariant?.id ?? ''}
            productTitle={product.title}
            available={selectedVariant?.availableForSale ?? product.availableForSale}
            className="btn--full"
          />
          <button className="btn btn--outline" aria-label="Add to wishlist" style={{ flexShrink: 0, padding: '0 1rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
