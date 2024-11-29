import { apiClient } from '@/lib/apiClient';
import {
  FetchQuizResponse,
  CheckQuizAnswerResponse,
  ViewHintResponse,
} from '@/types/Quiz';

// 퀴즈 조회 (GET)
export const fetchQuiz = async (
  contentId: number,
): Promise<FetchQuizResponse> => {
  return apiClient<FetchQuizResponse>(`/questions/view/${contentId}`, {
    method: 'GET',
  });
};

// 퀴즈 정답 확인 (POST)
export const checkQuizAnswer = async (quizAnswer: {
  questionId: string;
  answer: string;
}): Promise<CheckQuizAnswerResponse> => {
  return apiClient<CheckQuizAnswerResponse>('/questions/verify', {
    method: 'POST',
    body: JSON.stringify(quizAnswer),
  });
};

export const viewHint = async (
  questionId: string,
): Promise<ViewHintResponse> => {
  return apiClient<ViewHintResponse>('/questions/hint/view', {
    method: 'POST',
    body: JSON.stringify({ questionId }),
  });
};
