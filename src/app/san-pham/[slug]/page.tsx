import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: 'tam-pin-mono-perc-550w' },
    { slug: 'tam-pin-2-mat-bifacial-580w' },
    { slug: 'inverter-hybrid-5kw' },
    { slug: 'pin-lithium-lifepo4' },
    { slug: 'he-luu-tru-ess-cho-doanh-nghiep' },
    { slug: 'den-duong-nang-luong-mat-troi' },
    { slug: 'tu-dien-ats-chuyen-nguon-tu-dong' },
    { slug: 'bo-sac-xe-dien-tai-nha' },
    { slug: 'tam-pin-mono-450w-cho-nha-o' },
    { slug: 'inverter-hoa-luoi-3-pha-10kw' },
    { slug: 'den-nang-luong-mat-troi-san-vuon' },
    { slug: 'aptomat-thiet-bi-dong-cat' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByRoute(`/san-pham/${slug}`);
  return {
    title: page?.title || 'Sản phẩm — TH-EGO',
    description: page?.description || '',
  };
}

export default async function SanPhamDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageByRoute(`/san-pham/${slug}`);
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
