import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageByRoute('/tuyen-dung');
  return {
    title: page?.title || 'Tuyển dụng — TH-EGO',
    description: page?.description || '',
  };
}

export default function TuyenDungPage() {
  const page = getPageByRoute('/tuyen-dung');
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
