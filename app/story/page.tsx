import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import RevealUp from '@/components/ui/RevealUp';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'The story of Lantern — a premium Indian home-fragrance brand built around the belief that scent is the most intimate form of design.',
};

export default function StoryPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--c-ink)', paddingBlock: 'clamp(5rem,10vw,10rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
          <Image src="/images/editorial_interior_1788713535450.png" alt="" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="container container--narrow" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <RevealUp>
            <span className="section-label section-label--light" style={{ display: 'block', textAlign: 'center' }}>Our Story</span>
            <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2.5rem,6vw,5.5rem)', fontWeight: 400, color: 'var(--c-ivory)', letterSpacing: '-0.02em', lineHeight: 1.05, marginTop: '1rem' }}>
              A candle is not<br />a commodity.<br /><em style={{ fontStyle: 'italic', color: 'rgba(246,241,230,0.7)' }}>It is an atmosphere.</em>
            </h1>
          </RevealUp>
        </div>
      </div>

      {/* Origin */}
      <section className="section" style={{ background: 'var(--c-ivory)' }}>
        <div className="container container--narrow">
          <RevealUp>
            <span className="section-label">The Beginning</span>
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>Lantern began with a question.</h2>
          </RevealUp>
          <RevealUp delay={0.1}>
            <div style={{ columnCount: 1, fontSize: 'var(--t-md)', color: 'var(--c-charcoal)', lineHeight: 1.95, maxWidth: 640 }}>
              <p>Why does a premium Indian home look and feel premium in every dimension — the furniture, the art, the ceramics — but reach for an imported candle when it wants to smell premium?</p>
              <p style={{ marginTop: '1.25rem' }}>We couldn&apos;t answer that. So we decided to fix it.</p>
              <p style={{ marginTop: '1.25rem' }}>Lantern was founded in 2023 with a single conviction: that Indian homes deserve home fragrance made with the same material intelligence and design restraint as the world&apos;s best fragrance houses — but rooted in Indian taste, Indian materials, and the particular quality of Indian light.</p>
            </div>
          </RevealUp>
        </div>
      </section>

      {/* Split editorial */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 560 }}>
        <div style={{ background: 'var(--c-cream)', display: 'flex', alignItems: 'center', padding: 'clamp(3rem,6vw,7rem) clamp(2rem,5vw,6rem)' }}>
          <div style={{ maxWidth: 480 }}>
            <RevealUp>
              <span className="section-label">The Making</span>
              <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.75rem,3vw,3rem)', fontWeight: 400, color: 'var(--c-ink)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
                Every candle begins<br />with 48 hours of curing.
              </h2>
              <p style={{ fontSize: 'var(--t-base)', color: 'var(--c-charcoal)', lineHeight: 1.9, marginBottom: '1rem' }}>
                Our coconut-soy wax is blended to a proprietary ratio that allows fragrance oils to bind more deeply and release more evenly. The result is a throw that is full without being sharp.
              </p>
              <p style={{ fontSize: 'var(--t-base)', color: 'var(--c-charcoal)', lineHeight: 1.9 }}>
                We source fragrance oils from certified fragrance houses in Mumbai and internationally. Every batch is tested for hot throw, cold throw, and visual clarity before it is accepted.
              </p>
            </RevealUp>
          </div>
        </div>
        <div style={{ position: 'relative', minHeight: 400 }}>
          <Image src="/images/product_lifestyle_1788712311819.png" alt="Lantern candle being poured" fill style={{ objectFit: 'cover' }} />
        </div>
      </div>

      {/* Process */}
      <section className="section" style={{ background: 'var(--c-ivory)' }}>
        <div className="container">
          <RevealUp>
            <span className="section-label">Our Process</span>
            <h2 className="section-title" style={{ marginBottom: 'clamp(2rem,4vw,4rem)' }}>Five steps. No shortcuts.</h2>
          </RevealUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
            {[
              { step: '01', title: 'Source', body: 'We evaluate fragrance oils against 12 quality criteria before accepting any batch into production.' },
              { step: '02', title: 'Blend', body: 'Wax and fragrance are blended at a precise temperature for 20 minutes, then allowed to rest before pouring.' },
              { step: '03', title: 'Pour', body: 'Each candle is hand-poured by our team. The wick is centred by eye. The surface is allowed to settle undisturbed.' },
              { step: '04', title: 'Cure', body: 'Every candle cures for a minimum of 48 hours at a controlled temperature before quality inspection.' },
              { step: '05', title: 'Pack', body: 'Candles are packed by hand in FSC-certified materials and shipped in reinforced boxes to prevent damage in transit.' },
            ].map((s, i) => (
              <RevealUp key={s.step} delay={i * 0.08}>
                <div>
                  <p style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-4xl)', color: 'var(--c-border)', lineHeight: 1, marginBottom: '1.25rem' }}>{s.step}</p>
                  <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-xl)', color: 'var(--c-ink)', marginBottom: '0.75rem' }}>{s.title}</h3>
                  <p style={{ fontSize: 'var(--t-sm)', color: 'var(--c-charcoal)', lineHeight: 1.85 }}>{s.body}</p>
                </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--c-cream)', padding: 'clamp(4rem,8vw,8rem) var(--gutter)', textAlign: 'center' }}>
        <RevealUp>
          <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400, color: 'var(--c-ink)', marginBottom: '2rem' }}>
            Ready to find your scent?
          </h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/collections/all" className="btn btn--primary">Shop the Collection</Link>
            <Link href="/gifting" className="btn btn--outline">Gifting</Link>
          </div>
        </RevealUp>
      </section>
    </>
  );
}
