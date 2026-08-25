/* Mullenaux Farms — scroll reveals, nav state, hero parallax, mailto drafts */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* The pre-drafted consultation and egg-order emails are plain mailto
     links in the markup, so they work with scripting unavailable. */

  /* ── Sticky nav state ────────────────────────────────── */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      nav.classList.toggle('is-stuck', window.scrollY > 24);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ─────────────────────────────────────── */
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Staggered reveals ───────────────────────────────── */
  var items = document.querySelectorAll('[data-reveal]');

  function revealAll() {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  if (reduced || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      var batch = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty('--d', (batch++ * 90) + 'ms');
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    items.forEach(function (el) { io.observe(el); });

    /* Anything scrolled past (deep link, restored position, or a
       missed callback) must never stay invisible. */
    var sweep = function () {
      items.forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('is-in');
          io.unobserve(el);
        }
      });
    };
    window.addEventListener('load', sweep);
    setTimeout(sweep, 400);
    setTimeout(revealAll, 4000);
  }

  /* ── Hero parallax (transform only) ──────────────────── */
  var hero = document.querySelector('[data-parallax]');
  if (hero && !reduced && window.matchMedia('(min-width: 861px)').matches) {
    var raf = false;
    var move = function () {
      if (raf) return;
      raf = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, window.innerHeight);
        hero.style.transform = 'translate3d(0,' + (y * 0.075).toFixed(2) + 'px,0) scale(1.06)';
        raf = false;
      });
    };
    window.addEventListener('scroll', move, { passive: true });
    move();
  }
})();
