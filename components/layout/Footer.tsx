import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link href="/" className="footer-logo">
            <span className="footer-logo-wordmark">Lantern</span>
            <span className="footer-logo-sub">Scented Candles</span>
          </Link>
          <p className="footer-tagline">
            Premium home fragrance and aesthetic candle objects handpoured in small batches across India.
            Every piece is an invitation to slow down and savor the everyday.
          </p>
          <div className="footer-social">
            <a href="#" className="footer-social-link" aria-label="Instagram" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="#" className="footer-social-link" aria-label="Pinterest" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.16 1.22-5.16s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .89-.57 2.24-.86 3.48-.25 1.04.51 1.88 1.53 1.88 1.84 0 3.07-2.36 3.07-5.15 0-2.12-1.43-3.71-4.01-3.71-2.92 0-4.74 2.19-4.74 4.64 0 .84.24 1.43.62 1.88.17.2.19.28.13.51-.04.17-.14.57-.18.73-.06.23-.24.31-.44.23-1.24-.51-1.82-1.87-1.82-3.4 0-2.52 2.12-5.55 6.34-5.55 3.4 0 5.64 2.47 5.64 5.12 0 3.51-1.94 6.13-4.8 6.13-.96 0-1.86-.52-2.17-1.1l-.62 2.38c-.22.86-.82 1.94-1.22 2.6.92.28 1.89.43 2.9.43 5.52 0 10-4.48 10-10S17.52 2 12 2z" /></svg>
            </a>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <div className="footer-nav-col">
            <h4 className="footer-nav-title">Shop</h4>
            <ul className="footer-nav-list">
              <li><Link href="/collections/all" className="footer-nav-link">All Candles</Link></li>
              <li><Link href="/collections/rituals" className="footer-nav-link">Rituals Collection</Link></li>
              <li><Link href="/collections/aesthetic" className="footer-nav-link">Aesthetic Collection</Link></li>
              <li><Link href="/gifting" className="footer-nav-link">Gifting & Bundles</Link></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-nav-title">Company</h4>
            <ul className="footer-nav-list">
              <li><Link href="/story" className="footer-nav-link">Our Story</Link></li>
              <li><Link href="/journal" className="footer-nav-link">Journal</Link></li>
              <li><Link href="/gifting" className="footer-nav-link">Corporate Gifting</Link></li>
              <li><Link href="/stockists" className="footer-nav-link">Stockists</Link></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-nav-title">Help</h4>
            <ul className="footer-nav-list">
              <li><Link href="/faq" className="footer-nav-link">FAQ</Link></li>
              <li><Link href="/shipping" className="footer-nav-link">Shipping & Returns</Link></li>
              <li><Link href="/candle-care" className="footer-nav-link">Candle Care</Link></li>
              <li><Link href="/contact" className="footer-nav-link">Contact Us</Link></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="footer-bottom">
        <p className="footer-legal">© {year} Lantern. All rights reserved.</p>
        <div className="footer-legal-links">
          <Link href="/privacy" className="footer-legal-link">Privacy Policy</Link>
          <Link href="/terms" className="footer-legal-link">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
