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
              onClick={e => {
                if (!cart?.checkoutUrl || cart.checkoutUrl === '#') {
                  e.preventDefault();
                  alert('Connect your Shopify store to enable checkout. Add NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN to your environment variables.');
                }
              }}
            >
              Proceed to Checkout
            </a>
            <button className="btn btn--outline btn--full btn--sm" onClick={closeCart} style={{ color: 'var(--c-ink)', borderColor: 'var(--c-border)' }}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
      <div className={`cart-overlay${cartOpen ? ' is-active' : ''}`} onClick={closeCart} aria-hidden="true" />
    </>
  );
}
