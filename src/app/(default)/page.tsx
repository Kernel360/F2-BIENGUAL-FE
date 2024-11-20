import { cookies } from 'next/headers';

import {
  fetchReadingPreview,
  fetchListeningPreview,
} from '@/api/queries/contentsQueries';

import HomePageClient from '../../components/HomePageClient';

export default async function HomePage() {
  const initialReadingContents = await fetchReadingPreview({
    Cookie: cookies().toString(),
  });
  const initialListeningContents = await fetchListeningPreview({
    Cookie: cookies().toString(),
  });

  return (
    <HomePageClient
      initialReadingContents={initialReadingContents}
      initialListeningContents={initialListeningContents}
    />
  );
}
