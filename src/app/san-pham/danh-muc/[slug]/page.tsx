import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: 'tam-pin' },
    { slug: 'inverter-luu-tru' },
    { slug: 'thiet-bi-dien' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByRoute(`/san-pham/danh-muc/${slug}`);
  return {
    title: page?.title || 'Danh mục sản phẩm — TH-EGO',
    description: page?.description || '',
  };
}

export default async function SanPhamDanhMucPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageByRoute(`/san-pham/danh-muc/${slug}`);
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
