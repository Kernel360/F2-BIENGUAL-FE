import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/mypage',
        '/point',
        '/scrapbook',
        '/search',
        '/login',
        '/admin',
      ],
    },
    sitemap: 'https://www.biengual.store/sitemap.xml',
  };
}
