import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getCollection, getCollections } from '@/lib/shopify';
import ProductCard from '@/components/product/ProductCard';
import RevealUp from '@/components/ui/RevealUp';

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);
  const title = collection?.title ?? 'Shop All Candles';
  return {
    title,
    description: collection?.description ?? 'Browse all Lantern premium scented candles.',
  };
}

const COLLECTION_TABS = [
  { label: 'All Candles', handle: 'all' },
  { label: 'Morning Calm', handle: 'morning-calm' },
  { label: 'Evening Ritual', handle: 'evening-ritual' },
  { label: 'Monsoon Noir', handle: 'monsoon-noir' },
  { label: 'Deep Focus', handle: 'deep-focus' },
];

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const collection = await getCollection(handle);
  const products = collection?.products?.edges?.map(e => e.node) ?? collection?.products?.nodes ?? [];

  return (
    <>
      {/* Page Hero */}
      <div style={{ background: 'var(--c-cream)', paddingBlock: 'clamp(3rem,6vw,6rem)', borderBottom: '1px solid var(--c-border-light)' }}>
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <RevealUp>
            <span className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>Collection</span>
            <h1 className="section-title">{collection?.title ?? 'All Candles'}</h1>
            {collection?.description && (
              <p style={{ color: 'var(--c-charcoal)', marginTop: '1rem', fontSize: 'var(--t-md)', lineHeight: 1.8 }}>
                {collection.description}
              </p>
            )}
          </RevealUp>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ borderBottom: '1px solid var(--c-border-light)', background: 'var(--c-ivory)', position: 'sticky', top: 'var(--nav-h)', zIndex: 10 }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '0.5rem', paddingBlock: '1rem', overflowX: 'auto' }} aria-label="Collection filters">
            {COLLECTION_TABS.map(tab => (
              <Link
                key={tab.handle}
                href={`/collections/${tab.handle}`}
                className="btn btn--sm"
                style={
                  tab.handle === handle
                    ? { background: 'var(--c-ink)', color: 'var(--c-ivory)', borderColor: 'var(--c-ink)' }
                    : { background: 'transparent', color: 'var(--c-charcoal)', borderColor: 'var(--c-border)' }
                }
                aria-current={tab.handle === handle ? 'page' : undefined}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Products */}
      <section className="section">
        <div className="container">
          {products.length > 0 ? (
            <div className="products-grid">
              {products.map((product, i) => (
                <RevealUp key={product.id} delay={i * 0.06}>
                  <ProductCard product={product} />
                </RevealUp>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 'clamp(4rem,8vw,8rem) 0' }}>
              <p style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-2xl)', color: 'var(--c-charcoal)', fontStyle: 'italic', marginBottom: '2rem' }}>
                No candles found in this collection.
              </p>
              <Link href="/collections/all" className="btn btn--primary">View All Candles</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
