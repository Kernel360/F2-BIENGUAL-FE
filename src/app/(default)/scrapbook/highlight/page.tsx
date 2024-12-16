import { cookies } from 'next/headers';

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { fetchAllBookmarks } from '@/api/queries/bookmarkQueries';

import HighlightClient from './HighlightClient';

export default async function scrapHighlihgtpage() {
  const cookieHeader = cookies().toString();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['bookmarks'],
    queryFn: () => fetchAllBookmarks({ Cookie: cookieHeader }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HighlightClient />
    </HydrationBoundary>
  );
}
