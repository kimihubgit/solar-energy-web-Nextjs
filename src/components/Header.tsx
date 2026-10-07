'use client';

import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    if (next) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const navLinks = [
    { label: 'Giới thiệu', href: pathname === '/' ? '#gioi-thieu' : '/#gioi-thieu', rootMatch: false },
    { label: 'Dịch vụ', href: '/dich-vu', rootMatch: pathname?.startsWith('/dich-vu') },
    { label: 'Sản phẩm', href: '/san-pham', rootMatch: pathname?.startsWith('/san-pham') },
    { label: 'Dự án', href: '/du-an', rootMatch: pathname?.startsWith('/du-an') },
    { label: 'Tin tức', href: '/tin-tuc', rootMatch: pathname?.startsWith('/tin-tuc') },
    { label: 'Tuyển dụng', href: '/tuyen-dung', rootMatch: pathname?.startsWith('/tuyen-dung') },
    { label: 'Liên hệ', href: '/lien-he', rootMatch: pathname === '/lien-he' },
  ];

  const contactHref = pathname === '/' ? '#lien-he' : '/lien-he';

  return (
    <header className="header" id="top">
      <div className="container nav">
        <a href="/" className="brand" aria-label="TH-EGO trang chủ" onClick={closeMenu}>
          <span className="logo-mark" role="img" aria-label="Logo TH-EGO"></span>
          <span className="brand-name">TH-<b>EGO</b></span>
          <span className="brand-tag">Green house<br />Green life</span>
        </a>
        <nav className="menu" id="menu">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={item.rootMatch ? 'active' : ''}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href={contactHref} className="btn btn-accent btn-sm magnet" onClick={closeMenu}>
          Nhận tư vấn <svg><use href="#i-arrow" /></svg>
        </a>
        <button
          className="burger"
          id="burger"
          aria-label="Mở menu"
          onClick={toggleMenu}
        >
          <span></span>
        </button>
      </div>
    </header>
  );
}
