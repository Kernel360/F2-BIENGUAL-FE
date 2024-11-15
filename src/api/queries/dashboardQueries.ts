import { apiClient } from '@/lib/apiClient';
import {
  FetchRecentLearningPreviewResponse,
  MissonCalendarResponse,
} from '@/types/Dashboard';

// 최근 학습 프리뷰 조회 (GET)
export const fetchRecentLearningPreview =
  async (): Promise<FetchRecentLearningPreviewResponse> => {
    return apiClient<FetchRecentLearningPreviewResponse>(
      '/dashboard/learning/recent',
      {
        method: 'GET',
      },
    );
  };

// 월간 미션 달력 조회 (GET)
export const fetchMissionCalendar = async (
  date: string,
): Promise<MissonCalendarResponse> => {
  return apiClient<MissonCalendarResponse>(
    `/dashboard/missions/calendar?date=${date}`,
    {
      method: 'GET',
    },
  );
};
