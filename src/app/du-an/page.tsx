import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dự án đã thi công — TH-EGO Đắk Lắk',
  description: 'Các công trình điện mặt trời áp mái, hệ hybrid lưu trữ và thi công điện đã bàn giao tại Đắk Lắk và Tây Nguyên.',
};

async function DuAnContent({ searchParams }: { searchParams: Promise<{ loai?: string }> }) {
  const { loai } = await searchParams;
  const targetRoute = loai ? `/du-an/loai/${loai}` : '/du-an';
  const page = getPageByRoute(targetRoute) || getPageByRoute('/du-an');
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}

export default function DuAnPage(props: { searchParams: Promise<{ loai?: string }> }) {
  const defaultPage = getPageByRoute('/du-an');

  return (
    <Suspense fallback={defaultPage ? <main dangerouslySetInnerHTML={{ __html: defaultPage.mainHtml }} /> : null}>
      <DuAnContent searchParams={props.searchParams} />
    </Suspense>
  );
}
