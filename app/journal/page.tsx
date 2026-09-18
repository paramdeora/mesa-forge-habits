import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import RevealUp from '@/components/ui/RevealUp';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'On scent, ritual, ingredients, and the art of creating atmosphere at home.',
};

const ARTICLES = [
  { slug: 'how-to-scent-a-room', category: 'At Home', title: 'How to scent a room without overwhelming it', excerpt: 'The difference between a scented room and a suffocating one is almost always restraint. Here is how we think about it.', date: 'August 2026', img: '/images/product_lifestyle_1788712311819.png' },
  { slug: 'evening-ritual-guide', category: 'Ritual', title: 'The evening ritual — a guide to decompressing with scent', excerpt: 'What happens when you treat the end of your workday as a sensory threshold, not just a time on a clock.', date: 'July 2026', img: '/images/editorial_interior_1788713535450.png' },
  { slug: 'vetiver-notes', category: 'Ingredients', title: 'Vetiver: the most complex note in modern fragrance', excerpt: 'A deep dive into the ingredient that defines our Evening Ritual collection — and why it is so difficult to do well.', date: 'July 2026', img: '/images/hero_candle_1788712275307.png' },
  { slug: 'candle-gifting-guide', category: 'Gifting', title: 'The complete guide to gifting a candle', excerpt: 'Why a candle is one of the most considered gifts you can give — and how to choose the right one.', date: 'June 2026', img: '/images/product_card_1_1788712341526.png' },
  { slug: 'coconut-soy-wax', category: 'Ingredients', title: 'Why we use coconut-soy wax, and why it matters', excerpt: 'The chemistry of clean-burning wax, explained simply. And why most candle brands still haven\'t made the switch.', date: 'June 2026', img: '/images/product_card_2_1788712370744.png' },
  { slug: 'monsoon-noir-story', category: 'Behind the Brand', title: 'Behind the collection: Monsoon Noir', excerpt: 'The inspiration, the materials, and the six months it took to capture the smell of rain on hot stone.', date: 'May 2026', img: '/images/product_card_4_1788713547615.png' },
];

export default function JournalPage() {
  const [featured, ...rest] = ARTICLES;
  return (
    <>
      {/* Header */}
      <div style={{ background: 'var(--c-cream)', paddingBlock: 'clamp(3rem,6vw,6rem)', borderBottom: '1px solid var(--c-border-light)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <RevealUp>
            <span className="section-label" style={{ display: 'block' }}>Journal</span>
            <h1 className="section-title">On scent, ritual,<br />and the art of atmosphere.</h1>
          </RevealUp>
        </div>
      </div>

      {/* Featured */}
      <section className="section" style={{ background: 'var(--c-ivory)' }}>
        <div className="container">
          <RevealUp>
            <Link href={`/journal/${featured.slug}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,5vw,6rem)', alignItems: 'center', textDecoration: 'none' }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--c-cream)' }}>
                <Image src={featured.img} alt={featured.title} fill style={{ objectFit: 'cover', transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)' }} sizes="50vw" />
              </div>
              <div>
                <span className="section-label" style={{ color: 'var(--c-cognac)' }}>{featured.category}</span>
                <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.75rem,3vw,3.5rem)', fontWeight: 400, color: 'var(--c-ink)', lineHeight: 1.15, margin: '1rem 0' }}>{featured.title}</h2>
                <p style={{ fontSize: 'var(--t-base)', color: 'var(--c-charcoal)', lineHeight: 1.85, marginBottom: '1.5rem' }}>{featured.excerpt}</p>
                <span className="section-link" style={{ margin: 0, display: 'inline-block' }}>Read article →</span>
              </div>
            </Link>
          </RevealUp>
        </div>
      </section>

      {/* Grid */}
      <section className="section" style={{ background: 'var(--c-cream)' }}>
        <div className="container">
          <div className="journal-grid">
            {rest.map((a, i) => (
              <RevealUp key={a.slug} delay={i * 0.08}>
                <Link href={`/journal/${a.slug}`} className="journal-card">
                  <div className="journal-card-media" style={{ position: 'relative' }}>
                    <Image src={a.img} alt={a.title} fill className="journal-card-img" sizes="33vw" style={{ objectFit: 'cover' }} />
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
    </>
  );
}
