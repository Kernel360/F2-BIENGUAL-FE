import React from 'react';

import { cookies } from 'next/headers';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchRecentLearningPreview } from '@/api/queries/dashboardQueries';

import DashboardRecentLearningClient from './DashboardRecentLearningClient';

export default async function RecentLearning() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recentLearningPreview'],
    queryFn: () =>
      fetchRecentLearningPreview({
        Cookie: cookies().toString(),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardRecentLearningClient />
    </HydrationBoundary>
  );
}
