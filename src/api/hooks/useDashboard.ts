import { UseQueryResult } from '@tanstack/react-query';

import {
  FetchRecentLearningPreviewResponse,
  MissonCalendarResponse,
} from '@/types/Dashboard';

import { useQueryLoginOnly } from './common';
import {
  fetchRecentLearningPreview,
  fetchMissionCalendar,
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
