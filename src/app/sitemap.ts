import { MetadataRoute } from 'next';
import sitePagesData from '@/data/sitePages.json';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thego.starwar.vn';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.keys(sitePagesData);
  const now = new Date();

  return routes.map((route) => {
    let priority = 0.7;
    let changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'weekly';

    if (route === '/') {
      priority = 1.0;
      changeFrequency = 'daily';
    } else if (['/dich-vu', '/san-pham', '/du-an', '/tin-tuc'].includes(route)) {
      priority = 0.9;
      changeFrequency = 'daily';
    } else if (route.startsWith('/dich-vu/') || route.startsWith('/san-pham/') || route.startsWith('/du-an/')) {
      priority = 0.8;
      changeFrequency = 'weekly';
    } else if (route.startsWith('/tin-tuc/')) {
      priority = 0.75;
      changeFrequency = 'weekly';
    } else if (route === '/lien-he' || route.startsWith('/tuyen-dung')) {
      priority = 0.7;
      changeFrequency = 'monthly';
    }

    const cleanRoute = route === '/' ? '' : route;

    return {
      url: `${BASE_URL}${cleanRoute}`,
      lastModified: now,
      changeFrequency,
      priority,
    };
  });
}
