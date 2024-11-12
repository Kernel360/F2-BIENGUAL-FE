import { apiClient } from '@/lib/apiClient';
import { FetchRecentLearningPreviewResponse } from '@/types/Dashboard';

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
