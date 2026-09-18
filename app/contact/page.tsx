'use client';

import { useState } from 'react';
import Link from 'next/link';
import RevealUp from '@/components/ui/RevealUp';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Corporate & Bespoke Gifting',
    quantity: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section" style={{ background: 'var(--c-ivory)', minHeight: '80vh' }}>
      <div className="container container--narrow" style={{ paddingBlock: 'clamp(2rem,5vw,5rem)' }}>
        <RevealUp>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4.5rem)' }}>
            <span className="section-label" style={{ display: 'block' }}>Get in Touch</span>
            <h1 className="section-title">We are here to help.</h1>
            <p style={{ fontSize: 'var(--t-base)', color: 'var(--c-charcoal)', lineHeight: 1.85, maxWidth: 520, marginInline: 'auto', marginTop: '1rem' }}>
              Whether you are looking for custom corporate gifts, have a question about an order, or simply wish to discuss fragrance profiles — we would love to hear from you.
            </p>
          </div>
        </RevealUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem' }}>
          {/* Contact Details */}
          <RevealUp>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-xl)', color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                  Direct Enquiries
                </h3>
                <p style={{ fontSize: 'var(--t-sm)', color: 'var(--c-charcoal)', lineHeight: 1.8 }}>
                  Email:{' '}
                  <a href="mailto:hello@lanterncandles.in" style={{ color: 'var(--c-ink)', textDecoration: 'underline' }}>
                    hello@lanterncandles.in
                  </a>
                  <br />
                  Response within 24 hours on business days.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-xl)', color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                  Corporate & Event Gifting
                </h3>
                <p style={{ fontSize: 'var(--t-sm)', color: 'var(--c-charcoal)', lineHeight: 1.8 }}>
                  For orders of 10 or more units, wedding favours, or corporate gifting suites with custom branding, our gifting concierge is ready to assist.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-xl)', color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                  Studio & Dispatch
                </h3>
                <p style={{ fontSize: 'var(--t-sm)', color: 'var(--c-charcoal)', lineHeight: 1.8 }}>
                  Hand-poured and dispatched with care across India. Express courier tracking supplied with every shipment.
                </p>
              </div>
            </div>
          </RevealUp>

          {/* Form */}
          <RevealUp delay={0.1}>
            <div style={{ background: 'var(--c-white)', padding: '2.5rem', border: '1px solid var(--c-border-light)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem', color: 'var(--c-cognac)' }}>✓</span>
                  <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--t-2xl)', color: 'var(--c-ink)', marginBottom: '0.75rem' }}>
                    Thank you.
                  </h3>
                  <p style={{ fontSize: 'var(--t-sm)', color: 'var(--c-charcoal)', lineHeight: 1.85, marginBottom: '2rem' }}>
                    Your message has been received. Our team will review your enquiry and respond within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn--outline btn--sm">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--f-sans)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Radhika Mehta"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--c-border)',
                        background: 'var(--c-ivory)',
                        fontFamily: 'var(--f-sans)',
                        fontSize: 'var(--t-sm)',
                        color: 'var(--c-ink)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--f-sans)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. radhika@example.com"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--c-border)',
                        background: 'var(--c-ivory)',
                        fontFamily: 'var(--f-sans)',
                        fontSize: 'var(--t-sm)',
                        color: 'var(--c-ink)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--f-sans)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                      Enquiry Purpose
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--c-border)',
                        background: 'var(--c-ivory)',
                        fontFamily: 'var(--f-sans)',
                        fontSize: 'var(--t-sm)',
                        color: 'var(--c-ink)',
                        outline: 'none',
                      }}
                    >
                      <option value="Corporate & Bespoke Gifting">Corporate & Bespoke Gifting (10+ units)</option>
                      <option value="Wedding & Event Favours">Wedding & Event Favours</option>
                      <option value="Order Tracking & Support">Order Tracking & Support</option>
                      <option value="Product & Scent Inquiry">Product & Scent Inquiry</option>
                      <option value="Stockist & Retail Partnership">Stockist & Retail Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--f-sans)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                      Estimated Units (for Gifting)
                    </label>
                    <input
                      type="text"
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      placeholder="e.g. 25 boxes / 50 candles (optional)"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--c-border)',
                        background: 'var(--c-ivory)',
                        fontFamily: 'var(--f-sans)',
                        fontSize: 'var(--t-sm)',
                        color: 'var(--c-ink)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--f-sans)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your requirements, timeline, or questions..."
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--c-border)',
                        background: 'var(--c-ivory)',
                        fontFamily: 'var(--f-sans)',
                        fontSize: 'var(--t-sm)',
                        color: 'var(--c-ink)',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <button type="submit" className="btn btn--primary btn--full" style={{ marginTop: '0.5rem' }}>
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </RevealUp>
        </div>
      </div>
    </section>
  );
}
