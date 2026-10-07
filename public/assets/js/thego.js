(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fineHover = matchMedia('(hover: hover)').matches;

  /* ================= Shared (every page) ================= */

  // Smooth inertia scrolling (Lenis). Falls back to native scrolling if the CDN is unreachable.
  // lerp-based (not duration-based) so the page follows the wheel immediately and eases out softly.
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: .1, wheelMultiplier: 1, touchMultiplier: 1.2, smoothWheel: true });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    lenis.stop();
  }
  const scrollToTarget = (target, opts = {}) => {
    if (lenis) lenis.scrollTo(target, { duration: 1.6, offset: typeof target === 'number' ? 0 : -80, ...opts });
    else if (typeof target === 'number') scrollTo({ top: target, behavior: 'smooth' });
    else target.scrollIntoView({ behavior: 'smooth' });
  };
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const t = id === '#' || id === '#top' ? 0 : $(id);
    if (t === null) return;
    e.preventDefault();
    scrollToTarget(t);
  }));

  // Preloader
  const done = () => { document.documentElement.classList.add('loaded'); document.body.classList.remove('loading'); if (lenis) lenis.start(); };
  addEventListener('load', () => setTimeout(done, 400));
  setTimeout(done, 2600);

  // Gallery rows: duplicate each track once so the marquee loops seamlessly
  $$('.gal-row').forEach(row => { const t = row.querySelector('.gal-track'); const c = t.cloneNode(true); c.setAttribute('aria-hidden', 'true'); row.appendChild(c); });

  // Split headings into words
  const splitNode = (node, c) => {
    [...node.childNodes].forEach(ch => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const s = document.createElement('span'); s.textContent = part; s.style.setProperty('--i', c.n++);
          w.appendChild(s); frag.appendChild(w);
        });
        ch.replaceWith(frag);
      } else if (ch.nodeType === 1 && ch.tagName !== 'BR' && ch.tagName.toLowerCase() !== 'svg') splitNode(ch, c);
    });
  };
  $$('.split').forEach(el => splitNode(el, { n: 0 }));

  // Header: scrolled / hide on scroll down, progress, back-to-top, parallax, gallery skew.
  // All scroll-driven work runs once per frame, using cached layout (no layout reads while scrolling).
  const header = $('.header'), prog = $('#progress'), totop = $('#totop'), ring = $('#totop circle');
  const par = reduce ? [] : $$('[data-speed]').map(el => ({ el, speed: parseFloat(el.dataset.speed), top: 0, h: 0 }));
  const galRows = $$('.gal-row'), gallery = $('.gallery');
  let maxY = 1, vh = innerHeight, galTop = 0, galH = 0, lastY = -1, prevY = 0, ticking = false, hidden = false, scrolled = null, topOn = null, skew = 0;
  const pageTop = el => { let y = 0; for (let n = el; n; n = n.offsetParent) y += n.offsetTop; return y; };
  const measure = () => {
    vh = innerHeight; maxY = Math.max(1, document.documentElement.scrollHeight - vh);
    par.forEach(p => { const box = p.el.parentElement; p.top = pageTop(box); p.h = box.offsetHeight; });
    if (gallery) { galTop = pageTop(gallery); galH = gallery.offsetHeight; }
  };
  const frame = () => {
    ticking = false;
    const y = scrollY;
    // Velocity skew on the gallery rows only, while the gallery is on screen; eases back to 0 when scrolling stops
    if (gallery && !reduce && galTop + galH > y && galTop < y + vh) {
      const target = Math.max(-4, Math.min(4, (y - prevY) * .12));
      skew += (target - skew) * .2;
      if (Math.abs(skew) < .02) skew = 0;
      galRows.forEach(r => r.style.transform = `skewY(${skew.toFixed(2)}deg)`);
      if (skew !== 0) onScroll();
    }
    if (y === lastY) { prevY = y; return; }
    const p = Math.min(y / maxY, 1);
    if (prog) prog.style.transform = `scaleX(${p})`;
    if (ring) ring.style.strokeDashoffset = 138.2 * (1 - p);
    if (scrolled !== (y > 20)) { scrolled = y > 20; header.classList.toggle('scrolled', scrolled); }
    const hide = y > 500 && y > prevY + 2 && !document.body.classList.contains('menu-open');
    if (hide !== hidden && (hide || y < prevY - 2)) { hidden = hide; header.classList.toggle('hidden', hidden); }
    if (totop && topOn !== (y > 600)) { topOn = y > 600; totop.classList.toggle('on', topOn); }
    par.forEach(o => {
      if (o.top + o.h < y || o.top > y + vh) return;
      o.el.style.transform = `translate3d(0,${((o.top - y) + o.h / 2 - vh / 2) * o.speed}px,0)`;
    });
    prevY = lastY = y;
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { measure(); onScroll(); });
  addEventListener('load', () => { measure(); onScroll(); });
  if ('ResizeObserver' in window) new ResizeObserver(() => measure()).observe(document.body);
  measure(); frame();
  if (totop) totop.addEventListener('click', () => scrollToTarget(0, { duration: 1.8 }));

  // Pause infinite animations in sections that are off screen
  const pauseIO = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('paused', !e.isIntersecting)), { rootMargin: '100px 0px' });
  $$('main > section, main > .marquees, .preloader').forEach(s => pauseIO.observe(s));

  // Menu: page links carry a static `active` class; in-page anchor links (home) follow the section on screen
  const links = $$('#menu a'), anchorLinks = links.filter(a => a.getAttribute('href').startsWith('#'));
  if (anchorLinks.length) {
    const secIO = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) anchorLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    anchorLinks.forEach(a => { const s = $(a.getAttribute('href')); if (s) secIO.observe(s); });
    const top = $('.hero, .page-hero'); if (top) secIO.observe(top); // no menu item → clears the highlight at the top
  }

  // Mobile menu
  $('#burger').addEventListener('click', () => document.body.classList.toggle('menu-open'));
  links.forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

  // Reveal + count-up
  const countUp = el => {
    const end = +el.dataset.count, dur = 1800, t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e).toLocaleString('vi-VN');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    en.target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(en.target);
  }), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal,.reveal-l,.split').forEach(el => io.observe(el));
  // Clipped elements are invisible to IntersectionObserver → watch their parent instead
  const clipIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.clip').forEach(c => c.classList.add('in'));
    clipIO.unobserve(e.target);
  }), { threshold: .1 });
  new Set($$('.clip').map(c => c.parentElement)).forEach(p => clipIO.observe(p));

  // Product cards: 3D tilt; buttons: magnetic hover (mouse devices only)
  const prods = $$('.prod');
  if (!reduce && fineHover) {
    prods.forEach(p => {
      p.addEventListener('mousemove', e => {
        const r = p.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        p.classList.add('tilting');
        p.style.setProperty('--ry', (x * 10) + 'deg'); p.style.setProperty('--rx', (-y * 10) + 'deg');
      });
      p.addEventListener('mouseleave', () => { p.classList.remove('tilting'); p.style.setProperty('--ry', '0deg'); p.style.setProperty('--rx', '0deg'); });
    });
    $$('.magnet').forEach(b => {
      b.addEventListener('mousemove', e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      b.addEventListener('mouseleave', () => b.style.transform = '');
    });
  }

  // Selects that submit their GET form on change (sort, category…)
  $$('[data-autosubmit]').forEach(s => s.addEventListener('change', () => s.form.submit()));

  // Toast
  const toast = $('#toast'); let tId;
  const show = msg => { toast.textContent = msg; toast.classList.add('on'); clearTimeout(tId); tId = setTimeout(() => toast.classList.remove('on'), 3200); };
  // Server flash message (Blade sets data-toast after a successful submit)
  if (toast.dataset.toast) setTimeout(() => show(toast.dataset.toast), 900);
  // DEMO ONLY – static HTML forms have no action; once Blade adds action="{{ route('leads.store') }}" this no longer applies
  $$('form.form:not([action])').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const name = (form.elements.name?.value || '').trim(), phone = (form.elements.phone?.value || '').trim();
    if (!name || !phone) return show('Vui lòng nhập họ tên và số điện thoại.');
    show('Cảm ơn ' + name + '! (Bản demo – form chưa gửi dữ liệu thật)');
    form.reset();
  }));

  // Nút "Sao chép liên kết" (bài viết, tin tuyển dụng)
  $$('[data-copy-link]').forEach(b => b.addEventListener('click', () => {
    const url = b.dataset.copyLink || location.href;
    (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => show('Đã sao chép liên kết.'), () => show(url));
  }));

  const year = $('#y'); if (year) year.textContent = new Date().getFullYear();

  /* ================= Home ================= */

  // Services: hover (or tap) a row → swap image + caption
  const svcItems = $$('.svc-item');
  if (svcItems.length) {
    const svcImgs = $$('.svc-visual img'), cap = $('#svc-cap');
    let svcCur = -1;
    const setSvc = i => {
      if (i === svcCur) return; svcCur = i;
      svcItems.forEach((el, k) => el.classList.toggle('on', k === i));
      svcImgs.forEach((im, k) => im.classList.toggle('on', k === i));
      const { title: t, desc: d, tags: tagStr = '' } = svcItems[i].dataset, tags = tagStr.split('|').filter(Boolean);
      cap.innerHTML = `<div class="swap"><div class="top"><b>${t}</b><span class="big">${String(i + 1).padStart(2, '0')}</span></div><p>${d}</p><ul>${tags.map(x => `<li>${x}</li>`).join('')}</ul></div>`;
    };
    svcItems.forEach((el, i) => {
      el.addEventListener('mouseenter', () => setSvc(i));
      el.addEventListener('click', () => {
        setSvc(i);
        // On phones the image card sits above the list: bring it into view after a tap
        const v = $('.svc-visual');
        if (innerWidth <= 900 && v.getBoundingClientRect().top < 60) scrollToTarget(v, { duration: 1 });
      });
    });
    setSvc(0);
  }

  // Solutions: hover (or tap) a panel → expand
  const panels = $$('.panel');
  panels.forEach(p => {
    const on = () => panels.forEach(o => o.classList.toggle('on', o === p));
    p.addEventListener('mouseenter', on); p.addEventListener('click', on);
  });

  // Savings calculator (rough estimate only)
  const bill = $('#bill');
  if (bill) {
    const fmt = n => Math.round(n).toLocaleString('vi-VN');
    const anim = (el, to, suffix = '', dec = 0) => {
      const from = parseFloat(el.dataset.v || 0), t0 = performance.now();
      el.dataset.v = to;
      const step = t => {
        const p = Math.min((t - t0) / 500, 1), v = from + (to - from) * (1 - Math.pow(1 - p, 3));
        el.textContent = (dec ? v.toFixed(dec).replace('.', ',') : fmt(v)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const calc = () => {
      const b = +bill.value, price = 2800, sun = 4.5, pr = 0.8;
      const kwh = b / price, kwp = Math.max(1, Math.ceil(kwh / (sun * pr * 30) * 2) / 2);
      const panelsN = Math.ceil(kwp * 1000 / 550), prod = kwp * sun * pr * 30;
      $('#bill-out').textContent = fmt(b) + 'đ';
      bill.style.setProperty('--fill', ((b - bill.min) / (bill.max - bill.min) * 100) + '%');
      anim($('#o-kwp'), kwp, '', 1); anim($('#o-panel'), panelsN); anim($('#o-area'), panelsN * 2.6 * 1.2);
      anim($('#o-kwh'), prod); anim($('#o-save'), Math.min(prod, kwh) * price * 0.85, 'đ');
    };
    bill.addEventListener('input', calc); calc();
  }

  // Home product tabs: client-side filter (buttons with data-f only; listing pages use real links)
  const ftabs = $$('.tab[data-f]');
  ftabs.forEach(tab => tab.addEventListener('click', () => {
    ftabs.forEach(t => t.classList.toggle('active', t === tab));
    const f = tab.dataset.f; let i = 0;
    prods.forEach(p => {
      const match = f === 'all' || p.dataset.c === f;
      p.classList.remove('show'); p.classList.toggle('hide', !match);
      if (match) { p.classList.add('in'); void p.offsetWidth; p.style.animationDelay = (i++ * .07) + 's'; p.classList.add('show'); }
    });
  }));

  /* ================= Product detail ================= */

  const pdMain = $('.pd-main');
  if (pdMain) {
    const mainImgs = $$('img', pdMain), thumbs = $$('.pd-thumb');
    thumbs.forEach((t, i) => t.addEventListener('click', () => {
      thumbs.forEach(o => o.classList.toggle('on', o === t));
      mainImgs.forEach((im, k) => im.classList.toggle('on', k === i));
    }));
    // Hover zoom follows the cursor (mouse devices only)
    if (fineHover && !reduce) {
      pdMain.addEventListener('mousemove', e => {
        const r = pdMain.getBoundingClientRect();
        pdMain.style.setProperty('--zx', ((e.clientX - r.left) / r.width * 100) + '%');
        pdMain.style.setProperty('--zy', ((e.clientY - r.top) / r.height * 100) + '%');
        pdMain.classList.add('zoom');
      });
      pdMain.addEventListener('mouseleave', () => pdMain.classList.remove('zoom'));
    }
  }

  // Generic tabs: [data-tabs] > .tab[data-tab="x"] toggles [data-panel="x"] inside the same [data-tabs-root]
  $$('[data-tabs-root]').forEach(root => {
    const btns = $$('[data-tab]', root), panes = $$('[data-panel]', root);
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(o => { o.classList.toggle('active', o === b); o.setAttribute('aria-selected', o === b); });
      panes.forEach(p => p.classList.toggle('on', p.dataset.panel === b.dataset.tab));
    }));
  });

  /* ================= page: projects (hệ theo tiền điện) ================= */
  const billTabs = $$('.bill-tab'), tiers = $$('.tier[data-tier]');
  if (billTabs.length && tiers.length) {
    const mark = key => {
      billTabs.forEach(b => b.classList.toggle('on', b.dataset.tier === key));
      tiers.forEach(t => t.classList.toggle('on', t.dataset.tier === key));
      const tab = billTabs.find(b => b.dataset.tier === key);
      if (tab && tab.parentElement.scrollWidth > tab.parentElement.clientWidth) tab.parentElement.scrollTo({ left: tab.offsetLeft - 16, behavior: 'smooth' });
    };
    billTabs.forEach(b => b.addEventListener('click', () => mark(b.dataset.tier)));
    const tierIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) mark(e.target.dataset.tier); }), { rootMargin: '-45% 0px -50% 0px' });
    tiers.forEach(t => tierIO.observe(t));
  }

  /* ================= page: projects-show (xem ảnh công trình) ================= */
  const pjShots = $$('.pj-gallery button');
  if (pjShots.length) {
    const lb = document.createElement('div');
    lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Xem ảnh công trình');
    lb.innerHTML = '<img alt=""><button class="lb-x" type="button" aria-label="Đóng">×</button><button class="lb-p" type="button" aria-label="Ảnh trước">‹</button><button class="lb-n" type="button" aria-label="Ảnh sau">›</button><div class="lb-c"></div>';
    document.body.appendChild(lb);
    const img = $('img', lb), cap = $('.lb-c', lb);
    let cur = 0, opener = null;
    const show = i => {
      cur = (i + pjShots.length) % pjShots.length;
      const s = $('img', pjShots[cur]);
      img.src = pjShots[cur].dataset.full || s.currentSrc || s.src; img.alt = s.alt;
      cap.textContent = (s.alt ? s.alt + ' · ' : '') + (cur + 1) + '/' + pjShots.length;
    };
    const open = i => { opener = document.activeElement; show(i); lb.classList.add('on'); if (lenis) lenis.stop(); requestAnimationFrame(() => $('.lb-x', lb).focus()); };
    const close = () => { lb.classList.remove('on'); if (lenis) lenis.start(); if (opener) opener.focus(); };
    pjShots.forEach((b, i) => b.addEventListener('click', () => open(i)));
    $('.lb-x', lb).addEventListener('click', close);
    $('.lb-p', lb).addEventListener('click', () => show(cur - 1));
    $('.lb-n', lb).addEventListener('click', () => show(cur + 1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    addEventListener('keydown', e => {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1);
    });
  }
})();
