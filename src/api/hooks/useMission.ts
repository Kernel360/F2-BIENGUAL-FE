import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  FetchMissionStatusResponse,
  UpdateMissionStatusResponse,
  FetchRecentMissionHistoryResponse,
} from '@/types/Mission';

import { useQueryLoginOnly } from './common';
import {
  fetchMissionStatus,
  updateMissionStatus,
  fetchRecentMissionHistory,
} from '../queries/missionQueries';

export const useFetchMissionStatus = () => {
  return useQueryLoginOnly<FetchMissionStatusResponse>({
    queryKey: ['missionStatus'],
    queryFn: () => fetchMissionStatus(),
  });
};

export const useUpdateMissionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateMissionStatusResponse,
    Error,
    { oneContent?: boolean; bookmark?: boolean; quiz?: boolean }
  >({
    mutationFn: (missionStatusData) => updateMissionStatus(missionStatusData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missionStatus'] });
    },
  });
};

export const useFetchRecentMissionHistory = () => {
  return useQueryLoginOnly<FetchRecentMissionHistoryResponse>({
    queryKey: ['recentMissionHistory'],
    queryFn: () => fetchRecentMissionHistory(),
  });
};
