import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Contact Us' };

export default function Page() {
  return (
    <section className="section">
      <div className="container container--narrow" style={{ textAlign: 'center', paddingBlock: 'clamp(4rem,8vw,8rem)' }}>
        <span className="section-label" style={{ display: 'block' }}>Lantern</span>
        <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>Contact Us</h1>
        <p style={{ fontSize: 'var(--t-md)', color: 'var(--c-charcoal)', lineHeight: 1.85, maxWidth: 560, marginInline: 'auto', marginBottom: '2.5rem' }}>
          We'd love to hear from you. Write to us at hello@lanterncandles.in and we will respond within 24 hours.
        </p>
        <Link href="/collections/all" className="btn btn--primary">Back to Shop</Link>
      </div>
    </section>
  );
}
