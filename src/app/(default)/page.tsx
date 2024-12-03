import { cookies } from 'next/headers';

import {
  fetchReadingPreview,
  fetchListeningPreview,
} from '@/api/queries/contentsQueries';
import { fetchRecommendedBookmarks } from '@/api/queries/recommendQueries';

import HomePageClient from '../../components/HomePageClient';

export default async function HomePage() {
  const initialReadingContents = await fetchReadingPreview({
    Cookie: cookies().toString(),
  });
  const initialListeningContents = await fetchListeningPreview({
    Cookie: cookies().toString(),
  });
  // TODO(@godhyzzang) : 추천bookmark한 문장도  initialData연결
  const initialSentences = await fetchRecommendedBookmarks();

  return (
    <HomePageClient
      initialReadingContents={initialReadingContents}
      initialListeningContents={initialListeningContents}
      initialSentences={initialSentences}
    />
  );
}
