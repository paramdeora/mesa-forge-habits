import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/shopify';
import ProductForm from '@/components/product/ProductForm';
import ProductCard from '@/components/product/ProductCard';
import RevealUp from '@/components/ui/RevealUp';

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: 'Product Not Found — Lantern' };

  return {
    title: `${product.title} — Lantern`,
    description: product.description ?? 'Lantern Handpoured Scented Candles',
    openGraph: {
      title: `${product.title} — Lantern Scented Candles`,
      description: product.description,
      images: [{ url: product.featuredImage?.url || '/images/hero/hero_candle_flame.jpg' }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const [product, allProducts] = await Promise.all([getProduct(handle), getProducts()]);

  if (!product) {
    notFound();
  }

  // Related products from the same category or general catalogue
  const related = allProducts
    .filter((p) => p.handle !== handle && (p.category === product.category || !product.category))
    .slice(0, 3);

  const notes = product.fragranceNotes;
  const categoryHandle = product.category ?? 'rituals';
  const categoryTitle = product.collections?.edges?.[0]?.node?.title ?? (product.category ? product.category.toUpperCase() : 'CANDLES');

  return (
    <>
      {/* Breadcrumb */}
      <div style={{
        padding: '1.25rem var(--gutter)',
        maxWidth: 'var(--max-w)',
        marginInline: 'auto',
        fontSize: 'var(--t-xs)',
        color: 'var(--c-charcoal)',
        letterSpacing: '0.08em',
      }}>
        <Link href="/" style={{ color: 'var(--c-charcoal)', borderBottom: '1px solid transparent', transition: 'border-color 0.18s' }}>
          Home
        </Link>
        <span style={{ opacity: 0.4, marginInline: '0.5rem' }}>›</span>
        <Link href={`/collections/${categoryHandle}`} style={{ color: 'var(--c-charcoal)' }}>
          {categoryTitle}
        </Link>
        <span style={{ opacity: 0.4, marginInline: '0.5rem' }}>›</span>
        <span style={{ color: 'var(--c-ink)', fontWeight: 500 }}>{product.title}</span>
      </div>

      {/* Product Form (interactive gallery, options, pricing, ATC) */}
      <ProductForm product={product} />

      {/* Scent Profile & Technical Specifications */}
      <div style={{ maxWidth: 'var(--max-w)', marginInline: 'auto', padding: '0 var(--gutter) 4rem' }}>
        <div style={{ maxWidth: 640 }}>
          {notes && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--f-sans)',
                fontSize: 'var(--t-xs)',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--c-charcoal)',
                marginBottom: '1.25rem',
              }}>
                Scent Profile & Notes
              </h2>
              <div style={{ borderTop: '1px solid var(--c-border)' }}>
                {[
                  { tier: 'Top Notes', values: notes.top },
                  { tier: 'Heart Notes', values: notes.heart },
                  { tier: 'Base Notes', values: notes.base },
                ].map((n) => (
                  <div
                    key={n.tier}
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      alignItems: 'baseline',
                      paddingBlock: '1.1rem',
                      borderBottom: '1px solid var(--c-border)',
                    }}
                  >
                    <span style={{
                      fontSize: 'var(--t-xs)',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--c-charcoal)',
                      minWidth: 90,
                    }}>
                      {n.tier}
                    </span>
                    <div style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-md)', color: 'var(--c-ink)' }}>
                      {n.values.map((v) => (
                        <span
                          key={v}
                          style={{
                            display: 'inline-block',
                            padding: '3px 12px',
                            border: '1px solid var(--c-border)',
                            fontSize: 'var(--t-xs)',
                            borderRadius: 999,
                            marginRight: 6,
                            marginBottom: 4,
                            background: 'var(--c-cream)',
                          }}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accordions */}
          <div style={{ marginTop: '2rem' }}>
            <Accordion title="Product Details & Materials">
              <p>
                <strong>Wax & Wick:</strong> {product.materials || '100% natural coconut-soy wax blend with lead-free braided cotton wick.'}
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                <strong>Vessel & Weight:</strong> {product.vessel || 'Seamless brushed silver tin with custom illustrated art lid'}. Net weight {product.size || '100g'}.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                <strong>Burn Time:</strong> {product.burnTime || 'Approx. 30–35 hours'}. Handpoured in small batches across India.
              </p>
              {product.safetyWarning && (
                <p style={{ marginTop: '0.75rem', color: 'var(--c-cognac)', fontWeight: 500 }}>
                  <strong>Safety Notice:</strong> {product.safetyWarning}
                </p>
              )}
            </Accordion>

            <Accordion title="Candle Care Ritual">
              <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
                <li>Trim the cotton wick to 5mm before each lighting to ensure a clean, steady flame.</li>
                <li>Allow the melt pool to reach all edges on the initial burn (approx. 2 hours) to prevent tunneling.</li>
                <li>Never burn for more than 4 consecutive hours.</li>
                <li>Burn on heat-resistant surfaces away from drafts, pets, and children.</li>
                <li>Extinguish gently with a candle snuffer or lid to preserve scent integrity.</li>
              </ul>
            </Accordion>

            <Accordion title="Shipping & Gifting Details">
              <p>
                All orders are hand-packed with protective corrugated paperboard and dispatched within 2–3 business days. Complimentary standard shipping across India on orders above ₹1,500.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                Gifting a candle? Every piece arrives in dedicated packaging suitable for immediate gifting. Personal handwritten gift cards can be added at checkout.
              </p>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ background: 'var(--c-cream)', paddingBlock: 'clamp(4rem,7vw,7rem)' }}>
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-label">More to explore</span>
                <h2 className="section-title">Complementary Pieces</h2>
              </div>
              <Link href={`/collections/${categoryHandle}`} className="section-link">
                View collection →
              </Link>
            </div>
            <div className="products-grid">
              {related.map((relProduct, i) => (
                <RevealUp key={relProduct.id} delay={i * 0.08}>
                  <ProductCard product={relProduct} />
                </RevealUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details style={{ borderBottom: '1px solid var(--c-border)' }}>
      <summary style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBlock: '1.25rem',
        fontFamily: 'var(--f-sans)',
        fontSize: 'var(--t-xs)',
        fontWeight: 500,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--c-ink)',
        cursor: 'pointer',
        listStyle: 'none',
      }}>
        {title}
        <span style={{ fontSize: '1.25rem', fontWeight: 300 }}>+</span>
      </summary>
      <div style={{ fontSize: 'var(--t-sm)', color: 'var(--c-charcoal)', lineHeight: 1.85, paddingBottom: '1.25rem' }}>
        {children}
      </div>
    </details>
  );
}
