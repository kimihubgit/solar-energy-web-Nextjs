import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: 'kien-thuc' },
    { slug: 'huong-dan' },
    { slug: 'tin-cong-ty' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByRoute(`/tin-tuc/chuyen-muc/${slug}`);
  return {
    title: page?.title || 'Tin tức — TH-EGO',
    description: page?.description || '',
  };
}

export default async function TinTucChuyenMucPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageByRoute(`/tin-tuc/chuyen-muc/${slug}`);
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
