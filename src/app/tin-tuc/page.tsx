import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageByRoute('/tin-tuc');
  return {
    title: page?.title || 'Tin tức — TH-EGO',
    description: page?.description || '',
  };
}

export default function TinTucPage() {
  const page = getPageByRoute('/tin-tuc');
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
