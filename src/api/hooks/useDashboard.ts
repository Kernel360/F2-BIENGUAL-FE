import { UseQueryResult } from '@tanstack/react-query';

import { FetchRecentLearningPreviewResponse } from '@/types/Dashboard';

import { useQueryLoginOnly } from './common';
import { fetchRecentLearningPreview } from '../queries/dashboardQueries';

export const useRecentLearningPreview =
  (): UseQueryResult<FetchRecentLearningPreviewResponse> => {
    return useQueryLoginOnly({
      queryKey: ['recentLearningPreview'],
      queryFn: () => fetchRecentLearningPreview(),
    });
  };
