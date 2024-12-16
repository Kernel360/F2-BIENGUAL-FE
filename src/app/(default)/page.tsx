import { cookies } from 'next/headers';

import {
  fetchReadingPreview,
  fetchListeningPreview,
} from '@/api/queries/contentsQueries';
import {
  fetchRecommendedBookmarks,
  fetchRecommendedContents,
} from '@/api/queries/recommendQueries';
import { mockRecommendedData } from '@/lib/constants/mockRecommendedData';

import HomePageClient from '../../components/HomePageClient';

export default async function HomePage() {
  const cookieHeader = cookies().toString();

  const results = await Promise.allSettled([
    fetchReadingPreview({ Cookie: cookieHeader }),
    fetchListeningPreview({ Cookie: cookieHeader }),
    fetchRecommendedBookmarks(),
    cookieHeader
      ? fetchRecommendedContents({ Cookie: cookieHeader })
      : Promise.resolve(mockRecommendedData),
  ]);

  const initialReadingContents =
    results[0].status === 'fulfilled'
      ? results[0].value
      : {
          code: 'error',
          message: '리딩 콘텐츠 프리뷰 조회 실패',
          data: { readingPreview: [] },
        };

  const initialListeningContents =
    results[1].status === 'fulfilled'
      ? results[1].value
      : {
          code: 'error',
          message: '리스닝 콘텐츠 프리뷰 조회 실패',
          data: { listeningPreview: [] },
        };

  const initialSentences =
    results[2].status === 'fulfilled'
      ? results[2].value
      : {
          code: 'error',
          message: '오늘의 문장 조회 실패',
          data: { popularBookmarks: [] },
        };

  const initialRecommendedContents =
    results[3].status === 'fulfilled'
      ? results[3].value
      : {
          code: 'error',
          message: '추천 콘텐츠 조회 실패',
          data: { recommendedContents: [] },
        };

  return (
    <HomePageClient
      initialReadingContents={initialReadingContents}
      initialListeningContents={initialListeningContents}
      initialSentences={initialSentences}
      initialRecommendedContents={initialRecommendedContents}
    />
  );
}
