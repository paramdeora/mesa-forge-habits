import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import RevealUp from '@/components/ui/RevealUp';

export const metadata: Metadata = {
  title: 'Gifting',
  description: 'Premium Lantern gift sets, bespoke packaging, and corporate gifting for people and occasions that deserve more.',
};

const GIFT_SETS = [
  {
    title: 'The Signature Duo',
    description: 'Two of our best-selling candles in a cloth-lined gift box with a personal note card. Choose your pair.',
    price: '₹3,200',
    img: '/images/product_card_1_1788712341526.png',
    featured: true,
  },
  {
    title: 'The Morning Ritual',
    description: 'Morning Calm candle (300g) with a brass wick trimmer and a box of matches. Everything for the perfect morning.',
    price: '₹2,600',
    img: '/images/product_card_3_1788712385453.png',
    featured: false,
  },
  {
    title: 'The Full Collection',
    description: 'All four signature candles in our limited-edition collector\'s box. For someone who deserves everything.',
    price: '₹6,800',
    img: '/images/product_card_4_1788713547615.png',
    featured: false,
  },
];

export default function GiftingPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--c-ink)', paddingBlock: 'clamp(5rem,10vw,10rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
          <Image src="/images/product_lifestyle_1788712311819.png" alt="" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="container container--narrow" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <RevealUp>
            <span className="section-label section-label--light" style={{ display: 'block' }}>Gifting</span>
            <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 400, color: 'var(--c-ivory)', letterSpacing: '-0.02em', lineHeight: 1.05, marginTop: '1rem' }}>
              The considered gift<br />for people with taste.
            </h1>
            <p style={{ color: 'rgba(246,241,230,0.65)', fontSize: 'var(--t-base)', lineHeight: 1.85, marginTop: '1.5rem', maxWidth: 480, marginInline: 'auto' }}>
              Curated gift sets with bespoke packaging and a personal note written by hand. For individuals, for occasions, for corporate relationships that deserve more than a hamper.
            </p>
          </RevealUp>
        </div>
      </div>

      {/* Gift Sets */}
      <section className="section" style={{ background: 'var(--c-ivory)' }}>
        <div className="container">
          <RevealUp>
            <span className="section-label">Gift Sets</span>
            <h2 className="section-title" style={{ marginBottom: 'clamp(2rem,4vw,4rem)' }}>Curated for every occasion.</h2>
          </RevealUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '2rem' }}>
            {GIFT_SETS.map((set, i) => (
              <RevealUp key={set.title} delay={i * 0.08}>
                <div style={{
                  border: `1px solid ${set.featured ? 'var(--c-ink)' : 'var(--c-border-light)'}`,
                  background: set.featured ? 'var(--c-ink)' : 'var(--c-white)',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                    <Image src={set.img} alt={set.title} fill style={{ objectFit: 'cover' }} sizes="400px" />
                  </div>
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {set.featured && <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--c-cognac)' }}>Most Popular</span>}
                    <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-xl)', color: set.featured ? 'var(--c-ivory)' : 'var(--c-ink)', fontWeight: 400 }}>{set.title}</h3>
                    <p style={{ fontSize: 'var(--t-sm)', color: set.featured ? 'rgba(246,241,230,0.7)' : 'var(--c-charcoal)', lineHeight: 1.85, flex: 1 }}>{set.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                      <span style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-2xl)', color: set.featured ? 'var(--c-ivory)' : 'var(--c-ink)' }}>{set.price}</span>
                      <Link href="/collections/all" className={`btn btn--sm ${set.featured ? 'btn--light' : 'btn--outline'}`}>Shop Set</Link>
                    </div>
                  </div>
                </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* Gifting Promise */}
      <section style={{ background: 'var(--c-cream)', padding: 'clamp(4rem,8vw,8rem) var(--gutter)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '3rem' }}>
            {[
              { title: 'Bespoke Packaging', body: 'Every gift set is packed by hand in our signature cloth-lined box with a brushed metal closure. No courier bags.' },
              { title: 'Personal Note', body: 'Add a personal message and we will write it by hand on our woven note card. Included at no extra cost.' },
              { title: 'Next-Day Dispatch', body: 'Gift orders placed before 12pm are dispatched the same day. Express delivery available at checkout.' },
              { title: 'Corporate Gifting', body: 'We work with companies on bulk orders with custom branding, curated product selection and dedicated account management.' },
            ].map((item, i) => (
              <RevealUp key={item.title} delay={i * 0.08}>
                <div>
                  <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-xl)', color: 'var(--c-ink)', marginBottom: '0.75rem' }}>{item.title}</h3>
                  <p style={{ fontSize: 'var(--t-sm)', color: 'var(--c-charcoal)', lineHeight: 1.85 }}>{item.body}</p>
                </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Enquiry */}
      <section style={{ background: 'var(--c-ink)', padding: 'clamp(4rem,8vw,8rem) var(--gutter)', textAlign: 'center' }}>
        <RevealUp>
          <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2rem,4vw,3.5rem)', color: 'var(--c-ivory)', fontWeight: 400, marginBottom: '1rem' }}>
            Corporate gifting?
          </h2>
          <p style={{ color: 'rgba(246,241,230,0.55)', fontSize: 'var(--t-base)', lineHeight: 1.85, marginBottom: '2rem', maxWidth: 480, marginInline: 'auto' }}>
            For orders of 10 or more, we offer custom packaging, a dedicated account manager, and pricing that reflects volume. Write to us and we will respond within 24 hours.
          </p>
          <Link href="/contact" className="btn btn--light">Enquire Now</Link>
        </RevealUp>
      </section>
    </>
  );
}
