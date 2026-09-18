import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function Page() {
  return (
    <section className="section">
      <div className="container container--narrow" style={{ textAlign: 'center', paddingBlock: 'clamp(4rem,8vw,8rem)' }}>
        <span className="section-label" style={{ display: 'block' }}>Lantern</span>
        <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>Terms of Service</h1>
        <p style={{ fontSize: 'var(--t-md)', color: 'var(--c-charcoal)', lineHeight: 1.85, maxWidth: 560, marginInline: 'auto', marginBottom: '2.5rem' }}>
          By using this website, you agree to our terms. All products are subject to availability. Prices are inclusive of GST.
        </p>
        <Link href="/collections/all" className="btn btn--primary">Back to Shop</Link>
      </div>
    </section>
  );
}
