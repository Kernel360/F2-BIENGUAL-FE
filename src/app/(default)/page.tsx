import {
  fetchReadingPreview,
  fetchListeningPreview,
} from '@/api/queries/contentsQueries';

import HomePageClient from '../../components/HomePageClient';

export default async function HomePage() {
  const initialReadingContents = await fetchReadingPreview();
  const initialListeningContents = await fetchListeningPreview();

  return (
    <HomePageClient
      initialReadingContents={initialReadingContents}
      initialListeningContents={initialListeningContents}
    />
  );
}
