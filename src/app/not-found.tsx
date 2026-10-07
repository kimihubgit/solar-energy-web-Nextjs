import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '100px 20px' }}>
      <div className="container">
        <h1 style={{ fontSize: '72px', color: 'var(--g500)', marginBottom: '16px' }}>404</h1>
        <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Trang không tồn tại</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>
          Đường dẫn bạn truy cập có thể đã được thay đổi hoặc không tồn tại.
        </p>
        <Link href="/" className="btn btn-dark">
          Về trang chủ <svg><use href="#i-arrow" /></svg>
        </Link>
      </div>
    </main>
  );
}
