import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: 'lap-dat-dien-mat-troi-ap-mai' },
    { slug: 'he-thong-luu-tru-nang-luong' },
    { slug: 'thi-cong-dien-dan-dung-cong-nghiep' },
    { slug: 'bao-tri-ve-sinh-giam-sat' },
    { slug: 'tu-van-thiet-ke-he-thong' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByRoute(`/dich-vu/${slug}`);
  return {
    title: page?.title || 'Dịch vụ — TH-EGO',
    description: page?.description || '',
  };
}

export default async function DichVuDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageByRoute(`/dich-vu/${slug}`);
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
