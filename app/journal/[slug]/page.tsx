import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RevealUp from '@/components/ui/RevealUp';

export const ARTICLES = [
  {
    slug: 'how-to-scent-a-room',
    category: 'At Home',
    title: 'How to scent a room without overwhelming it',
    excerpt: 'The difference between a scented room and a suffocating one is almost always restraint. Here is how we think about it.',
    date: 'August 2026',
    readTime: '4 min read',
    author: 'Lantern Studio',
    img: '/images/product_lifestyle_1788712311819.png',
    content: [
      'The difference between a scented room and a suffocating one is almost always restraint. When scent is done with intention, it settles into the background of a space like warm afternoon light—perceptible, calming, but never demanding to be the center of attention.',
      'Most people make the mistake of choosing candles with synthetic throw boosters designed to announce themselves immediately. A high-grade fragrance oil suspended in coconut-soy wax behaves differently: it gently warms, expanding at the pace of your breathing.',
      'Place your candle slightly away from heavy drafts or ceiling fans. Air currents push fragrance toward the edges of a room rather than letting the scent pool naturally. For larger living spaces, two smaller candles burning in opposite corners create a far more harmonious atmosphere than one overpoweringly large jar.',
      'Finally, always respect the melt pool. On the first burn, allow the wax to liquefy completely to the vessel rim. This ensures an even, tunnel-free journey for the entire life of your candle.'
    ],
  },
  {
    slug: 'evening-ritual-guide',
    category: 'Ritual',
    title: 'The evening ritual — a guide to decompressing with scent',
    excerpt: 'What happens when you treat the end of your workday as a sensory threshold, not just a time on a clock.',
    date: 'July 2026',
    readTime: '5 min read',
    author: 'Lantern Studio',
    img: '/images/editorial_interior_1788713535450.png',
    content: [
      'What happens when you treat the end of your workday as a sensory threshold, not just a time on a clock? For urban professionals, modern evenings often bleed imperceptibly from answering work emails into scrolling on smaller screens.',
      'Creating a physical transition requires sensory cues. Lighting a match, watching the flame catch the cotton wick, and breathing in rich woody or petrichor notes sends an immediate somatic signal to your nervous system: work is complete; restorative time has begun.',
      'We recommend dimming harsh overhead lights and pairing the warm flicker of candlelight with tactile habits—pouring warm tea, unrolling a yoga mat, or opening a physical book.',
      'Scent is processed directly by the limbic system, the ancient part of the human brain governing emotion and long-term memory. When you consistently pair a distinct fragrance with relaxation, lighting that candle begins to evoke calm before the wax has even fully warmed.'
    ],
  },
  {
    slug: 'vetiver-notes',
    category: 'Ingredients',
    title: 'Vetiver: the most complex note in modern fragrance',
    excerpt: 'A deep dive into the ingredient that defines our Evening Ritual collection — and why it is so difficult to do well.',
    date: 'July 2026',
    readTime: '6 min read',
    author: 'Lantern Studio',
    img: '/images/hero_candle_1788712275307.png',
    content: [
      'A deep dive into the botanical ingredient that anchors some of the most celebrated perfumes in the world. Vetiver—distilled from the dense root system of Chrysopogon zizanioides—is neither purely woody nor purely earthy.',
      'It contains facets of smoked amber, damp rain-soaked grass, baked loam, and a distinct citrus-like brightness in its top register. Because of its structural complexity, no synthetic molecule has ever truly replicated the full breadth of pure vetiver oil.',
      'In our formulas, vetiver acts as an anchor. It grounds lighter citrus or ozone notes, preventing them from evaporating too quickly, while providing an earthy, comforting presence that makes interior spaces feel anchored to nature.',
      'We source sustainably harvested roots and blend them with clean-burning coconut wax to allow the deeper, resinous undertones to emerge smoothly without any scorched or synthetic notes.'
    ],
  },
  {
    slug: 'candle-gifting-guide',
    category: 'Gifting',
    title: 'The complete guide to gifting a candle',
    excerpt: 'Why a candle is one of the most considered gifts you can give — and how to choose the right one.',
    date: 'June 2026',
    readTime: '4 min read',
    author: 'Lantern Studio',
    img: '/images/product_card_1_1788712341526.png',
    content: [
      'Why is a candle one of the most considered gifts you can give? Unlike disposable tokens or generic vouchers, a scented candle offers an experience: an invitation to pause, breathe, and slow down.',
      'When choosing a fragrance for someone else, lean toward grounding, balanced olfactory families. Notes of petrichor, light citrus, cedarwood, or roasted coffee are universally welcoming, whereas heavily sweet or intense florals can be polarizing.',
      'Packaging also communicates respect. Our rigid gift boxes with debossed copper foil and included personal message cards ensure the gift feels like an occasion the moment it arrives in their hands.',
      'Whether welcoming friends to a new home, celebrating a milestone, or acknowledging a colleague, a thoughtful candle leaves a lasting sensory memory long after the flame has gone out.'
    ],
  },
  {
    slug: 'coconut-soy-wax',
    category: 'Ingredients',
    title: 'Why we use coconut-soy wax, and why it matters',
    excerpt: 'The chemistry of clean-burning wax, explained simply. And why most candle brands still haven\'t made the switch.',
    date: 'June 2026',
    readTime: '5 min read',
    author: 'Lantern Studio',
    img: '/images/product_card_2_1788712370744.png',
    content: [
      'The chemistry of clean-burning wax, explained simply. For decades, commercial candle manufacturing relied heavily on paraffin—a petroleum by-product that releases soot and volatile organic compounds when burned.',
      'Coconut-soy wax is entirely renewable and biodegradable. Derived from cold-pressed coconut oil blended with golden soy, it burns at a significantly lower melting point. This translates to two critical advantages: up to 50% longer burn time, and a cleaner release of fine fragrance oils.',
      'Because coconut wax cools slowly and cleanly, it holds fragrance oils evenly without sweating or separating in warmer urban climates.',
      'Every Lantern candle uses lead-free, unbleached braided cotton wicks paired with 100% plant-based waxes, ensuring your indoor air quality remains fresh and clean.'
    ],
  },
  {
    slug: 'monsoon-noir-story',
    category: 'Behind the Brand',
    title: 'Behind the collection: Monsoon Noir',
    excerpt: 'The inspiration, the materials, and the six months it took to capture the smell of rain on hot stone.',
    date: 'May 2026',
    readTime: '5 min read',
    author: 'Lantern Studio',
    img: '/images/product_card_4_1788713547615.png',
    content: [
      'The inspiration, the materials, and the six months of formulation it took to capture the scent of the first rain on sun-baked stone.',
      'In India, the arrival of the monsoon is not merely a weather transition—it is an emotional awakening. The phenomenon of petrichor—caused by geosmin and oils exuded by plants during dry periods—is universally cherished across every corner of the country.',
      'Capturing this feeling in wax required meticulous botanical balance: wet loam, crisp ozone, fresh rain accords, and an enduring base of damp vetiver root and aged cedarwood.',
      'The result is The First Rain: a fragrance that evokes cool drops falling on heated courtyard stones, bringing quiet relief and a deep sense of presence to any living space.'
    ],
  },
];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found — Lantern' };

  return {
    title: `${article.title} — Lantern Journal`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} — Lantern Journal`,
      description: article.excerpt,
      images: [{ url: article.img }],
    },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <article>
      {/* Breadcrumb */}
      <div style={{
        padding: '1.25rem var(--gutter)',
        maxWidth: 'var(--max-w)',
        marginInline: 'auto',
        fontSize: 'var(--t-xs)',
        color: 'var(--c-charcoal)',
        letterSpacing: '0.08em',
      }}>
        <Link href="/" style={{ color: 'var(--c-charcoal)' }}>Home</Link>
        <span style={{ opacity: 0.4, marginInline: '0.5rem' }}>›</span>
        <Link href="/journal" style={{ color: 'var(--c-charcoal)' }}>Journal</Link>
        <span style={{ opacity: 0.4, marginInline: '0.5rem' }}>›</span>
        <span style={{ color: 'var(--c-ink)' }}>{article.category}</span>
      </div>

      {/* Article Header */}
      <header style={{
        background: 'var(--c-cream)',
        paddingBlock: 'clamp(3rem,6vw,5.5rem)',
        borderBottom: '1px solid var(--c-border-light)',
      }}>
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <RevealUp>
            <span className="section-label" style={{ display: 'inline-block', marginBottom: '1rem' }}>
              {article.category} · {article.readTime}
            </span>
            <h1 style={{
              fontFamily: 'var(--f-serif)',
              fontSize: 'clamp(2.25rem,4.5vw,3.75rem)',
              fontWeight: 400,
              color: 'var(--c-ink)',
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              marginBottom: '1.5rem',
            }}>
              {article.title}
            </h1>
            <p style={{
              fontSize: 'var(--t-lg)',
              color: 'var(--c-charcoal)',
              lineHeight: 1.75,
              maxWidth: 620,
              marginInline: 'auto',
              fontStyle: 'italic',
            }}>
              {article.excerpt}
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '2rem',
              fontSize: 'var(--t-xs)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--c-charcoal)',
            }}>
              <span>{article.author}</span>
              <span>·</span>
              <span>{article.date}</span>
            </div>
          </RevealUp>
        </div>
      </header>

      {/* Hero Image */}
      <div style={{
        maxWidth: 960,
        margin: 'clamp(2rem,4vw,3.5rem) auto 0',
        paddingInline: 'var(--gutter)',
      }}>
        <div style={{
          position: 'relative',
          aspectRatio: '16/9',
          overflow: 'hidden',
          borderRadius: '2px',
          background: 'var(--c-cream)',
        }}>
          <Image
            src={article.img}
            alt={article.title}
            fill
            priority
            sizes="(max-width:960px) 100vw, 960px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Article Content */}
      <section style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: 'clamp(2.5rem,5vw,4.5rem) var(--gutter)',
      }}>
        <div style={{
          fontSize: 'clamp(1rem,1.2vw,1.125rem)',
          lineHeight: 1.9,
          color: 'var(--c-ink)',
        }}>
          {article.content.map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '1.75rem' }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Back Link */}
        <div style={{
          marginTop: '3.5rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--c-border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link href="/journal" className="section-link" style={{ margin: 0 }}>
            ← Back to all articles
          </Link>
          <Link href="/collections/all" className="btn btn--primary btn--sm">
            Explore Candles
          </Link>
        </div>
      </section>

      {/* Related Articles */}
      <section style={{
        background: 'var(--c-cream)',
        paddingBlock: 'clamp(3.5rem,6vw,6rem)',
        borderTop: '1px solid var(--c-border-light)',
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--f-serif)',
            fontSize: 'var(--t-2xl)',
            color: 'var(--c-ink)',
            marginBottom: '2rem',
            textAlign: 'center',
          }}>
            Continue Reading
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: 900,
            margin: '0 auto',
          }}>
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/journal/${rel.slug}`}
                style={{
                  background: 'var(--c-ivory)',
                  padding: '1.5rem',
                  border: '1px solid var(--c-border-light)',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-cognac)', fontWeight: 500 }}>
                  {rel.category}
                </span>
                <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-lg)', color: 'var(--c-ink)', margin: 0, lineHeight: 1.3 }}>
                  {rel.title}
                </h3>
                <p style={{ fontSize: 'var(--t-sm)', color: 'var(--c-charcoal)', lineHeight: 1.6, margin: 0 }}>
                  {rel.excerpt}
                </p>
                <span style={{ fontSize: 'var(--t-xs)', color: 'var(--c-ink)', fontWeight: 500, marginTop: 'auto', paddingTop: '0.5rem' }}>
                  Read story →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
