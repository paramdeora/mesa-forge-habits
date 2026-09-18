'use client';

import { useState, useEffect } from 'react';

const MESSAGES = [
  'Complimentary shipping on orders above ₹1,500',
  <>New Collection: <em>Monsoon Noir</em> — Now Available</>,
  'Handpoured in small batches across India',
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('lantern-ann-dismissed');
    if (dismissed) setVisible(false);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('lantern-ann-dismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  // Duplicate for smooth CSS ticker
  const items = [...MESSAGES, ...MESSAGES, ...MESSAGES];

  return (
    <div className="announcement-bar" id="announcementBar">
      <div className="announcement-inner">
        {items.map((msg, i) => (
          <span key={i}>
            {msg}
            {i < items.length - 1 && <span className="ann-sep"> · </span>}
          </span>
        ))}
      </div>
      <button className="ann-close" onClick={dismiss} aria-label="Close announcement">×</button>
    </div>
  );
}
