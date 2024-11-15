import { UseQueryResult } from '@tanstack/react-query';

import {
  FetchRecentLearningPreviewResponse,
  FetchOneRecentLearningPreviewResponse,
  FetchMonthlyCategoryRatioResponse,
} from '@/types/Dashboard';

import { useQueryLoginOnly } from './common';
import {
  fetchRecentLearningPreview,
  fetchOneRecentLearningPreview,
  fetchMonthlyCategoryRatio,
} from '../queries/dashboardQueries';

export const useRecentLearningPreview =
  (): UseQueryResult<FetchRecentLearningPreviewResponse> => {
    return useQueryLoginOnly({
      queryKey: ['recentLearningPreview'],
      queryFn: () => fetchRecentLearningPreview(),
    });
  };

export const useOneRecentLearningPreview =
  (): UseQueryResult<FetchOneRecentLearningPreviewResponse> => {
    return useQueryLoginOnly({
      queryKey: ['recentOneLearningPreview'],
      queryFn: () => fetchOneRecentLearningPreview(),
    });
  };

export const useMonthlyCategoryRatio = (
  date: string,
): UseQueryResult<FetchMonthlyCategoryRatioResponse> => {
  return useQueryLoginOnly({
    queryKey: ['categoryRatioMonth', date],
    queryFn: () => fetchMonthlyCategoryRatio(date),
  });
};
