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
  { label: 'All Pieces', handle: 'all', count: 14 },
  { label: 'Rituals', handle: 'rituals', count: 6 },
  { label: 'Aesthetic', handle: 'aesthetic', count: 3 },
  { label: 'Gifting', handle: 'gifting', count: 5 },
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
      <div className="collection-hero">
        <div className="container container--narrow">
          <RevealUp>
            <span className="collection-hero-eyebrow">
              {categoryMeta.eyebrow}
            </span>
            <h1 className="collection-hero-title">
              {categoryMeta.title}
            </h1>
            {categoryMeta.description && (
              <p className="collection-hero-desc">
                {categoryMeta.description}
              </p>
            )}
          </RevealUp>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="collection-tabs-bar">
        <div className="container">
          <nav
            className="collection-tabs-nav"
            aria-label="Collection category filters"
          >
            {COLLECTION_TABS.map((tab) => {
              const isActive =
                tab.handle === normalizedHandle ||
                (normalizedHandle === 'shop' && tab.handle === 'all');
              return (
                <Link
                  key={tab.handle}
                  href={`/collections/${tab.handle}`}
                  className={`collection-tab ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="collection-tab-label">{tab.label}</span>
                  <span className="collection-tab-count">({tab.count})</span>
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
