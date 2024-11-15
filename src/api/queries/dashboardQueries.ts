import { apiClient } from '@/lib/apiClient';
import {
  FetchRecentLearningPreviewResponse,
  FetchOneRecentLearningPreviewResponse,
  FetchMonthlyCategoryRatioResponse,
} from '@/types/Dashboard';

// 최근 학습 콘텐츠 조회 (GET)
export const fetchRecentLearningPreview =
  async (): Promise<FetchRecentLearningPreviewResponse> => {
    return apiClient<FetchRecentLearningPreviewResponse>(
      '/dashboard/learning/recent',
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
  date?: string,
): Promise<FetchMonthlyCategoryRatioResponse> => {
  const url = date
    ? `/dashboard/learning/categories?date=${encodeURIComponent(date)}`
    : '/dashboard/learning/categories';

  return apiClient<FetchMonthlyCategoryRatioResponse>(url, {
    method: 'GET',
  });
};
