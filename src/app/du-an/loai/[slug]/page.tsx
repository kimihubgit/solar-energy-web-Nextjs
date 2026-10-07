import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: 'ho-gia-dinh' },
    { slug: 'nha-xuong' },
    { slug: 'trang-trai' },
    { slug: 'van-phong' },
    { slug: 'chieu-sang' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByRoute(`/du-an/loai/${slug}`) || getPageByRoute('/du-an');
  return {
    title: page?.title || 'Dự án — TH-EGO',
    description: page?.description || '',
  };
}

export default async function DuAnLoaiPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageByRoute(`/du-an/loai/${slug}`) || getPageByRoute('/du-an');
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
