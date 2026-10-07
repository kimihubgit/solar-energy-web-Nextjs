import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: '1-5-trieu' },
    { slug: '2-trieu' },
    { slug: '3-trieu' },
    { slug: '4-trieu' },
    { slug: '5-trieu' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByRoute(`/dich-vu/tien-dien/${slug}`);
  return {
    title: page?.title || 'Tiền điện — TH-EGO',
    description: page?.description || '',
  };
}

export default async function TienDienDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageByRoute(`/dich-vu/tien-dien/${slug}`);
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
