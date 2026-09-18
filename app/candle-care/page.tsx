import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Candle Care' };

export default function Page() {
  return (
    <section className="section">
      <div className="container container--narrow" style={{ textAlign: 'center', paddingBlock: 'clamp(4rem,8vw,8rem)' }}>
        <span className="section-label" style={{ display: 'block' }}>Lantern</span>
        <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>Candle Care</h1>
        <p style={{ fontSize: 'var(--t-md)', color: 'var(--c-charcoal)', lineHeight: 1.85, maxWidth: 560, marginInline: 'auto', marginBottom: '2.5rem' }}>
          Trim the wick to 5mm before every burn. Allow the melt pool to reach the edges on the first burn. Never burn for more than 4 hours at a time.
        </p>
        <Link href="/collections/all" className="btn btn--primary">Back to Shop</Link>
      </div>
    </section>
  );
}
