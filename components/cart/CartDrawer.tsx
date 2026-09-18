'use client';

import { useCart } from './CartContext';
import CartItem from './CartItem';

export default function CartDrawer() {
  const { cart, cartOpen, cartCount, cartTotal, closeCart } = useCart();
  const lines = cart?.lines?.edges?.map(e => e.node) ?? [];

  return (
    <>
      <div className={`cart-drawer${cartOpen ? ' is-open' : ''}`} aria-hidden={!cartOpen} role="dialog" aria-label="Shopping cart">
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">Your Cart {cartCount > 0 && <span style={{ fontSize: '1rem', color: 'var(--c-charcoal)', fontFamily: 'var(--f-sans)', fontWeight: 300 }}>({cartCount})</span>}</h2>
          <button className="cart-drawer-close" onClick={closeCart} aria-label="Close cart">×</button>
        </div>
        <div className="cart-drawer-body">
          {lines.length === 0 ? (
            <div className="cart-empty">
              <p className="cart-empty-text">Your cart is empty.</p>
              <a href="/collections/all" className="btn btn--outline btn--sm" onClick={closeCart}>Explore Candles</a>
            </div>
          ) : (
            <ul className="cart-items" aria-label="Cart items">
              {lines.map(line => (
                <CartItem key={line.id} line={line} />
              ))}
            </ul>
          )}
        </div>
        {lines.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>{cartTotal}</span>
            </div>
            <p className="cart-shipping-note">Complimentary shipping on orders above ₹1,500</p>
            
            <a
              href={cart?.checkoutUrl || '#'}
              className="btn btn--primary btn--full"
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => {
                if (!cart?.checkoutUrl || cart.checkoutUrl === '#') {
                  e.preventDefault();
                  alert('Connect your Shopify store to enable checkout. Your Shopify Storefront API token is configured.');
                }
              }}
            >
              Proceed to Shopify Checkout
            </a>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Hello Lantern Candles! I would like to place an order from your website:\n\n` +
                lines.map(l => `• ${l.merchandise.product.title} (${l.quantity}x) — ₹${Number(l.cost.totalAmount.amount).toLocaleString('en-IN')}`).join('\n') +
                `\n\nSubtotal: ${cartTotal}\n\nPlease share delivery confirmation and payment details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline btn--full btn--sm"
              style={{ color: 'var(--c-ink)', borderColor: 'var(--c-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              Order via WhatsApp Concierge
            </a>

            <button className="btn btn--ghost btn--full btn--sm" onClick={closeCart} style={{ color: 'var(--c-charcoal)', padding: '0.4rem' }}>
              Continue Browsing
            </button>
          </div>
        )}
      </div>
      <div className={`cart-overlay${cartOpen ? ' is-active' : ''}`} onClick={closeCart} aria-hidden="true" />
    </>
  );
}
