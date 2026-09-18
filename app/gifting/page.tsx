import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import RevealUp from '@/components/ui/RevealUp';
import { getCatalogueProducts } from '@/lib/shopify/products';

export const metadata: Metadata = {
  title: 'Gifting | Considered Gestures & Curated Boxes',
  description:
    'Thoughtful gifts, beautifully lit. Curated candle sets, gift-ready rigid boxes, and custom corporate gifting for occasions that deserve more than an ordinary hamper.',
};

export default function GiftingPage() {
  const giftingProducts = getCatalogueProducts('gifting');
  const primaryGiftSets = giftingProducts.filter((p) => p.slug !== 'custom-corporate-gifting');

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--c-ink)', paddingBlock: 'clamp(5rem,10vw,9rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.28 }}>
          <Image
            src="/images/gifting/gift-ritual-collection.jpg"
            alt="Lantern gift boxes presentation"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="container container--narrow" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <RevealUp>
            <span className="section-label section-label--light" style={{ display: 'block' }}>
              Considered Gestures
            </span>
            <h1
              style={{
                fontFamily: 'var(--f-serif)',
                fontSize: 'clamp(2.5rem,6vw,5.25rem)',
                fontWeight: 400,
                color: 'var(--c-ivory)',
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
                marginTop: '1rem',
              }}
            >
              Thoughtful gifts,<br />
              <em style={{ fontStyle: 'italic', color: 'var(--c-amber-glow)' }}>beautifully lit.</em>
            </h1>
            <p
              style={{
                color: 'rgba(246,241,230,0.72)',
                fontSize: 'var(--t-base)',
                lineHeight: 1.85,
                marginTop: '1.5rem',
                maxWidth: 520,
                marginInline: 'auto',
              }}
            >
              Curated candle sets with bespoke packaging and a personal note written by hand.
              For birthdays, milestone celebrations, homecomings, and corporate relationships that deserve more than an ordinary hamper.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <a href="#gift-sets" className="btn btn--light">
                Explore Gift Sets
              </a>
              <a href="#corporate" className="btn btn--outline" style={{ borderColor: 'rgba(246,241,230,0.3)', color: 'var(--c-ivory)' }}>
                Corporate Gifting
              </a>
            </div>
          </RevealUp>
        </div>
      </section>

      {/* Gift Sets Grid */}
      <section id="gift-sets" className="section" style={{ background: 'var(--c-ivory)' }}>
        <div className="container">
          <RevealUp>
            <div style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'clamp(2.5rem,5vw,4.5rem)' }}>
              <span className="section-label">Curated Sets</span>
              <h2 className="section-title">Pre-curated and gift-ready.</h2>
              <p style={{ fontSize: 'var(--t-base)', color: 'var(--c-charcoal)', lineHeight: 1.8, marginTop: '0.75rem' }}>
                Every set is hand-assembled in our heavy rigid boxes, tied with cotton grosgrain ribbon, and accompanied by an archival note card.
              </p>
            </div>
          </RevealUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {primaryGiftSets.map((set, i) => (
              <RevealUp key={set.id} delay={i * 0.08}>
                <div
                  style={{
                    border: '1px solid var(--c-border-light)',
                    background: 'var(--c-white)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    position: 'relative',
                    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  }}
                >
                  <Link href={`/products/${set.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--c-cream)' }}>
                      <Image
                        src={set.images.primary}
                        alt={set.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover', transition: 'transform 0.8s ease' }}
                      />
                      <div className="product-card-badges">
                        {set.bestseller && <span className="product-badge product-badge--bestseller">Most Popular</span>}
                        {set.isConcept && <span className="product-badge product-badge--concept">Concept · Coming Soon</span>}
                      </div>
                    </div>

                    <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-cognac)' }}>
                        {set.size}
                      </span>
                      <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-xl)', color: 'var(--c-ink)', fontWeight: 400 }}>
                        {set.name}
                      </h3>
                      <p style={{ fontSize: 'var(--t-sm)', color: 'var(--c-charcoal)', lineHeight: 1.8, flex: 1 }}>
                        {set.shortDescription}
                      </p>

                      {set.safetyWarning && (
                        <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-charcoal)', opacity: 0.75, margin: '0.25rem 0' }}>
                          Notice: {set.safetyWarning}
                        </p>
                      )}

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <span style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-2xl)', color: 'var(--c-ink)' }}>
                          ₹{set.price.toLocaleString('en-IN')}
                        </span>
                        {set.compareAtPrice && (
                          <span style={{ fontFamily: 'var(--f-sans)', fontSize: 'var(--t-sm)', color: 'var(--c-muted)', textDecoration: 'line-through' }}>
                            ₹{set.compareAtPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <div style={{ marginTop: '1rem' }}>
                        <span className={`btn btn--full btn--sm ${set.isConcept ? 'btn--outline' : 'btn--primary'}`}>
                          {set.isConcept ? 'Coming Soon · View Details' : 'View Gift Set'}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging & Service Standards */}
      <section style={{ background: 'var(--c-cream)', padding: 'clamp(4rem,8vw,7rem) var(--gutter)' }}>
        <div className="container">
          <RevealUp>
            <div style={{ textAlign: 'center', maxWidth: 600, marginInline: 'auto', marginBottom: 'clamp(2.5rem,5vw,4.5rem)' }}>
              <span className="section-label">The Lantern Promise</span>
              <h2 className="section-title">Designed to be unboxed.</h2>
              <p style={{ fontSize: 'var(--t-base)', color: 'var(--c-charcoal)', lineHeight: 1.8, marginTop: '0.75rem' }}>
                We obsess over the presentation as much as the pour. Every touchpoint is made to feel quiet, substantial, and memorable.
              </p>
            </div>
          </RevealUp>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
            {[
              {
                num: '01',
                title: 'Bespoke Rigid Box',
                body: 'Every gift set arrives in a heavyweight cloth-lined slide box with custom die-cut compartments. Zero plastic packaging, no generic bubble envelopes.',
              },
              {
                num: '02',
                title: 'Handwritten Calligraphy Card',
                body: 'Add your custom gift note at checkout. We write each card by hand in archival ink on heavy textured cotton stock at no extra charge.',
              },
              {
                num: '03',
                title: 'Express Dispatch',
                body: 'Gift orders placed before 12 PM ship the very same day. Packed in reinforced shipping sleeves so the presentation box arrives pristine.',
              },
              {
                num: '04',
                title: 'Complimentary Shipping',
                body: 'All gift boxes ship free across India. Tracking updates delivered directly via WhatsApp and email the moment the seal is stamped.',
              },
            ].map((item, i) => (
              <RevealUp key={item.title} delay={i * 0.08}>
                <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.7rem', color: 'var(--c-cognac)', letterSpacing: '0.15em', fontWeight: 600 }}>
                    {item.num}
                  </span>
                  <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-xl)', color: 'var(--c-ink)', margin: '0.6rem 0 0.75rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 'var(--t-sm)', color: 'var(--c-charcoal)', lineHeight: 1.85 }}>
                    {item.body}
                  </p>
                </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Gifting Spotlight */}
      <section id="corporate" className="section" style={{ background: 'var(--c-ink)', color: 'var(--c-ivory)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'center' }}>
            <RevealUp>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', border: '1px solid rgba(246,241,230,0.15)' }}>
                <Image
                  src="/images/gifting/gift-corporate.jpg"
                  alt="Lantern bespoke corporate gift packaging"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </RevealUp>

            <RevealUp delay={0.1}>
              <div>
                <span className="section-label section-label--light">Corporate & Milestone</span>
                <h2
                  style={{
                    fontFamily: 'var(--f-serif)',
                    fontSize: 'clamp(2rem,4vw,3.5rem)',
                    fontWeight: 400,
                    color: 'var(--c-ivory)',
                    lineHeight: 1.15,
                    margin: '1rem 0 1.5rem',
                  }}
                >
                  Gifts that reflect<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--c-amber-glow)' }}>your standard of taste.</em>
                </h2>
                <p style={{ fontSize: 'var(--t-base)', color: 'rgba(246,241,230,0.7)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                  For client appreciation, executive retreats, team milestones, and wedding celebrations. We offer custom foil-stamped ribbons, curated fragrance pairings, personalized notes, and tiered volume pricing starting from 10 units.
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    'Custom metallic foil stamping & monogramming',
                    'Tailored fragrance selection from our Rituals & Aesthetic lines',
                    'Dedicated gifting concierge for address collection & logistics',
                    'Volume pricing tiers for orders of 10 to 500+ units',
                  ].map((feat) => (
                    <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: 'var(--t-sm)', color: 'rgba(246,241,230,0.85)' }}>
                      <span style={{ color: 'var(--c-cognac)', fontSize: '1rem' }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/contact?subject=corporate" className="btn btn--light">
                    Enquire for Corporate
                  </Link>
                  <Link href="/collections/rituals" className="btn btn--outline" style={{ borderColor: 'rgba(246,241,230,0.3)', color: 'var(--c-ivory)' }}>
                    Sample Fragrances
                  </Link>
                </div>
              </div>
            </RevealUp>
          </div>
        </div>
      </section>
    </>
  );
}
