import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/shopify';
import { CATEGORIES } from '@/lib/shopify/products';
import ProductCard from '@/components/product/ProductCard';
import RevealUp from '@/components/ui/RevealUp';

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);
  const title = collection?.title ?? 'Shop All Candles';
  return {
    title: `${title} — Lantern`,
    description: collection?.description ?? 'Explore Lantern scented candles and home fragrance rituals.',
  };
}

const COLLECTION_TABS = [
  { label: 'All Pieces', handle: 'all' },
  { label: 'Rituals', handle: 'rituals' },
  { label: 'Aesthetic', handle: 'aesthetic' },
  { label: 'Gifting', handle: 'gifting' },
];

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const normalizedHandle = handle.toLowerCase();

  const collection = await getCollection(normalizedHandle);
  if (!collection) {
    notFound();
  }

  const categoryMeta = CATEGORIES.find(
    (c) => c.handle === normalizedHandle || (normalizedHandle === 'shop' && c.handle === 'all')
  ) ?? {
    handle: normalizedHandle,
    title: collection.title,
    eyebrow: 'Collection',
    description: collection.description,
  };

  const products =
    collection.products?.edges?.map((e) => e.node) ??
    collection.products?.nodes ??
    [];

  return (
    <>
      {/* Page Hero */}
      <div style={{
        background: 'var(--c-cream)',
        paddingBlock: 'clamp(3.5rem,7vw,6.5rem)',
        borderBottom: '1px solid var(--c-border-light)',
      }}>
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <RevealUp>
            <span className="section-label" style={{ justifyContent: 'center', display: 'flex', marginBottom: '0.75rem' }}>
              {categoryMeta.eyebrow}
            </span>
            <h1 className="section-title" style={{ marginBottom: '1.25rem' }}>
              {categoryMeta.title}
            </h1>
            {categoryMeta.description && (
              <p style={{
                color: 'var(--c-charcoal)',
                fontSize: 'var(--t-md)',
                lineHeight: 1.85,
                maxWidth: '680px',
                margin: '0 auto',
              }}>
                {categoryMeta.description}
              </p>
            )}
          </RevealUp>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{
        borderBottom: '1px solid var(--c-border-light)',
        background: 'var(--c-ivory)',
        position: 'sticky',
        top: 'var(--nav-h)',
        zIndex: 10,
      }}>
        <div className="container">
          <nav
            style={{
              display: 'flex',
              gap: '0.5rem',
              paddingBlock: '1rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
            aria-label="Collection category filters"
          >
            {COLLECTION_TABS.map((tab) => {
              const isActive = tab.handle === normalizedHandle || (normalizedHandle === 'shop' && tab.handle === 'all');
              return (
                <Link
                  key={tab.handle}
                  href={`/collections/${tab.handle}`}
                  className={`btn btn--sm ${isActive ? 'btn--primary' : 'btn--ghost'}`}
                  style={{
                    whiteSpace: 'nowrap',
                    borderColor: isActive ? 'var(--c-ink)' : 'var(--c-border)',
                  }}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Products Grid */}
      <div className="section" style={{ background: 'var(--c-ivory)' }}>
        <div className="container">
          {products.length === 0 ? (
            <div style={{ textAlign: 'center', paddingBlock: '4rem' }}>
              <p style={{ fontSize: 'var(--t-md)', color: 'var(--c-charcoal)' }}>No products found in this category.</p>
              <Link href="/collections/all" className="btn btn--outline" style={{ marginTop: '1.5rem' }}>
                Browse All Candles
              </Link>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product, i) => (
                <RevealUp key={product.id} delay={i * 0.06}>
                  <ProductCard product={product} />
                </RevealUp>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
