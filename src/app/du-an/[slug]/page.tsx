import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: 'nha-xuong-che-bien-ca-phe-cu-mgar' },
    { slug: 'he-hybrid-10kwp-nha-pho-tan-lap' },
    { slug: 'biet-thu-ea-tam' },
    { slug: 'homestay-ho-lak' },
    { slug: 'trang-trai-sau-rieng-krong-pac' },
    { slug: 'van-phong-cong-ty-tan-an' },
    { slug: 'trang-trai-ga-ea-kar' },
    { slug: 'den-duong-nlmt-hoa-thang' },
    { slug: 'nha-o-krong-ana' },
    { slug: 'nha-xuong-go-kcn-hoa-phu' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByRoute(`/du-an/${slug}`);
  return {
    title: page?.title || 'Dự án — TH-EGO',
    description: page?.description || '',
  };
}

export default async function DuAnDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageByRoute(`/du-an/${slug}`);
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
