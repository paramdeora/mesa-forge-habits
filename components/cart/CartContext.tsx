'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Cart } from '@/lib/shopify/types';
import { createCart, addToCart, removeFromCart, updateCartQuantity, getCart } from '@/lib/shopify';
import { addLinesToLocalCart, removeLineFromLocalCart, updateLineInLocalCart } from '@/lib/shopify/mock';

interface CartContextType {
  cart: Cart | null;
  cartOpen: boolean;
  isLoading: boolean;
  cartCount: number;
  cartTotal: string;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to sync state and localStorage
  const updateCartState = useCallback((newCart: Cart | null) => {
    setCart(newCart);
    if (newCart) {
      localStorage.setItem('lantern-cart-data', JSON.stringify(newCart));
      if (newCart.id) {
        localStorage.setItem('lantern-cart-id', newCart.id);
      }
    } else {
      localStorage.removeItem('lantern-cart-data');
      localStorage.removeItem('lantern-cart-id');
    }
  }, []);

  // On mount, restore cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lantern-cart-data');
      if (saved) {
        const parsed = JSON.parse(saved) as Cart;
        if (parsed && parsed.totalQuantity > 0) {
          setCart(parsed);
        }
      }
    } catch {}

    const cartId = localStorage.getItem('lantern-cart-id');
    if (cartId && !cartId.includes('local-') && !cartId.includes('mock-session')) {
      getCart(cartId).then((restored) => {
        if (restored && restored.totalQuantity > 0) {
          setCart(restored);
          localStorage.setItem('lantern-cart-data', JSON.stringify(restored));
        }
      });
    }
  }, []);

  const cartCount = cart?.totalQuantity ?? cart?.lines?.edges?.reduce((sum, e) => sum + e.node.quantity, 0) ?? 0;
  const cartTotal = cart?.cost?.totalAmount?.amount
    ? `₹${Number(cart.cost.totalAmount.amount).toLocaleString('en-IN')}`
    : '₹0';

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      const cartId = localStorage.getItem('lantern-cart-id');
      let updated: Cart | null = null;

      const isRealShopifyCart = cartId && !cartId.includes('local-') && !cartId.includes('mock-session');

      if (isRealShopifyCart) {
        try {
          updated = await addToCart(cartId!, [{ merchandiseId: variantId, quantity }]);
        } catch {
          updated = null;
        }
      } else {
        try {
          updated = await createCart([{ merchandiseId: variantId, quantity }]);
          if (updated && (updated.id.includes('mock-session') || updated.totalQuantity === 0)) {
            updated = null;
          }
        } catch {
          updated = null;
        }
      }

      // If Shopify API is unavailable or returned empty fallback, manage items locally with full product details
      if (!updated || updated.totalQuantity === 0) {
        updated = addLinesToLocalCart(cart, [{ merchandiseId: variantId, quantity }]);
      }

      updateCartState(updated);
      setCartOpen(true);
    } catch (err) {
      console.error('addItem error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [cart, updateCartState]);

  const removeItem = useCallback(async (lineId: string) => {
    setIsLoading(true);
    try {
      const cartId = localStorage.getItem('lantern-cart-id');
      let updated: Cart | null = null;

      const isRealShopifyCart = cartId && !cartId.includes('local-') && !cartId.includes('mock-session');

      if (isRealShopifyCart) {
        try {
          updated = await removeFromCart(cartId!, [lineId]);
        } catch {
          updated = null;
        }
      }

      if (!updated && cart) {
        updated = removeLineFromLocalCart(cart, [lineId]);
      }

      updateCartState(updated);
    } finally {
      setIsLoading(false);
    }
  }, [cart, updateCartState]);

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const cartId = localStorage.getItem('lantern-cart-id');
      let updated: Cart | null = null;

      const isRealShopifyCart = cartId && !cartId.includes('local-') && !cartId.includes('mock-session');

      if (isRealShopifyCart) {
        try {
          updated = await updateCartQuantity(cartId!, [{ id: lineId, quantity }]);
        } catch {
          updated = null;
        }
      }

      if (!updated && cart) {
        updated = updateLineInLocalCart(cart, [{ id: lineId, quantity }]);
      }

      updateCartState(updated);
    } finally {
      setIsLoading(false);
    }
  }, [cart, updateCartState]);

  return (
    <CartContext.Provider value={{ cart, cartOpen, isLoading, cartCount, cartTotal, openCart, closeCart, addItem, removeItem, updateItem }}>
      {children}
    </CartContext.Provider>
  );
}
