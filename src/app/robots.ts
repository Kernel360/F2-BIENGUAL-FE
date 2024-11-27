import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/mypage', '/point', '/scrapbook', '/search'],
    },
    sitemap: 'https://biengual.store/sitemap.xml',
  };
}
