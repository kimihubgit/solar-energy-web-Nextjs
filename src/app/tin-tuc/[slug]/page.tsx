import { Metadata } from 'next';
import { getPageByRoute } from '@/lib/pages';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: 'lap-dien-mat-troi-ap-mai-chi-phi-thu-tuc-hoan-von' },
    { slug: 'hoa-luoi-bam-tai-hay-hybrid' },
    { slug: 'pin-lifepo4-khac-gi-ac-quy-chi' },
    { slug: 'doc-hoa-don-tien-dien-chon-cong-suat' },
    { slug: 've-sinh-tam-pin-sau-mua-kho' },
    { slug: 'mai-ton-mai-ngoi-mai-be-tong-lap-dien-mat-troi' },
    { slug: 'th-ego-dai-ly-ego-solar-dak-lak' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByRoute(`/tin-tuc/${slug}`);
  return {
    title: page?.title || 'Tin tức — TH-EGO',
    description: page?.description || '',
  };
}

export default async function TinTucDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageByRoute(`/tin-tuc/${slug}`);
  if (!page) notFound();

  return <main dangerouslySetInnerHTML={{ __html: page.mainHtml }} />;
}
