import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageByRoute('/san-pham');
  return {
    title: page?.title || 'Sản phẩm — TH-EGO',
    description: page?.description || '',
  };
}

export default function SanPhamPage() {
  const page = getPageByRoute('/san-pham');
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
