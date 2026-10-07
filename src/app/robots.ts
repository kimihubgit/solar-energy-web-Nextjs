import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://energy.kimidev.net';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // AI Crawlers & Answer Engines (AIO / AEO optimization)
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'ClaudeBot', 'anthropic-ai', 'Applebot-Extended'],
        allow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
