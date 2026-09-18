'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/components/cart/CartContext';
import MobileMenu from './MobileMenu';

const NAV_LEFT = [
  { label: 'Shop', href: '/collections/all' },
  { label: 'Rituals', href: '/collections/rituals' },
  { label: 'Aesthetic', href: '/collections/aesthetic' },
];

const NAV_RIGHT = [
  { label: 'Gifting', href: '/gifting' },
  { label: 'Our Story', href: '/story' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/collections/all?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} id="siteHeader">
        <nav className="nav-container" role="navigation" aria-label="Main navigation">
          {/* Hamburger (Mobile) */}
          <button
            className={`nav-hamburger${menuOpen ? ' is-active' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>

          {/* Left links: Shop, Rituals, Aesthetic */}
          <ul className="nav-links nav-links--left">
            {NAV_LEFT.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`nav-link${isActive(item.href) ? ' is-active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Logo (Preserving Lantern brand typography verbatim) */}
          <Link href="/" className="site-logo">
            <span className="logo-wordmark">Lantern</span>
            <span className="logo-sub">Scented Candles</span>
          </Link>

          {/* Right links: Gifting, Our Story, Contact */}
          <ul className="nav-links nav-links--right">
            {NAV_RIGHT.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`nav-link${isActive(item.href) ? ' is-active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Nav Utilities */}
          <div className="nav-utils">
            <button
              className="nav-icon-btn"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search products"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <Link href="/account" className="nav-icon-btn" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            <button
              className="nav-icon-btn cart-btn"
              onClick={openCart}
              aria-label={`Cart (${cartCount} items)`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className={`cart-count${cartCount > 0 ? ' is-visible' : ''}`} aria-hidden="true">
                {cartCount}
              </span>
            </button>
          </div>
        </nav>

        {/* Search overlay */}
        <div className={`search-overlay${searchOpen ? ' is-open' : ''}`} aria-hidden={!searchOpen}>
          <div className="search-overlay-inner">
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
              <input
                ref={searchRef}
                type="search"
                className="search-input"
                placeholder="Search for a scent, mood, or ritual (e.g. Petrichor, Vanilla, Matcha)…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
              <button type="submit" style={{ display: 'none' }}>Search</button>
            </form>
            <button
              className="search-close"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              ×
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearchOpen={() => setSearchOpen(true)}
      />
    </>
  );
}
