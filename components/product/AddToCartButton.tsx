'use client';

import { useState, useCallback } from 'react';
import { useCart } from '@/components/cart/CartContext';

interface AddToCartButtonProps {
  variantId: string;
  productTitle: string;
  available?: boolean;
  className?: string;
}

export default function AddToCartButton({ variantId, productTitle, available = true, className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [status, setStatus] = useState<'idle' | 'adding' | 'added'>('idle');

  const handleClick = useCallback(async () => {
    if (status !== 'idle' || !available) return;
    setStatus('adding');
    await addItem(variantId, 1);
    setStatus('added');
    setTimeout(() => setStatus('idle'), 1800);
  }, [addItem, variantId, status, available]);

  if (!available) {
    return (
      <button className={`btn btn--outline ${className ?? ''}`} disabled style={{ opacity: 0.5 }}>
        Out of Stock
      </button>
    );
  }

  return (
    <button
      className={`btn btn--primary ${className ?? ''}`}
      onClick={handleClick}
      disabled={status !== 'idle'}
      aria-label={`Add ${productTitle} to cart`}
      style={status === 'added' ? { background: 'var(--c-cognac)', borderColor: 'var(--c-cognac)' } : undefined}
    >
      {status === 'idle' && 'Add to Cart'}
      {status === 'adding' && 'Adding…'}
      {status === 'added' && 'Added ✓'}
    </button>
  );
}
