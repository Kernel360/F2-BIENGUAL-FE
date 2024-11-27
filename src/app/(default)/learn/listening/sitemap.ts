import type { MetadataRoute } from 'next';

import { fetchPaginatedListeningPreview } from '@/api/queries/contentsQueries';

// export async function generateSitemaps() {
//   // Fetch the total number of products and calculate the number of sitemaps needed
//   return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
// }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const listeningContents = await fetchPaginatedListeningPreview(
      0,
      50000, // Google's limit is 50,000 URLs per sitemap
      'createdAt',
      'DESC',
    );
    console.log(listeningContents);
    return listeningContents.data.contents.map((content) => ({
      url: `https://www.biengual.store/learn/listening/detail/${content.contentId}`,
      // TODO(@smosco): create, update 날짜 받기
      lastModified: new Date(),
    }));
  } catch (err) {
    console.log(err);
  }
  return [];
}
