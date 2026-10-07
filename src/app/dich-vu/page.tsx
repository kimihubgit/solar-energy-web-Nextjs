import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageByRoute('/dich-vu');
  return {
    title: page?.title || 'Dịch vụ — TH-EGO',
    description: page?.description || '',
  };
}

export default function DichVuPage() {
  const page = getPageByRoute('/dich-vu');
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
