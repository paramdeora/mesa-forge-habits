import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getProduct, getProducts } from '@/lib/shopify';
import ProductForm from '@/components/product/ProductForm';
import ProductCard from '@/components/product/ProductCard';
import RevealUp from '@/components/ui/RevealUp';

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  return {
    title: product?.title ?? 'Product',
    description: product?.description ?? '',
  };
}

const SCENT_NOTES: Record<string, { top: string[]; heart: string[]; base: string[] }> = {
  'dusk-vetiver':  { top: ['Black Pepper', 'Smoked Cedar'], heart: ['Vetiver', 'Leather', 'Fig'], base: ['Sandalwood', 'Dark Musk', 'Labdanum'] },
  'grey-cardamom': { top: ['Cardamom', 'Bergamot'], heart: ['Oud', 'Saffron'], base: ['Tonka Bean', 'Amber', 'Cedarwood'] },
  'white-jasmine': { top: ['Jasmine', 'Neroli'], heart: ['Ylang-Ylang', 'Tuberose'], base: ['Cedar', 'Musk', 'Sandalwood'] },
  'amber-rain':    { top: ['Petrichor', 'Ozone'], heart: ['Amber', 'Patchouli'], base: ['Dark Musk', 'Labdanum', 'Oakmoss'] },
};

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const [product, allProducts] = await Promise.all([getProduct(handle), getProducts()]);

  if (!product) {
    return (
      <div className="section container" style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-3xl)' }}>Product not found</h1>
        <Link href="/collections/all" className="btn btn--primary" style={{ marginTop: '2rem' }}>Browse All Candles</Link>
      </div>
    );
  }

  const related = allProducts.filter(p => p.handle !== handle).slice(0, 3);
  const notes = SCENT_NOTES[handle] ?? SCENT_NOTES['dusk-vetiver'];

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ padding: '1.25rem var(--gutter)', maxWidth: 'var(--max-w)', marginInline: 'auto', fontSize: 'var(--t-xs)', color: 'var(--c-charcoal)', letterSpacing: '0.08em' }}>
        <Link href="/" style={{ color: 'var(--c-charcoal)', borderBottom: '1px solid transparent', transition: 'border-color 0.18s' }}>Home</Link>
        <span style={{ opacity: 0.4, marginInline: '0.5rem' }}>›</span>
        <Link href="/collections/all" style={{ color: 'var(--c-charcoal)' }}>Candles</Link>
        <span style={{ opacity: 0.4, marginInline: '0.5rem' }}>›</span>
        {product.title}
      </div>

      {/* Product Form (gallery + content) */}
      <ProductForm product={product} />

      {/* Scent Notes */}
      <div style={{ maxWidth: 'var(--max-w)', marginInline: 'auto', padding: '0 var(--gutter) 4rem' }}>
        <div style={{ maxWidth: 600 }}>
          <h2 style={{ fontFamily: 'var(--f-sans)', fontSize: 'var(--t-xs)', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-charcoal)', marginBottom: '1rem' }}>Scent Profile</h2>
          <div style={{ borderTop: '1px solid var(--c-border)' }}>
            {[
              { tier: 'Top', values: notes.top },
              { tier: 'Heart', values: notes.heart },
              { tier: 'Base', values: notes.base },
            ].map(n => (
              <div key={n.tier} style={{ display: 'flex', gap: '1.5rem', alignItems: 'baseline', paddingBlock: '1rem', borderBottom: '1px solid var(--c-border)' }}>
                <span style={{ fontSize: 'var(--t-xs)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-charcoal)', minWidth: 55 }}>{n.tier}</span>
                <div style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-md)', color: 'var(--c-ink)' }}>
                  {n.values.map(v => (
                    <span key={v} style={{ display: 'inline-block', padding: '2px 10px', border: '1px solid var(--c-border)', fontSize: 'var(--t-xs)', borderRadius: 999, marginRight: 6, marginBottom: 4 }}>{v}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <div style={{ maxWidth: 600, marginTop: '2rem' }}>
          <Accordion title="Product Details">
            <p>Wax: 100% natural coconut-soy blend. Wick: cotton-core, lead and zinc free. Fragrance: fine fragrance-grade oils, up to 11% fragrance load. Vessel: frosted borosilicate glass. Lid: brushed silver aluminium.</p>
            <p style={{ marginTop: '0.75rem' }}>Burn time: approximately 55 hours (300g). All candles are handpoured in small batches in India.</p>
          </Accordion>
          <Accordion title="Candle Care">
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
              <li>Trim the wick to 5mm before every burn.</li>
              <li>Allow the melt pool to reach the edges on the first burn (2–3 hours).</li>
              <li>Never burn for more than 4 hours at a time.</li>
              <li>Keep away from drafts, children, and pets.</li>
              <li>Stop burning when 1cm of wax remains.</li>
            </ul>
          </Accordion>
          <Accordion title="Shipping & Returns">
            <p>Orders are dispatched within 2–3 business days. Complimentary standard shipping on orders above ₹1,500. Express delivery available at checkout.</p>
            <p style={{ marginTop: '0.75rem' }}>We accept returns on unopened products within 14 days of receipt. Opened candles are non-returnable for hygiene reasons. Contact us at hello@lanterncandles.in for all return queries.</p>
          </Accordion>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ background: 'var(--c-cream)', paddingBlock: 'clamp(4rem,7vw,7rem)' }}>
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-label">You might also like</span>
                <h2 className="section-title">Complete the collection.</h2>
              </div>
            </div>
            <div className="products-grid">
              {related.map((p, i) => (
                <RevealUp key={p.id} delay={i * 0.08}>
                  <ProductCard product={p} />
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
  // Rendered server-side, interaction via CSS :has or a client wrapper
  // For simplicity, using a details/summary element (natively accessible)
  return (
    <details style={{ borderBottom: '1px solid var(--c-border)' }}>
      <summary style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingBlock: '1.25rem', fontFamily: 'var(--f-sans)', fontSize: 'var(--t-xs)',
        fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'var(--c-ink)', cursor: 'pointer', listStyle: 'none',
      }}>
        {title}
        <span style={{ fontSize: '1.25rem', fontWeight: 300 }}>+</span>
      </summary>
      <div style={{ fontSize: 'var(--t-sm)', color: 'var(--c-charcoal)', lineHeight: 1.8, paddingBottom: '1.25rem' }}>
        {children}
      </div>
    </details>
  );
}
