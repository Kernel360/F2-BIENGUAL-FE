import { UseQueryResult } from '@tanstack/react-query';

import {
  FetchRecentLearningPreviewResponse,
  FetchOneRecentLearningPreviewResponse,
  FetchMonthlyCategoryRatioResponse,
  MissonCalendarResponse,
  FetchCurrentPointsResponse,
  FetchMonthlyPointsHistoryResponse,
} from '@/types/Dashboard';

import { useQueryLoginOnly } from './common';
import {
  fetchCurrentPoints,
  fetchRecentLearningPreview,
  fetchOneRecentLearningPreview,
  fetchMonthlyCategoryRatio,
  fetchMissionCalendar,
  fetchMonthlyPointsHistory,
} from '../queries/dashboardQueries';

export const useRecentLearningPreview =
  (): UseQueryResult<FetchRecentLearningPreviewResponse> => {
    return useQueryLoginOnly({
      queryKey: ['recentLearningPreview'],
      queryFn: () => fetchRecentLearningPreview(),
    });
  };

export const useFetchMissionCalendar = (date: string) => {
  return useQueryLoginOnly<MissonCalendarResponse>({
    queryKey: ['missionCalendar', date],
    queryFn: () => fetchMissionCalendar(date),
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

export const useFetchCurrentPoints =
  (): UseQueryResult<FetchCurrentPointsResponse> => {
    return useQueryLoginOnly({
      queryKey: ['currentPoints'],
      queryFn: () => fetchCurrentPoints(),
    });
  };

export const useFetchMonthlyPointsHistory = (
  date: string,
): UseQueryResult<FetchMonthlyPointsHistoryResponse> => {
  return useQueryLoginOnly({
    queryKey: ['monthlyPointsHistory', date],
    queryFn: () => fetchMonthlyPointsHistory(date),
  });
};
