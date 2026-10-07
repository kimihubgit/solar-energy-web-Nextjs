import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'TH-EGO — Điện mặt trời & kỹ thuật điện Đắk Lắk',
  description: 'Giải pháp điện mặt trời, lưu trữ năng lượng và thi công điện trọn gói cho gia đình & doanh nghiệp tại Đắk Lắk.',
};

export default function HomePage() {
  const page = getPageByRoute('/');
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
