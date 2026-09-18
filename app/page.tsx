import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/product/ProductCard';
import RevealUp from '@/components/ui/RevealUp';
import NewsletterForm from '@/components/ui/NewsletterForm';

export const metadata: Metadata = {
  title: 'Lantern — Premium Scented Candles',
  description: 'Premium handpoured scented candles made in India. Crafted with natural coconut-soy wax and fine fragrance-grade oils.',
};

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero" aria-label="Hero">
        <div className="hero-media">
          <Image
            src="/images/hero_candle_1788712275307.png"
            alt="Lantern scented candle — atmospheric editorial photograph"
            fill
            priority
            className="hero-img"
            sizes="100vw"
          />
          <div className="hero-overlay" aria-hidden="true" />
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow reveal-up">New Collection</p>
            <h1 className="hero-headline reveal-up" style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
              Monsoon<br /><em>Noir</em>
            </h1>
            <p className="hero-body reveal-up" style={{ '--reveal-delay': '0.2s' } as React.CSSProperties}>
              Dark vetiver. Rain-soaked earth.<br />The scent of a storm before it arrives.
            </p>
            <div className="hero-actions reveal-up" style={{ '--reveal-delay': '0.3s' } as React.CSSProperties}>
              <Link href="/collections/all" className="btn btn--ghost">Explore the Collection</Link>
              <Link href="/story" className="btn btn--ghost" style={{ borderColor: 'transparent', opacity: 0.75 }}>Our Story</Link>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            40–60 hour burn time
          </div>
          <div className="brand-strip-sep" aria-hidden="true" />
          <div className="brand-strip-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12s1.5 2 4 2 4-2 4-2"/></svg>
            100% natural coconut-soy wax
          </div>
          <div className="brand-strip-sep" aria-hidden="true" />
          <div className="brand-strip-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/></svg>
            Fine fragrance-grade oils
          </div>
          <div className="brand-strip-sep" aria-hidden="true" />
          <div className="brand-strip-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Handpoured in India
          </div>
        </div>
      </div>

      {/* ═══ BEST SELLERS ═══ */}
      <section className="section" style={{ background: 'var(--c-ivory)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-label">Best Sellers</span>
              <h2 className="section-title">Favourites, for a reason.</h2>
            </div>
            <Link href="/collections/all" className="section-link">View all candles →</Link>
          </div>
          <div className="products-grid">
            {products.slice(0, 4).map((product, i) => (
              <RevealUp key={product.id} delay={i * 0.08}>
                <ProductCard product={product} />
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EDITORIAL SPLIT ═══ */}
      <section className="editorial-split" aria-label="Our craft">
        <div className="editorial-split-media">
          <Image
            src="/images/editorial_interior_1788713535450.png"
            alt="Lantern candle in a serene interior setting"
            fill
            className="editorial-split-img"
            sizes="50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="editorial-split-content">
          <div className="editorial-split-inner">
            <RevealUp>
              <span className="section-label">On craft</span>
              <h2 className="editorial-split-title">
                Every candle begins<br />with a moment of <em>quiet.</em>
              </h2>
            </RevealUp>
            <RevealUp delay={0.1}>
              <p className="editorial-split-body">
                We source our fragrance oils from the same houses that supply luxury perfumeries in Grasse and Dubai. Every pour is calibrated by hand for scent throw, burn geometry, and longevity.
              </p>
              <p className="editorial-split-body">
                The result is a candle that fills a room without overwhelming it. Present without being loud. Like all the best things.
              </p>
              <Link href="/story" className="btn btn--outline" style={{ marginTop: '1rem' }}>Read Our Story</Link>
            </RevealUp>
          </div>
        </div>
      </section>

      {/* ═══ SCENT PHILOSOPHY ═══ */}
      <section className="section" style={{ background: 'var(--c-cream)' }}>
        <div className="container container--narrow">
          <RevealUp>
            <span className="section-label section-label--default">Our Philosophy</span>
            <h2 className="section-title">The science behind the scent.</h2>
            <p className="scent-intro">
              We approach home fragrance the way a perfumer approaches skin — with precision, restraint, and deep material knowledge. No shortcuts. No synthetic filler.
            </p>
          </RevealUp>
          <div className="scent-pillars">
            {[
              { num: '01', title: 'Raw Materials', body: 'We source exclusively from certified fragrance houses. Each oil is evaluated for purity, throw, and how it interacts with our wax blend before it is accepted.' },
              { num: '02', title: 'Wax Blend', body: 'Our coconut-soy wax blend burns cooler and cleaner than paraffin. It holds fragrance more evenly, resulting in a consistent scent experience from the first to the last burn.' },
              { num: '03', title: 'The Pour', body: 'Every candle is poured at a precise temperature by hand. The wick is centred, the wax is allowed to cure for 48 hours. Nothing is rushed.' },
            ].map((p, i) => (
              <RevealUp key={p.num} delay={i * 0.1}>
                <div>
                  <p className="scent-pillar-number">{p.num}</p>
                  <h3 className="scent-pillar-title">{p.title}</h3>
                  <p className="scent-pillar-body">{p.body}</p>
                </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COLLECTIONS GRID ═══ */}
      <section aria-label="Collections">
        <div className="collections-grid">
          <Link href="/collections/morning-calm" className="collection-card reveal-up">
            <div className="collection-card-media">
              <Image src="/images/product_card_3_1788712385453.png" alt="Morning Calm collection" fill className="collection-card-img" sizes="33vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className="collection-card-content">
              <h3 className="collection-card-title">Morning Calm</h3>
              <p className="collection-card-desc">Soft florals. Green tea. A room that feels like 7am.</p>
              <span className="collection-card-cta">Explore →</span>
            </div>
          </Link>
          <Link href="/collections/evening-ritual" className="collection-card collection-card--tall reveal-up" style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
            <div className="collection-card-media">
              <Image src="/images/product_lifestyle_1788712311819.png" alt="Evening Ritual collection" fill className="collection-card-img" sizes="40vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className="collection-card-content">
              <h3 className="collection-card-title">Evening Ritual</h3>
              <p className="collection-card-desc">Dark, warm and resinous. For the hour after sundown.</p>
              <span className="collection-card-cta">Explore →</span>
            </div>
          </Link>
          <Link href="/collections/monsoon-noir" className="collection-card reveal-up" style={{ '--reveal-delay': '0.2s' } as React.CSSProperties}>
            <div className="collection-card-media">
              <Image src="/images/editorial_interior_1788713535450.png" alt="Monsoon Noir collection" fill className="collection-card-img" sizes="33vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className="collection-card-content">
              <h3 className="collection-card-title">Monsoon Noir</h3>
              <p className="collection-card-desc">Petrichor, dark vetiver, rain-soaked earth. New arrival.</p>
              <span className="collection-card-cta">Explore →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══ GIFTING BANNER ═══ */}
      <section className="gifting-banner" aria-label="Gifting">
        <div className="gifting-banner-inner">
          <div className="gifting-banner-content">
            <RevealUp>
              <span className="section-label section-label--light">Gifting</span>
              <h2 className="gifting-banner-title">The considered gift for people with taste.</h2>
              <p className="gifting-banner-body">
                Curated gift sets, bespoke packaging, and a personal note written by hand. Lantern gifts arrive as an experience. For individuals, for occasions, for corporate relationships that deserve more than a hamper.
              </p>
              <Link href="/gifting" className="btn btn--light">Explore Gift Sets</Link>
            </RevealUp>
          </div>
          <div className="gifting-banner-media">
            <Image src="/images/product_card_1_1788712341526.png" alt="Lantern gift set" fill className="gifting-banner-img" sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="section" style={{ background: 'var(--c-ivory)' }} aria-label="Customer reviews">
        <div className="container">
          <RevealUp>
            <span className="section-label">What people say</span>
          </RevealUp>
          <div className="reviews-grid">
            {[
              { stars: '★★★★★', text: '"I bought the Dusk Vetiver on a whim and it has genuinely changed how I feel when I come home. There\'s a word for this and I think it\'s ritual."', author: 'Priya M.', product: 'Dusk Vetiver, 300g' },
              { stars: '★★★★★', text: '"The packaging alone is enough. But then you light it and the whole room shifts. I have never bought a candle at this price point and felt zero regret."', author: 'Rohan S.', product: 'Grey Cardamom, 300g' },
              { stars: '★★★★★', text: '"We ordered twelve for corporate gifting. Every single recipient replied. That has never happened before. We are reordering next month."', author: 'Meera K.', product: 'White Jasmine Gift Set' },
            ].map((r, i) => (
              <RevealUp key={i} delay={i * 0.08} as="article" className="review-card">
                <p className="review-stars" aria-label="5 out of 5 stars">{r.stars}</p>
                <blockquote className="review-text">{r.text}</blockquote>
                <p className="review-author">{r.author}</p>
                <p className="review-product">{r.product}</p>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCT ═══ */}
      <section className="featured-product" aria-label="Featured product">
        <div className="featured-product-inner">
          <RevealUp className="featured-product-media">
            <Image src="/images/hero_candle_1788712275307.png" alt="Dusk Vetiver candle" fill className="featured-product-img" sizes="50vw" style={{ objectFit: 'cover' }} />
          </RevealUp>
          <div>
            <RevealUp>
              <span className="section-label">Featured</span>
              <h2 className="featured-product-title">Dusk Vetiver</h2>
              <p className="featured-product-tagline">The one people always ask about.</p>
              <div className="scent-notes">
                {[
                  { label: 'Top', value: 'Black Pepper · Smoked Cedar' },
                  { label: 'Heart', value: 'Vetiver · Leather · Fig' },
                  { label: 'Base', value: 'Sandalwood · Dark Musk · Labdanum' },
                ].map(n => (
                  <div key={n.label} className="scent-note">
                    <span className="scent-note-label">{n.label}</span>
                    <span className="scent-note-value">{n.value}</span>
                  </div>
                ))}
              </div>
              <div className="featured-product-details">
                <span>300g</span>
                <span>~55 hr burn</span>
                <span>Coconut-Soy Wax</span>
                <span>Frosted Glass Vessel</span>
              </div>
              <div className="featured-product-actions">
                <span className="featured-product-price">₹1,850</span>
                <Link href="/products/dusk-vetiver" className="btn btn--primary">Shop Now</Link>
                <Link href="/products/dusk-vetiver" className="btn btn--outline">View Details</Link>
              </div>
            </RevealUp>
          </div>
        </div>
      </section>

      {/* ═══ JOURNAL ═══ */}
      <section className="section" style={{ background: 'var(--c-ivory)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-label">Journal</span>
              <h2 className="section-title">From the Lantern archive.</h2>
            </div>
            <Link href="/journal" className="section-link">All articles →</Link>
          </div>
          <div className="journal-grid">
            {[
              { slug: 'how-to-scent-a-room', category: 'At Home', title: 'How to scent a room without overwhelming it', date: 'August 2026', img: '/images/product_lifestyle_1788712311819.png' },
              { slug: 'evening-ritual-guide', category: 'Ritual', title: 'The evening ritual — a guide to decompressing with scent', date: 'July 2026', img: '/images/editorial_interior_1788713535450.png' },
              { slug: 'vetiver-notes', category: 'Ingredients', title: 'Vetiver: the most complex note in modern fragrance', date: 'July 2026', img: '/images/hero_candle_1788712275307.png' },
            ].map((a, i) => (
              <RevealUp key={a.slug} delay={i * 0.1}>
                <Link href={`/journal/${a.slug}`} className="journal-card">
                  <div className="journal-card-media">
                    <Image src={a.img} alt={a.title} fill className="journal-card-img" sizes="(max-width:860px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <p className="journal-card-category">{a.category}</p>
                  <h3 className="journal-card-title">{a.title}</h3>
                  <p className="journal-card-date">{a.date}</p>
                </Link>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <NewsletterSection />
    </>
  );
}

function NewsletterSection() {
  return (
    <section className="newsletter-section" aria-label="Newsletter signup">
      <div className="newsletter-inner">
        <RevealUp>
          <h2 className="newsletter-title">Slow mornings.<br />Quiet evenings.<br />Your inbox.</h2>
          <p className="newsletter-sub">Journal articles, new arrivals, and early access. Nothing you didn&apos;t ask for.</p>
        </RevealUp>
        <RevealUp delay={0.1}>
          <NewsletterForm />
        </RevealUp>
      </div>
    </section>
  );
}

