import sitePagesData from '@/data/sitePages.json';

export interface PageData {
  route: string;
  title: string;
  description: string;
  mainHtml: string;
}

const sitePages = sitePagesData as Record<string, PageData>;

export function getPageByRoute(route: string): PageData | undefined {
  return sitePages[route];
}

export function getAllPages(): Record<string, PageData> {
  return sitePages;
}

export function getPagesStartingWith(prefix: string): PageData[] {
  return Object.values(sitePages).filter(p => p.route.startsWith(prefix) && p.route !== prefix);
}
