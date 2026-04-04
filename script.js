/* ============================================
   SPOKEN — Interactions & Animations
   ============================================ */

/* ─── NAV SCROLL STATE ──────────────────────── */
const nav = document.getElementById('nav');

function updateNav() {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ─── MOBILE DRAWER ─────────────────────────── */
const hamburger  = document.querySelector('.nav__hamburger');
const drawer     = document.getElementById('navDrawer');
const overlay    = document.getElementById('navOverlay');
const closeBtn   = document.querySelector('.nav__drawer-close');
const drawerLinks = document.querySelectorAll('.nav__drawer a');

function openDrawer() {
  drawer.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
overlay?.addEventListener('click', closeDrawer);
drawerLinks.forEach(l => l.addEventListener('click', closeDrawer));

/* ─── SCROLL REVEAL ─────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ─── HERO PARALLAX ─────────────────────────── */
const heroBlobs = document.querySelector('.hero__blobs');

function parallaxHero() {
  if (!heroBlobs) return;
  const y = window.scrollY;
  heroBlobs.style.transform = `translateY(${y * 0.3}px)`;
}

// Only apply parallax on non-touch devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  window.addEventListener('scroll', parallaxHero, { passive: true });
}

/* ─── BLOB MOUSE PARALLAX (hero desktop) ────── */
const blobCoral    = document.querySelector('.blob--coral');
const blobLavender = document.querySelector('.blob--lavender');
const blobGold     = document.querySelector('.blob--gold');

function handleMouseMove(e) {
  if (window.innerWidth < 860) return;
  const x = (e.clientX / window.innerWidth  - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  if (blobCoral)    blobCoral.style.transform    = `translate(${x * 18}px, ${y * 14}px)`;
  if (blobLavender) blobLavender.style.transform = `translate(${x * -14}px, ${y * 18}px)`;
  if (blobGold)     blobGold.style.transform     = `translate(${x * 20}px, ${y * -12}px)`;
}

if (!prefersReducedMotion) {
  document.addEventListener('mousemove', handleMouseMove, { passive: true });
}

/* ─── SMOOTH SCROLL for anchor links ──────────  */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = nav ? nav.offsetHeight : 0;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── CURSOR GLOW (subtle, desktop only) ────── */
if (!prefersReducedMotion && window.innerWidth > 860) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196,98,42,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.4s ease, top 0.4s ease;
    left: -999px;
    top: -999px;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
}

/* ─── MARQUEE PAUSE on hover (via CSS) ─────────
   Already handled in CSS with strip:hover — nothing to add here.
   ──────────────────────────────────────────── */
