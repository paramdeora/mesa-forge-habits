'use client';

import React, { useEffect, useRef, type ReactNode } from 'react';

interface RevealUpProps {
  children: ReactNode;
  delay?: number; // in seconds
  className?: string;
  as?: 'div' | 'article' | 'section' | 'span' | 'p';
}

export default function RevealUp({ children, delay = 0, className = '', as: Tag = 'div' }: RevealUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = delay ? ({ '--reveal-delay': `${delay}s` } as React.CSSProperties) : undefined;

  return React.createElement(
    Tag,
    { ref, className: `reveal-up ${className}`.trim(), style },
    children
  );
}
