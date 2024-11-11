import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { RecentLearningPreviewResponse } from '@/types/Dashboard';

import { fetchRecentLearningPreview } from '../queries/dashboardQueries';

export const useRecentLearningPreview =
  (): UseQueryResult<RecentLearningPreviewResponse> => {
    return useQuery({
      queryKey: ['recentLearningPreview'],
      queryFn: () => fetchRecentLearningPreview(),
    });
  };
