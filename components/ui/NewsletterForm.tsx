'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Simulate success (replace with actual email service integration)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {status !== 'success' ? (
        <>
          <div className="newsletter-input-group">
            <input
              type="email"
              className="newsletter-input"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-label="Email address for newsletter"
            />
            <button type="submit" className="btn btn--light newsletter-submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </div>
          <p className="newsletter-privacy">
            By subscribing you agree to our{' '}
            <a href="/privacy">Privacy Policy</a>. Unsubscribe at any time.
          </p>
        </>
      ) : (
        <p className="newsletter-success">
          Thank you — welcome to the Lantern archive.
        </p>
      )}
    </form>
  );
}
