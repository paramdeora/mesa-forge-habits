import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function Page() {
  return (
    <section className="section">
      <div className="container container--narrow" style={{ textAlign: 'center', paddingBlock: 'clamp(4rem,8vw,8rem)' }}>
        <span className="section-label" style={{ display: 'block' }}>Lantern</span>
        <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>Privacy Policy</h1>
        <p style={{ fontSize: 'var(--t-md)', color: 'var(--c-charcoal)', lineHeight: 1.85, maxWidth: 560, marginInline: 'auto', marginBottom: '2.5rem' }}>
          We respect your privacy. Your personal information is used only to process your order and communicate with you about your purchase.
        </p>
        <Link href="/collections/all" className="btn btn--primary">Back to Shop</Link>
      </div>
    </section>
  );
}
