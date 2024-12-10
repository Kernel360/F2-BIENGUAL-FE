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

  // TODO(@smosco): allSettled로 변경 필요 병렬 처리 중에 하나에서 에러나면 아예 에러남
  const [
    initialReadingContents,
    initialListeningContents,
    initialSentences,
    initialRecommendedContents,
  ] = await Promise.all([
    fetchReadingPreview({ Cookie: cookieHeader }),
    fetchListeningPreview({ Cookie: cookieHeader }),
    fetchRecommendedBookmarks(),
    cookieHeader
      ? fetchRecommendedContents({ Cookie: cookieHeader }) || []
      : mockRecommendedData,
  ]);

  return (
    <HomePageClient
      initialReadingContents={initialReadingContents}
      initialListeningContents={initialListeningContents}
      initialSentences={initialSentences}
      initialRecommendedContents={initialRecommendedContents}
    />
  );
}
