import { apiClient } from '@/lib/apiClient';
import {
  FetchMissionStatusResponse,
  UpdateMissionStatusResponse,
  FetchRecentMissionHistoryResponse,
} from '@/types/Mission';

// 미션 상태 확인 (GET)
export const fetchMissionStatus = async (
  customHeaders?: Record<string, string>,
): Promise<FetchMissionStatusResponse> => {
  return apiClient<FetchMissionStatusResponse>('/missions/status', {
    method: 'GET',
    customHeaders,
  });
};

// 미션 완료 요청 (PUT)
export const updateMissionStatus = async (missionStatusData: {
  oneContent?: boolean;
  bookmark?: boolean;
  quiz?: boolean;
}): Promise<UpdateMissionStatusResponse> => {
  return apiClient<UpdateMissionStatusResponse>('/missions/status', {
    method: 'PUT',
    body: JSON.stringify({ ...missionStatusData }),
  });
};

export const fetchRecentMissionHistory = async (
  customHeaders?: Record<string, string>,
): Promise<FetchRecentMissionHistoryResponse> => {
  return apiClient<FetchRecentMissionHistoryResponse>(
    '/mission-history/recent',
    {
      method: 'GET',
      customHeaders,
    },
  );
};
