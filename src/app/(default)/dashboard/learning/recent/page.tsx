import React from 'react';

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
    queryFn: () => fetchRecentLearningPreview(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardRecentLearningClient />
    </HydrationBoundary>
  );
}
