import { apiClient } from '@/lib/apiClient';
import {
  LearningProgressResponse,
  LearningProgressRequest,
} from '@/types/LearningProgress';

// 학습 진행도 업데이트 (POST)
export const updateLearningProgress = async (
  progressData: LearningProgressRequest,
): Promise<LearningProgressResponse> => {
  return apiClient<LearningProgressResponse>('/learning/progress', {
    method: 'POST',
    body: JSON.stringify(progressData),
  });
};
