import { UseQueryResult } from '@tanstack/react-query';

import {
  FetchRecentLearningPreviewResponse,
  FetchOneRecentLearningPreviewResponse,
  FetchMonthlyCategoryRatioResponse,
  MissonCalendarResponse,
  FetchWeeklyQuizAccuracyResponse,
} from '@/types/Dashboard';

import { useQueryLoginOnly } from './common';
import {
  fetchRecentLearningPreview,
  fetchOneRecentLearningPreview,
  fetchMonthlyCategoryRatio,
  fetchMissionCalendar,
  fetchWeeklyQuizAccuracy,
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

export const useWeeklyQuizAccuracy = (
  date: string,
): UseQueryResult<FetchWeeklyQuizAccuracyResponse> => {
  return useQueryLoginOnly({
    queryKey: ['quizAccuracyWeekly', date],
    queryFn: () => fetchWeeklyQuizAccuracy(date),
  });
};
