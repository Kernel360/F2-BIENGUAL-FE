import { apiClient } from '@/lib/apiClient';
import {
  FetchRecentLearningPreviewResponse,
  FetchOneRecentLearningPreviewResponse,
  FetchMonthlyCategoryRatioResponse,
  MissonCalendarResponse,
  FetchWeeklyQuizAccuracyResponse,
  FetchCurrentPointsResponse,
  FetchMonthlyPointsHistoryResponse,
} from '@/types/Dashboard';

// 최근 학습 콘텐츠 조회 (GET)
export const fetchRecentLearningPreview = async (
  customHeaders?: Record<string, string>,
): Promise<FetchRecentLearningPreviewResponse> => {
  return apiClient<FetchRecentLearningPreviewResponse>(
    '/dashboard/learning/recent',
    {
      method: 'GET',
      customHeaders,
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

// 최근 학습 콘텐츠 1개 조회 (GET)
export const fetchOneRecentLearningPreview =
  async (): Promise<FetchOneRecentLearningPreviewResponse> => {
    return apiClient<FetchOneRecentLearningPreviewResponse>(
      '/dashboard/learning/recent/summary',
      {
        method: 'GET',
      },
    );
  };

// 월간 카테고리별 학습 콘텐츠 비율 조회 (GET)
export const fetchMonthlyCategoryRatio = async (
  date: string,
): Promise<FetchMonthlyCategoryRatioResponse> => {
  return apiClient<FetchMonthlyCategoryRatioResponse>(
    `/dashboard/learning/categories?date=${encodeURIComponent(date)}`,
    {
      method: 'GET',
    },
  );
};

// 최근 5주간 퀴즈 첫시도 재시도 정답율 조회 (GET)
export const fetchWeeklyQuizAccuracy = async (
  date: string,
): Promise<FetchWeeklyQuizAccuracyResponse> => {
  return apiClient<FetchWeeklyQuizAccuracyResponse>(
    `/dashboard/quiz/summary?date=${encodeURIComponent(date)}`,
    {
      method: 'GET',
    },
  );
};
// 현재 포인트 조회 (GET)
export const fetchCurrentPoints =
  async (): Promise<FetchCurrentPointsResponse> => {
    return apiClient<FetchCurrentPointsResponse>(`/dashboard/points`, {
      method: 'GET',
    });
  };

// 월간 포인트 내역 조회 (GET)
export const fetchMonthlyPointsHistory = async (
  date: string,
): Promise<FetchMonthlyPointsHistoryResponse> => {
  return apiClient<FetchMonthlyPointsHistoryResponse>(
    `/dashboard/points/history?date=${date}`,
    {
      method: 'GET',
    },
  );
};
