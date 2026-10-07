import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: 'ky-thuat-vien-lap-dat-dien-mat-troi' },
    { slug: 'ky-su-thiet-ke-he-thong-dien-mat-troi' },
    { slug: 'nhan-vien-kinh-doanh-giai-phap-nang-luong' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByRoute(`/tuyen-dung/${slug}`);
  return {
    title: page?.title || 'Tuyển dụng — TH-EGO',
    description: page?.description || '',
  };
}

export default async function TuyenDungDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageByRoute(`/tuyen-dung/${slug}`);
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
