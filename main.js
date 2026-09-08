/**
 * Lantern — main.js
 * Premium interaction layer
 */

'use strict';

/* ── Utilities ────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Scroll Reveal ────────────────────────────────── */
function initReveal() {
  const targets = $$('.reveal-up');
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => io.observe(el));
}

/* ── Sticky Header ────────────────────────────────── */
function initStickyHeader() {
  const header = $('#siteHeader');
  if (!header) return;

  let lastScroll = 0;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 60);
    lastScroll = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Announcement Bar ─────────────────────────────── */
function initAnnouncementBar() {
  const bar   = $('#announcementBar');
  const close = $('#annClose');
  if (!bar || !close) return;

  const dismissed = sessionStorage.getItem('lantern-ann-dismissed');
  if (dismissed) { bar.classList.add('is-hidden'); return; }

  close.addEventListener('click', () => {
    bar.classList.add('is-hidden');
    sessionStorage.setItem('lantern-ann-dismissed', '1');
  });
}

/* ── Search ───────────────────────────────────────── */
function initSearch() {
  const toggle  = $('#searchToggle');
  const overlay = $('#searchOverlay');
  const closeBtn = $('#searchClose');
  const input   = $('#searchInput');
  if (!toggle || !overlay) return;

  const open  = () => { overlay.classList.add('is-open'); overlay.setAttribute('aria-hidden','false'); input?.focus(); };
  const close = () => { overlay.classList.remove('is-open'); overlay.setAttribute('aria-hidden','true'); };

  toggle.addEventListener('click', () => overlay.classList.contains('is-open') ? close() : open());
  closeBtn?.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('is-open')) close(); });
}

/* ── Mobile Menu ──────────────────────────────────── */
function initMobileMenu() {
  const hamburger = $('#navHamburger');
  const menu      = $('#mobileMenu');
  const closeBtn  = $('#mobileMenuClose');
  const overlay   = $('#mobileOverlay');
  if (!hamburger || !menu) return;

  const open = () => {
    menu.classList.add('is-open');
    overlay.classList.add('is-active');
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    menu.classList.remove('is-open');
    overlay.classList.remove('is-active');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ── Cart State ───────────────────────────────────── */
const CartStore = (() => {
  const STORAGE_KEY = 'lantern-cart';
  let items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

  const getAll = () => items;

  const add = (name, price = 1850) => {
    const existing = items.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      items.push({ name, price, qty: 1, scent: getScentFor(name), img: getImgFor(name) });
    }
    save();
  };

  const remove = (name) => {
    items = items.filter(i => i.name !== name);
    save();
  };

  const updateQty = (name, delta) => {
    const item = items.find(i => i.name === name);
    if (!item) return;
    item.qty = Math.max(0, item.qty + delta);
    if (item.qty === 0) remove(name);
    else save();
  };

  const total = () => items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = () => items.reduce((s, i) => s + i.qty, 0);

  return { getAll, add, remove, updateQty, total, count };
})();

const PRODUCT_DATA = {
  'Dusk Vetiver':   { scent: 'Vetiver · Sandalwood · Dark Musk',  img: 'product_card_1_1788712341526.png' },
  'Grey Cardamom':  { scent: 'Cardamom · Oud · Tonka Bean',       img: 'product_card_2_1788712370744.png' },
  'White Jasmine':  { scent: 'Jasmine · Neroli · Cedar',          img: 'product_card_3_1788712385453.png' },
  'Amber Rain':     { scent: 'Petrichor · Amber · Patchouli',     img: 'product_card_4_1788713547615.png' },
};
function getScentFor(name) { return PRODUCT_DATA[name]?.scent || ''; }
function getImgFor(name)   { return PRODUCT_DATA[name]?.img   || 'hero_candle_1788712275307.png'; }

/* ── Cart Drawer ──────────────────────────────────── */
function initCart() {
  const cartToggle  = $('#cartToggle');
  const cartClose   = $('#cartClose');
  const cartDrawer  = $('#cartDrawer');
  const cartOverlay = $('#cartOverlay');
  const cartCount   = $('#cartCount');
  const cartBody    = $('#cartBody');
  const cartEmpty   = $('#cartEmpty');
  const cartItemsEl = $('#cartItems');
  const cartFooter  = $('#cartFooter');
  const cartSubtotal = $('#cartSubtotal');
  if (!cartToggle || !cartDrawer) return;

  const openCart  = () => {
    renderCart();
    cartDrawer.classList.add('is-open');
    cartOverlay.classList.add('is-active');
    cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeCart = () => {
    cartDrawer.classList.remove('is-open');
    cartOverlay.classList.remove('is-active');
    cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  cartToggle.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

  const renderCart = () => {
    const items = CartStore.getAll();
    const cnt   = CartStore.count();

    // Update count badge
    cartCount.textContent = cnt;
    cartCount.classList.toggle('is-visible', cnt > 0);
    cartToggle.setAttribute('aria-label', `Cart (${cnt} items)`);

    if (items.length === 0) {
      cartEmpty.hidden = false;
      cartItemsEl.innerHTML = '';
      cartFooter.hidden = true;
    } else {
      cartEmpty.hidden = true;
      cartFooter.hidden = false;
      cartSubtotal.textContent = `₹${CartStore.total().toLocaleString('en-IN')}`;

      cartItemsEl.innerHTML = items.map(item => `
        <li class="cart-item" data-name="${escHtml(item.name)}">
          <img src="${escHtml(item.img)}" alt="${escHtml(item.name)}" class="cart-item-img" loading="lazy">
          <div>
            <p class="cart-item-name">${escHtml(item.name)}</p>
            <p class="cart-item-scent">${escHtml(item.scent)}</p>
            <div class="cart-item-qty">
              <button aria-label="Decrease quantity" data-action="dec" data-name="${escHtml(item.name)}">−</button>
              <span>${item.qty}</span>
              <button aria-label="Increase quantity" data-action="inc" data-name="${escHtml(item.name)}">+</button>
            </div>
            <button class="cart-item-remove" data-action="remove" data-name="${escHtml(item.name)}">Remove</button>
          </div>
          <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
        </li>
      `).join('');
    }
  };

  // Delegate cart interactions
  cartItemsEl?.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const { action, name } = btn.dataset;
    if (action === 'inc')    CartStore.updateQty(name, +1);
    if (action === 'dec')    CartStore.updateQty(name, -1);
    if (action === 'remove') CartStore.remove(name);
    renderCart();
  });

  // Quick add buttons
  document.addEventListener('click', e => {
    const btn = e.target.closest('.product-card-quick-add');
    if (!btn) return;
    const name = btn.dataset.product;
    if (!name) return;
    CartStore.add(name);
    renderCart();
    // Flash feedback
    btn.textContent = 'Added ✓';
    btn.style.background = 'var(--c-cognac)';
    btn.style.color = 'var(--c-white)';
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.style.background = '';
      btn.style.color = '';
    }, 1600);
    // Open cart briefly
    openCart();
  });

  // Initial render (restore from localStorage)
  renderCart();
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Newsletter ───────────────────────────────────── */
function initNewsletter() {
  const form    = $('#newsletterForm');
  const input   = $('#newsletterEmail');
  const success = $('#newsletterSuccess');
  if (!form || !input) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      success.textContent = 'Please enter a valid email address.';
      success.style.color = 'var(--c-cognac)';
      return;
    }
    success.textContent = 'Thank you. We\'ll be in touch — quietly.';
    success.style.color = 'var(--c-cognac)';
    input.value = '';
  });
}

/* ── Parallax (light, performance-safe) ───────────── */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero = $('.hero-media');
  if (!hero) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        hero.style.transform = `translateY(${y * 0.25}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ── Page Load animation ──────────────────────────── */
function initPageLoad() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
}

/* ── Keyboard navigation ──────────────────────────── */
function initA11y() {
  // Tab trap for open drawers
  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const drawer = $('.cart-drawer.is-open, .mobile-menu.is-open');
    if (!drawer) return;
    const focusable = $$('button, a, input, [tabindex]:not([tabindex="-1"])', drawer).filter(el => !el.disabled && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  });
}

/* ── Image lazy load enhancement ─────────────────── */
function initImages() {
  // Add smooth fade-in for lazy images
  $$('img[loading="lazy"]').forEach(img => {
    img.style.transition = 'opacity 0.4s ease';
    if (!img.complete) {
      img.style.opacity = '0';
      img.addEventListener('load', () => { img.style.opacity = '1'; });
    }
  });
}

/* ── INIT ─────────────────────────────────────────── */
function init() {
  initAnnouncementBar();
  initStickyHeader();
  initSearch();
  initMobileMenu();
  initCart();
  initReveal();
  initNewsletter();
  initImages();
  initA11y();
  initPageLoad();

  // Only enable parallax on large screens
  if (window.innerWidth > 860) initParallax();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
