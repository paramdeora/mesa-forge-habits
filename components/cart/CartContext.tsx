'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Cart, CartLine } from '@/lib/shopify/types';
import { createCart, addToCart, removeFromCart, updateCartQuantity, getCart } from '@/lib/shopify';

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

  // On mount, restore cart from localStorage
  useEffect(() => {
    const cartId = localStorage.getItem('lantern-cart-id');
    if (!cartId) return;
    getCart(cartId).then((restored) => {
      if (restored) setCart(restored);
    });
  }, []);

  const cartCount = cart?.lines?.edges?.reduce((sum, e) => sum + e.node.quantity, 0) ?? 0;
  const cartTotal = cart ? `₹${Number(cart.cost.totalAmount.amount).toLocaleString('en-IN')}` : '₹0';

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      let cartId = localStorage.getItem('lantern-cart-id');
      let updated: Cart | null = null;

      if (!cartId) {
        updated = await createCart([{ merchandiseId: variantId, quantity }]);
        if (updated?.id) localStorage.setItem('lantern-cart-id', updated.id);
      } else {
        updated = await addToCart(cartId, [{ merchandiseId: variantId, quantity }]);
        if (!updated) {
          // Cart expired — create new one
          updated = await createCart([{ merchandiseId: variantId, quantity }]);
          if (updated?.id) localStorage.setItem('lantern-cart-id', updated.id);
        }
      }
      if (updated) setCart(updated);
      setCartOpen(true);
    } catch (err) {
      console.error('addItem error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (lineId: string) => {
    const cartId = localStorage.getItem('lantern-cart-id');
    if (!cartId) return;
    setIsLoading(true);
    try {
      const updated = await removeFromCart(cartId, [lineId]);
      if (updated) setCart(updated);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    const cartId = localStorage.getItem('lantern-cart-id');
    if (!cartId) return;
    setIsLoading(true);
    try {
      const updated = await updateCartQuantity(cartId, [{ id: lineId, quantity }]);
      if (updated) setCart(updated);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, cartOpen, isLoading, cartCount, cartTotal, openCart, closeCart, addItem, removeItem, updateItem }}>
      {children}
    </CartContext.Provider>
  );
}
