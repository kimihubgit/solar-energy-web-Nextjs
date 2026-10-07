import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageByRoute('/lien-he');
  return {
    title: page?.title || 'Liên hệ — TH-EGO',
    description: page?.description || '',
  };
}

export default function LienHePage() {
  const page = getPageByRoute('/lien-he');
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
