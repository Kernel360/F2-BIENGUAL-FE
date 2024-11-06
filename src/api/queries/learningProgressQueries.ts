import {
  LearningProgressResponse,
  LearningProgressRequest,
} from '@/types/LearningProgress';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/learning/progress`;

export const updateLearningProgress = async (
  progressData: LearningProgressRequest,
): Promise<LearningProgressResponse> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(progressData),
  });

  if (!response.ok) {
    throw new Error('학습율을 기록하지 못했습니다.');
  }

  return response.json();
};
