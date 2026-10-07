'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientInteractions() {
  const pathname = usePathname();

  useEffect(() => {
    const $ = (s: string, r: ParentNode = document): HTMLElement | null => r.querySelector(s);
    const $$ = (s: string, r: ParentNode = document): HTMLElement[] => Array.from(r.querySelectorAll(s));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fineHover = window.matchMedia('(hover: hover)').matches;

    // Preloader completion
    const done = () => {
      document.documentElement.classList.add('loaded');
      document.body.classList.remove('loading');
    };
    const tPre = setTimeout(done, 500);

    // Toast helper
    const toast = $('#toast');
    let toastTimer: ReturnType<typeof setTimeout>;
    const showToast = (msg: string) => {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('on');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('on'), 3200);
    };

    // Smooth Anchor Scroll
    const scrollToTarget = (target: Element | number, opts: Record<string, unknown> = {}) => {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id) return;
      const t = id === '#' || id === '#top' ? 0 : $(id);
      if (t === null) return;
      e.preventDefault();
      scrollToTarget(t);
    };
    document.addEventListener('click', handleAnchorClick);

    // Gallery rows marquee clone
    $$('.gal-row').forEach(row => {
      if (row.getAttribute('data-duplicated') === 'true') return;
      row.setAttribute('data-duplicated', 'true');
      const t = row.querySelector('.gal-track');
      if (t) {
        const c = t.cloneNode(true) as HTMLElement;
        c.setAttribute('aria-hidden', 'true');
        row.appendChild(c);
      }
    });

    // Split text into word spans
    const splitNode = (node: Node, c: { n: number }) => {
      Array.from(node.childNodes).forEach(ch => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          (ch.textContent || '').split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(' '));
              return;
            }
            const w = document.createElement('span');
            w.className = 'w';
            const s = document.createElement('span');
            s.textContent = part;
            s.style.setProperty('--i', String(c.n++));
            w.appendChild(s);
            frag.appendChild(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1 && (ch as HTMLElement).tagName !== 'BR' && (ch as HTMLElement).tagName.toLowerCase() !== 'svg') {
          splitNode(ch, c);
        }
      });
    };
    $$('.split:not(.is-split)').forEach(el => {
      el.classList.add('is-split');
      splitNode(el, { n: 0 });
    });

    // Header & Scroll
    const header = $('.header');
    const prog = $('#progress');
    const totop = $('#totop');
    const ring = $('#totop circle') as SVGCircleElement | null;
    const par = reduce ? [] : $$('[data-speed]').map(el => ({
      el,
      speed: parseFloat(el.getAttribute('data-speed') || '0'),
      top: 0,
      h: 0
    }));
    const galRows = $$('.gal-row');
    const gallery = $('.gallery');

    let maxY = 1;
    let vh = window.innerHeight;
    let galTop = 0;
    let galH = 0;
    let lastY = -1;
    let prevY = 0;
    let ticking = false;
    let hidden = false;
    let scrolled: boolean | null = null;
    let topOn: boolean | null = null;
    let skew = 0;

    const pageTop = (el: HTMLElement | null): number => {
      let y = 0;
      for (let n = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
      return y;
    };

    const measure = () => {
      vh = window.innerHeight;
      maxY = Math.max(1, document.documentElement.scrollHeight - vh);
      par.forEach(p => {
        const box = p.el.parentElement;
        p.top = pageTop(box);
        p.h = box ? box.offsetHeight : 0;
      });
      if (gallery) {
        galTop = pageTop(gallery);
        galH = gallery.offsetHeight;
      }
    };

    const frame = () => {
      ticking = false;
      const y = window.scrollY;

      if (gallery && !reduce && galTop + galH > y && galTop < y + vh) {
        const target = Math.max(-4, Math.min(4, (y - prevY) * 0.12));
        skew += (target - skew) * 0.2;
        if (Math.abs(skew) < 0.02) skew = 0;
        galRows.forEach(r => (r.style.transform = `skewY(${skew.toFixed(2)}deg)`));
      }

      if (y === lastY) {
        prevY = y;
        return;
      }

      const p = Math.min(y / maxY, 1);
      if (prog) prog.style.transform = `scaleX(${p})`;
      if (ring) ring.style.strokeDashoffset = String(138.2 * (1 - p));

      if (scrolled !== (y > 20)) {
        scrolled = y > 20;
        if (header) header.classList.toggle('scrolled', scrolled);
      }

      const hide = y > 500 && y > prevY + 2 && !document.body.classList.contains('menu-open');
      if (hide !== hidden && (hide || y < prevY - 2)) {
        hidden = hide;
        if (header) header.classList.toggle('hidden', hidden);
      }

      if (totop && topOn !== (y > 600)) {
        topOn = y > 600;
        totop.classList.toggle('on', topOn);
      }

      par.forEach(o => {
        if (o.top + o.h < y || o.top > y + vh) return;
        o.el.style.transform = `translate3d(0,${((o.top - y) + o.h / 2 - vh / 2) * o.speed}px,0)`;
      });

      prevY = lastY = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    measure();
    frame();

    if (totop) {
      totop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Pause animations off screen
    const pauseIO = new IntersectionObserver(es => {
      es.forEach(e => e.target.classList.toggle('paused', !e.isIntersecting));
    }, { rootMargin: '100px 0px' });
    $$('main > section, main > .marquees, .preloader').forEach(s => pauseIO.observe(s));

    // Reveal + Count-up
    const countUp = (el: HTMLElement) => {
      const end = +(el.dataset.count || 0);
      const dur = 1800;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * e).toLocaleString('vi-VN');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        en.target.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal:not(.in), .reveal-l:not(.in), .split:not(.in)').forEach(el => io.observe(el));

    const clipIO = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.clip').forEach(c => c.classList.add('in'));
        clipIO.unobserve(e.target);
      });
    }, { threshold: 0.1 });
    new Set($$('.clip').map(c => c.parentElement).filter(Boolean)).forEach(p => p && clipIO.observe(p));

    // 3D Tilt & Magnetic
    const prods = $$('.prod');
    if (!reduce && fineHover) {
      prods.forEach(p => {
        p.onmousemove = e => {
          const r = p.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          p.classList.add('tilting');
          p.style.setProperty('--ry', x * 10 + 'deg');
          p.style.setProperty('--rx', -y * 10 + 'deg');
        };
        p.onmouseleave = () => {
          p.classList.remove('tilting');
          p.style.setProperty('--ry', '0deg');
          p.style.setProperty('--rx', '0deg');
        };
      });

      $$('.magnet').forEach(b => {
        b.onmousemove = e => {
          const r = b.getBoundingClientRect();
          b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
        };
        b.onmouseleave = () => {
          b.style.transform = '';
        };
      });
    }

    // Services switcher
    const svcItems = $$('.svc-item');
    if (svcItems.length) {
      const svcImgs = $$('.svc-visual img');
      const cap = $('#svc-cap');
      let svcCur = -1;
      const setSvc = (i: number) => {
        if (i === svcCur) return;
        svcCur = i;
        svcItems.forEach((el, k) => el.classList.toggle('on', k === i));
        svcImgs.forEach((im, k) => im.classList.toggle('on', k === i));
        const { title: t = '', desc: d = '', tags: tagStr = '' } = svcItems[i].dataset;
        const tags = tagStr.split('|').filter(Boolean);
        if (cap) {
          cap.innerHTML = `<div class="swap"><div class="top"><b>${t}</b><span class="big">${String(i + 1).padStart(2, '0')}</span></div><p>${d}</p><ul>${tags.map(x => `<li>${x}</li>`).join('')}</ul></div>`;
        }
      };
      svcItems.forEach((el, i) => {
        el.onmouseenter = () => setSvc(i);
        el.onclick = () => {
          setSvc(i);
          const v = $('.svc-visual');
          if (window.innerWidth <= 900 && v && v.getBoundingClientRect().top < 60) {
            v.scrollIntoView({ behavior: 'smooth' });
          }
        };
      });
      setSvc(0);
    }

    // Solutions expandable panels
    const panels = $$('.panel');
    panels.forEach(p => {
      const on = () => panels.forEach(o => o.classList.toggle('on', o === p));
      p.onmouseenter = on;
      p.onclick = on;
    });

    // Savings Calculator
    const bill = $('#bill') as HTMLInputElement | null;
    if (bill) {
      const fmt = (n: number) => Math.round(n).toLocaleString('vi-VN');
      const anim = (el: HTMLElement | null, to: number, suffix = '', dec = 0) => {
        if (!el) return;
        const from = parseFloat(el.dataset.v || '0');
        const t0 = performance.now();
        el.dataset.v = String(to);
        const step = (t: number) => {
          const p = Math.min((t - t0) / 500, 1);
          const v = from + (to - from) * (1 - Math.pow(1 - p, 3));
          el.textContent = (dec ? v.toFixed(dec).replace('.', ',') : fmt(v)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const calc = () => {
        const b = +bill.value;
        const price = 2800;
        const sun = 4.5;
        const pr = 0.8;
        const kwh = b / price;
        const kwp = Math.max(1, Math.ceil(kwh / (sun * pr * 30) * 2) / 2);
        const panelsN = Math.ceil(kwp * 1000 / 550);
        const prod = kwp * sun * pr * 30;
        const billOut = $('#bill-out');
        if (billOut) billOut.textContent = fmt(b) + 'đ';
        bill.style.setProperty('--fill', ((b - +bill.min) / (+bill.max - +bill.min) * 100) + '%');
        anim($('#o-kwp'), kwp, '', 1);
        anim($('#o-panel'), panelsN);
        anim($('#o-area'), panelsN * 2.6 * 1.2);
        anim($('#o-kwh'), prod);
        anim($('#o-save'), Math.min(prod, kwh) * price * 0.85, 'đ');
      };
      bill.oninput = calc;
      calc();
    }

    // Product Category Tabs (Home & listing)
    const ftabs = $$('.tab[data-f]');
    ftabs.forEach(tab => {
      tab.onclick = () => {
        ftabs.forEach(t => t.classList.toggle('active', t === tab));
        const f = tab.dataset.f;
        let i = 0;
        prods.forEach(p => {
          const match = f === 'all' || p.dataset.c === f;
          p.classList.remove('show');
          p.classList.toggle('hide', !match);
          if (match) {
            p.classList.add('in');
            void p.offsetWidth;
            p.style.animationDelay = (i++ * 0.07) + 's';
            p.classList.add('show');
          }
        });
      };
    });

    // Product detail image zoom & thumbnail selector
    const pdMain = $('.pd-main');
    if (pdMain) {
      const mainImgs = $$('img', pdMain);
      const thumbs = $$('.pd-thumb');
      thumbs.forEach((t, i) => {
        t.onclick = () => {
          thumbs.forEach(o => o.classList.toggle('on', o === t));
          mainImgs.forEach((im, k) => im.classList.toggle('on', k === i));
        };
      });
      if (fineHover && !reduce) {
        pdMain.onmousemove = e => {
          const r = pdMain.getBoundingClientRect();
          pdMain.style.setProperty('--zx', ((e.clientX - r.left) / r.width * 100) + '%');
          pdMain.style.setProperty('--zy', ((e.clientY - r.top) / r.height * 100) + '%');
          pdMain.classList.add('zoom');
        };
        pdMain.onmouseleave = () => pdMain.classList.remove('zoom');
      }
    }

    // Generic tabs: [data-tabs-root]
    $$('[data-tabs-root]').forEach(root => {
      const btns = $$('[data-tab]', root);
      const panes = $$('[data-panel]', root);
      btns.forEach(b => {
        b.onclick = () => {
          btns.forEach(o => {
            o.classList.toggle('active', o === b);
            o.setAttribute('aria-selected', String(o === b));
          });
          panes.forEach(p => p.classList.toggle('on', p.dataset.panel === b.dataset.tab));
        };
      });
    });

    // Bill tier tabs (Dự án theo tiền điện)
    const billTabs = $$('.bill-tab');
    const tiers = $$('.tier[data-tier]');
    if (billTabs.length && tiers.length) {
      const mark = (key?: string) => {
        if (!key) return;
        billTabs.forEach(b => b.classList.toggle('on', b.dataset.tier === key));
        tiers.forEach(t => t.classList.toggle('on', t.dataset.tier === key));
        const tab = billTabs.find(b => b.dataset.tier === key);
        if (tab && tab.parentElement && tab.parentElement.scrollWidth > tab.parentElement.clientWidth) {
          tab.parentElement.scrollTo({ left: tab.offsetLeft - 16, behavior: 'smooth' });
        }
      };
      billTabs.forEach(b => {
        b.onclick = () => mark(b.dataset.tier);
      });
      const tierIO = new IntersectionObserver(es => {
        es.forEach(e => {
          if (e.isIntersecting) mark((e.target as HTMLElement).dataset.tier);
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      tiers.forEach(t => tierIO.observe(t));
    }

    // Project Gallery Lightbox
    const pjShots = $$('.pj-gallery button');
    if (pjShots.length) {
      let lb = $('.lb') as HTMLElement | null;
      if (!lb) {
        lb = document.createElement('div');
        lb.className = 'lb';
        lb.setAttribute('role', 'dialog');
        lb.setAttribute('aria-modal', 'true');
        lb.setAttribute('aria-label', 'Xem ảnh công trình');
        lb.innerHTML = '<img alt=""><button class="lb-x" type="button" aria-label="Đóng">×</button><button class="lb-p" type="button" aria-label="Ảnh trước">‹</button><button class="lb-n" type="button" aria-label="Ảnh sau">›</button><div class="lb-c"></div>';
        document.body.appendChild(lb);
      }
      const img = $('img', lb) as HTMLImageElement;
      const cap = $('.lb-c', lb);
      let cur = 0;
      const showPj = (i: number) => {
        cur = (i + pjShots.length) % pjShots.length;
        const s = $('img', pjShots[cur]) as HTMLImageElement | null;
        if (s && img) {
          img.src = pjShots[cur].dataset.full || s.currentSrc || s.src;
          img.alt = s.alt;
        }
        if (cap && s) {
          cap.textContent = (s.alt ? s.alt + ' · ' : '') + (cur + 1) + '/' + pjShots.length;
        }
      };
      const openPj = (i: number) => {
        showPj(i);
        if (lb) lb.classList.add('on');
      };
      const closePj = () => {
        if (lb) lb.classList.remove('on');
      };

      pjShots.forEach((b, i) => {
        b.onclick = () => openPj(i);
      });
      const closeBtn = $('.lb-x', lb);
      if (closeBtn) closeBtn.onclick = closePj;
      const prevBtn = $('.lb-p', lb);
      if (prevBtn) prevBtn.onclick = () => showPj(cur - 1);
      const nextBtn = $('.lb-n', lb);
      if (nextBtn) nextBtn.onclick = () => showPj(cur + 1);
      lb.onclick = e => {
        if (e.target === lb) closePj();
      };
    }

    // Copy link buttons
    $$('[data-copy-link]').forEach(b => {
      b.onclick = () => {
        const url = b.dataset.copyLink || window.location.href;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(
            () => showToast('Đã sao chép liên kết.'),
            () => showToast(url)
          );
        } else {
          showToast(url);
        }
      };
    });

    // Form submission handling
    $$('form').forEach(form => {
      form.onsubmit = e => {
        e.preventDefault();
        const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]');
        const phoneInput = form.querySelector<HTMLInputElement>('input[name="phone"]');
        const name = (nameInput?.value || '').trim();
        const phone = (phoneInput?.value || '').trim();
        if (!name || !phone) {
          showToast('Vui lòng nhập họ tên và số điện thoại.');
          return;
        }
        showToast('Cảm ơn ' + name + '! TH-EGO đã ghi nhận thông tin và sẽ liên hệ sớm nhất.');
        (form as HTMLFormElement).reset();
      };
    });

    return () => {
      clearTimeout(tPre);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      pauseIO.disconnect();
      io.disconnect();
      clipIO.disconnect();
    };
  }, [pathname]);

  return null;
}
