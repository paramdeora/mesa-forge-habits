'use client';

import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchOpen: () => void;
}

const NAV_LINKS = [
  { label: 'Shop', href: '/collections/all' },
  { label: 'Rituals', href: '/collections/rituals' },
  { label: 'Aesthetic', href: '/collections/aesthetic' },
  { label: 'Gifting', href: '/gifting' },
  { label: 'Our Story', href: '/story' },
  { label: 'Contact', href: '/contact' },
];

export default function MobileMenu({ isOpen, onClose, onSearchOpen }: MobileMenuProps) {
  return (
    <>
      <div className={`mobile-menu${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen} aria-label="Mobile navigation">
        <div className="mobile-menu-header">
          <Link href="/" className="mobile-logo" onClick={onClose}>Lantern</Link>
          <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">×</button>
        </div>
        <nav className="mobile-nav">
          {NAV_LINKS.map((link) => (
            <Link key={link.href + link.label} href={link.href} className="mobile-nav-link" onClick={onClose}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <button
            className="mobile-footer-link"
            style={{ border: 'none', background: 'none', font: 'inherit', cursor: 'pointer' }}
            onClick={() => { onClose(); onSearchOpen(); }}
          >
            Search
          </button>
          <Link href="/account" className="mobile-footer-link" onClick={onClose}>Account</Link>
        </div>
      </div>
      <div className={`mobile-overlay${isOpen ? ' is-active' : ''}`} onClick={onClose} aria-hidden="true" />
    </>
  );
}
