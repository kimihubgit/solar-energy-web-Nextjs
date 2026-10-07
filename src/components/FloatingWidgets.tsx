'use client';

export default function FloatingWidgets() {
  return (
    <>
      {/* Preloader */}
      <div className="preloader" aria-hidden="true">
        <div className="pre-in">
          <div className="pre-logo"></div>
          <div className="pre-bar"><i></i></div>
          <div className="pre-txt">GREEN HOUSE · GREEN LIFE</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress" id="progress"></div>

      {/* Back To Top */}
      <button className="totop" id="totop" aria-label="Lên đầu trang">
        <svg className="ring" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="22" />
        </svg>
        <svg className="ar" viewBox="0 0 24 24">
          <use href="#i-arrow" />
        </svg>
      </button>

      {/* Floating Action Button */}
      <a href="tel:0949371919" className="fab" aria-label="Gọi ngay 094.937.1919">
        <svg viewBox="0 0 24 24">
          <use href="#i-phone" />
        </svg>
      </a>

      {/* Mobile Bottom Bar */}
      <nav className="mbar" aria-label="Liên hệ nhanh">
        <a className="call" href="tel:0949371919">
          <svg viewBox="0 0 24 24"><use href="#i-phone" /></svg>
          Gọi ngay
        </a>
        <a className="zalo" href="https://zalo.me/0949371919" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24"><use href="#i-chat" /></svg>
          Zalo
        </a>
        <a className="quote" href="/#lien-he">
          <svg viewBox="0 0 24 24"><use href="#i-doc" /></svg>
          Báo giá
        </a>
      </nav>

      {/* Toast Notification Container */}
      <div className="toast" id="toast" role="status"></div>
    </>
  );
}
