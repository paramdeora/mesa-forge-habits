'use client';

import Image from 'next/image';
import { useCart } from './CartContext';
import type { CartLine } from '@/lib/shopify/types';

export default function CartItem({ line }: { line: CartLine }) {
  const { removeItem, updateItem } = useCart();
  const { merchandise, quantity, cost } = line;
  const product = merchandise.product;
  const imgSrc = merchandise.image?.url || product.featuredImage?.url || '/images/hero_candle_1788712275307.png';
  const linePrice = `₹${Number(cost.totalAmount.amount).toLocaleString('en-IN')}`;

  return (
    <li className="cart-item">
      <div style={{ position: 'relative', width: 80, aspectRatio: '3/4', flexShrink: 0 }}>
        <Image src={imgSrc} alt={product.title} fill style={{ objectFit: 'cover' }} className="cart-item-img" sizes="80px" />
      </div>
      <div>
        <p className="cart-item-name">{product.title}</p>
        <p className="cart-item-scent">{merchandise.title !== 'Default Title' ? merchandise.title : ''}</p>
        <div className="cart-item-qty">
          <button
            onClick={() => updateItem(line.id, quantity - 1)}
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >−</button>
          <span>{quantity}</span>
          <button
            onClick={() => updateItem(line.id, quantity + 1)}
            aria-label="Increase quantity"
          >+</button>
        </div>
        <button className="cart-item-remove" onClick={() => removeItem(line.id)}>Remove</button>
      </div>
      <span className="cart-item-price">{linePrice}</span>
    </li>
  );
}
