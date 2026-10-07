import type { Metadata } from 'next';
import { Suspense } from 'react';
import './thego.css';
import SvgSymbols from '@/components/SvgSymbols';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import ClientInteractions from '@/components/ClientInteractions';
import StructuredData from '@/components/StructuredData';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://energy.kimidev.net';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'TH-EGO — Điện mặt trời & kỹ thuật điện Đắk Lắk',
    template: '%s | TH-EGO Đắk Lắk',
  },
  description: 'Giải pháp điện mặt trời, lưu trữ năng lượng pin Lithium và thi công điện trọn gói cho gia đình & doanh nghiệp tại Đắk Lắk và khu vực Tây Nguyên.',
  applicationName: 'TH-EGO',
  authors: [{ name: 'TH-EGO', url: BASE_URL }],
  creator: 'CÔNG TY TNHH TM & DV KỸ THUẬT ĐIỆN TH-EGO',
  publisher: 'TH-EGO',
  keywords: [
    'điện mặt trời Đắk Lắk',
    'lắp điện mặt trời Buôn Ma Thuột',
    'hệ thống lưu trữ pin lithium',
    'inverter hybrid',
    'điện mặt trời áp mái',
    'thi công điện Tây Nguyên',
    'pin LiFePO4',
    'tủ điện ATS',
    'bảo trì điện mặt trời',
    'TH-EGO',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TH-EGO — Điện mặt trời & kỹ thuật điện Đắk Lắk',
    description: 'Giải pháp điện mặt trời, lưu trữ năng lượng và thi công điện trọn gói cho gia đình & doanh nghiệp tại Đắk Lắk.',
    url: BASE_URL,
    siteName: 'TH-EGO',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/assets/img/logo.png',
        width: 600,
        height: 600,
        alt: 'TH-EGO — Điện mặt trời & kỹ thuật điện Đắk Lắk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TH-EGO — Điện mặt trời & kỹ thuật điện Đắk Lắk',
    description: 'Giải pháp điện mặt trời, hệ thống lưu trữ pin Lithium và thi công điện trọn gói tại Đắk Lắk.',
    images: ['/assets/img/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/img/logo.png',
  },
  other: {
    // GEO Targeting Meta Tags
    'geo.region': 'VN-33',
    'geo.placename': 'Buôn Ma Thuột, Đắk Lắk, Việt Nam',
    'geo.position': '12.6806;108.0645',
    ICBM: '12.6806, 108.0645',
    'DC.title': 'TH-EGO — Điện mặt trời & kỹ thuật điện Đắk Lắk',
    'language': 'Vietnamese',
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
        <StructuredData />
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
