import type { Metadata } from 'next';
import { Suspense } from 'react';
import './thego.css';
import SvgSymbols from '@/components/SvgSymbols';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import ClientInteractions from '@/components/ClientInteractions';

export const metadata: Metadata = {
  title: 'TH-EGO — Điện mặt trời & kỹ thuật điện Đắk Lắk',
  description: 'Giải pháp điện mặt trời, lưu trữ năng lượng và thi công điện trọn gói cho gia đình & doanh nghiệp tại Đắk Lắk.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="loading">
        <SvgSymbols />
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        {children}
        <Footer />
        <FloatingWidgets />
        <Suspense fallback={null}>
          <ClientInteractions />
        </Suspense>
      </body>
    </html>
  );
}
