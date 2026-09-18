import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/product/ProductCard';
import RevealUp from '@/components/ui/RevealUp';
import NewsletterForm from '@/components/ui/NewsletterForm';

export const metadata: Metadata = {
  title: 'Lantern — Premium Scented Candles & Lifestyle Objects',
  description: 'Handpoured scented candles, café-inspired aesthetic objects, and curated gift boxes made in India with natural coconut-soy wax.',
};

export default async function HomePage() {
  const products = await getProducts();

  // Curated featured products: 2 Rituals, 1 Aesthetic, 1 Gifting
  const featuredRituals = products.filter((p) => p.category === 'rituals').slice(0, 2);
  const featuredAesthetic = products.filter((p) => p.category === 'aesthetic').slice(0, 1);
  const featuredGifting = products.filter((p) => p.category === 'gifting' && p.handle !== 'custom-corporate-gifting').slice(0, 1);
  const featuredSelection = [...featuredRituals, ...featuredAesthetic, ...featuredGifting];

  // Aesthetic collection products for spotlight
  const aestheticProducts = products.filter((p) => p.category === 'aesthetic').slice(0, 3);

  return (
    <>
      {/* ═══ SECTION 1: HERO ═══ */}
      <section className="hero" aria-label="Lantern Candles Hero">
        <div className="hero-media">
          <Image
            src="/images/hero/hero_candle_flame.jpg"
            alt="Lantern luxury scented candle burning with serene golden flame"
            fill
            priority
            className="hero-img"
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="hero-overlay" aria-hidden="true" />
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow reveal-up">Lantern Scented Candles</p>
            <h1 className="hero-headline reveal-up" style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
              Everyday Moments,<br />
              <em>Brighter.</em>
            </h1>
            <p className="hero-body reveal-up" style={{ '--reveal-delay': '0.2s' } as React.CSSProperties}>
              Premium scents and beautiful objects for the rituals you return to.
            </p>
            <div className="hero-actions reveal-up" style={{ '--reveal-delay': '0.3s' } as React.CSSProperties}>
              <Link href="/collections/all" className="btn btn--light">
                Shop Candles
              </Link>
              <Link href="#collections" className="btn btn--ghost">
                Explore the Collections
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator" aria-hidden="true">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ═══ BRAND STRIP ═══ */}
      <div className="brand-strip">
        <div className="brand-strip-inner">
          <div className="brand-strip-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
            Clean, even burn
          </div>
          <div className="brand-strip-sep" aria-hidden="true" />
          <div className="brand-strip-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M8 12s1.5 2 4 2 4-2 4-2" /></svg>
            100% natural coconut-soy wax
          </div>
          <div className="brand-strip-sep" aria-hidden="true" />
          <div className="brand-strip-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /></svg>
            Fine fragrance-grade oils
          </div>
          <div className="brand-strip-sep" aria-hidden="true" />
          <div className="brand-strip-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            Handpoured in small batches in India
          </div>
        </div>
      </div>

      {/* ═══ SECTION 2: THREE EDITORIAL COLLECTION CARDS ═══ */}
      <section id="collections" className="section" style={{ background: 'var(--c-cream)', paddingBlock: 'clamp(4.5rem,8vw,7.5rem)' }} aria-label="Collections">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 'clamp(2rem,4vw,3.5rem)' }}>
            <div>
              <span className="section-label">The Collections</span>
              <h2 className="section-title">Form, fragrance, and considered gifting.</h2>
            </div>
            <Link href="/collections/all" className="section-link">
              View all candles →
            </Link>
          </div>

          <div className="three-collections-grid">
            {/* 1. Rituals */}
            <RevealUp delay={0}>
              <Link href="/collections/rituals" className="three-collection-card">
                <div className="three-collection-card-media">
                  <Image
                    src="/images/products/spiced-tobacco.jpg"
                    alt="Lantern Rituals Collection"
                    fill
                    sizes="(max-width:860px) 100vw, 33vw"
                    className="three-collection-card-img"
                  />
                </div>
                <div className="three-collection-card-content">
                  <h3 className="three-collection-card-title">Rituals</h3>
                  <p className="three-collection-card-desc">
                    Scents for the little rituals that make life feel brighter.
                  </p>
                  <span className="three-collection-card-cta">Explore Rituals →</span>
                </div>
              </Link>
            </RevealUp>

            {/* 2. Aesthetic */}
            <RevealUp delay={0.08}>
              <Link href="/collections/aesthetic" className="three-collection-card">
                <div className="three-collection-card-media">
                  <Image
                    src="/images/products/matcha-iced-latte.jpg"
                    alt="Lantern Aesthetic Collection"
                    fill
                    sizes="(max-width:860px) 100vw, 33vw"
                    className="three-collection-card-img"
                  />
                </div>
                <div className="three-collection-card-content">
                  <h3 className="three-collection-card-title">Aesthetic</h3>
                  <p className="three-collection-card-desc">
                    Your favourite café rituals, reimagined as objects.
                  </p>
                  <span className="three-collection-card-cta">Explore Aesthetic →</span>
                </div>
              </Link>
            </RevealUp>

            {/* 3. Gifting */}
            <RevealUp delay={0.16}>
              <Link href="/gifting" className="three-collection-card">
                <div className="three-collection-card-media">
                  <Image
                    src="/images/gifting/gift-two-candle.jpg"
                    alt="Lantern Gifting Collection"
                    fill
                    sizes="(max-width:860px) 100vw, 33vw"
                    className="three-collection-card-img"
                  />
                </div>
                <div className="three-collection-card-content">
                  <h3 className="three-collection-card-title">Gifting</h3>
                  <p className="three-collection-card-desc">
                    Thoughtful gifts, beautifully lit.
                  </p>
                  <span className="three-collection-card-cta">Explore Gifting →</span>
                </div>
              </Link>
            </RevealUp>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: FEATURED PRODUCTS ═══ */}
      <section className="section" style={{ background: 'var(--c-ivory)' }} aria-label="Featured candles">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-label">Curated Selection</span>
              <h2 className="section-title">Signature pieces for everyday living.</h2>
            </div>
            <Link href="/collections/all" className="section-link">
              Shop entire catalogue →
            </Link>
          </div>

          <div className="products-grid">
            {featuredSelection.map((product, i) => (
              <RevealUp key={product.id} delay={i * 0.08}>
                <ProductCard product={product} />
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: AESTHETIC SPOTLIGHT ═══ */}
      <section className="section" style={{ background: 'var(--c-cream)', borderTop: '1px solid var(--c-border-light)' }} aria-label="Aesthetic spotlight">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto clamp(2.5rem,5vw,4rem)' }}>
            <RevealUp>
              <span className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>
                Café Collection
              </span>
              <h2 className="section-title" style={{ marginBottom: '1rem' }}>
                Looks like a ritual. Feels like a mood.
              </h2>
              <p style={{ fontSize: 'var(--t-base)', color: 'var(--c-charcoal)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Café-inspired candles designed to bring your favourite little indulgences into your space.
              </p>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--c-ivory)', border: '1px solid var(--c-border)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-ink)', fontWeight: 500 }}>
                Decorative scented candle. Not edible.
              </div>
            </RevealUp>
          </div>

          <div className="products-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {aestheticProducts.map((product, i) => (
              <RevealUp key={product.id} delay={i * 0.1}>
                <ProductCard product={product} />
              </RevealUp>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'clamp(2.5rem,5vw,4rem)' }}>
            <Link href="/collections/aesthetic" className="btn btn--outline">
              Explore Aesthetic
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: GIFTING SPOTLIGHT ═══ */}
      <section className="editorial-split" aria-label="Gifting spotlight">
        <div className="editorial-split-media" style={{ position: 'relative', minHeight: 520 }}>
          <Image
            src="/images/gifting/gift-ritual-collection.jpg"
            alt="Lantern Rituals Collection Grand Gift Box"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="editorial-split-content">
          <div className="editorial-split-inner">
            <RevealUp>
              <span className="section-label">Considered Gifting</span>
              <h2 className="editorial-split-title">
                Give a little <em>light.</em>
              </h2>
            </RevealUp>
            <RevealUp delay={0.1}>
              <p className="editorial-split-body">
                Curated candle sets, gift-ready packaging and personal touches for every occasion. Whether welcoming friends into a new home, celebrating milestones, expressing gratitude, or curating bespoke corporate hospitality gifts.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', margin: '1.5rem 0 2rem' }}>
                {['Birthdays', 'Housewarmings', 'Weddings', 'Corporate Gifting', 'Festive Occasions', 'Personal Gestures'].map((occ) => (
                  <span key={occ} style={{
                    fontSize: 'var(--t-xs)',
                    padding: '0.35rem 0.75rem',
                    background: 'var(--c-ivory)',
                    border: '1px solid var(--c-border)',
                    color: 'var(--c-ink)',
                    letterSpacing: '0.04em',
                  }}>
                    {occ}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/gifting" className="btn btn--primary">
                  Explore Gifting
                </Link>
                <Link href="/contact" className="btn btn--outline">
                  Customise a Gift
                </Link>
              </div>
            </RevealUp>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: BRAND PHILOSOPHY ═══ */}
      <section className="section" style={{ background: 'var(--c-ivory)' }} aria-label="Brand philosophy">
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <RevealUp>
            <span className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>
              Our Philosophy
            </span>
            <h2 className="section-title" style={{ maxWidth: 720, margin: '0 auto 1.5rem', lineHeight: 1.15 }}>
              We believe the everyday deserves a little more intention.
            </h2>
            <p style={{ fontSize: 'clamp(var(--t-base), 1.8vw, var(--t-md))', color: 'var(--c-charcoal)', lineHeight: 1.9, maxWidth: 640, margin: '0 auto' }}>
              From familiar rituals to unexpected objects, Lantern creates scented pieces that make ordinary spaces feel personal. Every batch is handpoured in small quantities across India with natural coconut-soy wax and fine fragrance oils.
            </p>
          </RevealUp>
        </div>
      </section>

      {/* ═══ SECTION 7: NEWSLETTER / COMMUNITY CTA ═══ */}
      <section className="newsletter-section" aria-label="Newsletter signup">
        <div className="newsletter-inner">
          <RevealUp>
            <h2 className="newsletter-title">Stay close to the light.</h2>
            <p className="newsletter-sub">
              New scents, limited collections and thoughtful things worth bringing home.
            </p>
          </RevealUp>
          <RevealUp delay={0.1}>
            <NewsletterForm />
          </RevealUp>
        </div>
      </section>
    </>
  );
}
