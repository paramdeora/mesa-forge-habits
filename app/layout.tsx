import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/cart/CartContext';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mesa-five-jet.vercel.app'),
  title: { template: '%s — Lantern', default: 'Lantern — Premium Scented Candles' },
  description: 'Premium handpoured scented candles made in India. Crafted with natural coconut-soy wax and fine fragrance-grade oils.',
  openGraph: {
    type: 'website',
    siteName: 'Lantern',
    title: 'Lantern — Premium Scented Candles',
    description: 'Premium handpoured scented candles made in India.',
    images: [{ url: '/images/hero_candle_1788712275307.png', width: 1200, height: 630, alt: 'Lantern Scented Candles' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
