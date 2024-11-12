import { apiClient } from '@/lib/apiClient';
import { FetchQuizResponse } from '@/types/Quiz';

// 퀴즈 조회 (GET)
export const fetchQuiz = async (
  contentId: number,
): Promise<FetchQuizResponse> => {
  return apiClient<FetchQuizResponse>(`/questions/view/${contentId}`, {
    method: 'GET',
  });
};
