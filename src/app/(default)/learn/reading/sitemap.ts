import type { MetadataRoute } from 'next';

import { fetchPaginatedReadingPreview } from '@/api/queries/contentsQueries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const readingContents = await fetchPaginatedReadingPreview(
      0,
      50000, // Google's limit is 50,000 URLs per sitemap
      'createdAt',
      'DESC',
    );
    return readingContents.data.contents.map((content) => ({
      url: `https://www.biengual.store/learn/reading/detail/${content.contentId}`,
      // TODO(@smosco): create, update 날짜 받기
      lastModified: new Date(),
    }));
  } catch (err) {
    console.log(err);
  }
  return [];
}
