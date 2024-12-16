import { cookies } from 'next/headers';

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { fetchScrap } from '@/api/queries/scrapQueries';

import ContentClient from './ContentClient';

export default async function scrapContentpage() {
  const cookieHeader = cookies().toString();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['scrap'],
    queryFn: () => fetchScrap({ Cookie: cookieHeader }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContentClient />
    </HydrationBoundary>
  );
}
