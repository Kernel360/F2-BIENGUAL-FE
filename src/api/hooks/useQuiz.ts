import { useQuery, useMutation } from '@tanstack/react-query';

import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import {
  CheckQuizAnswerResponse,
  CheckAnswerRequest,
  FetchQuizResponse,
} from '@/types/Quiz';

import { checkQuizAnswer, fetchQuiz } from '../queries/quizQueries';

export const useFetchQuiz = (contentId: number) => {
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data;
  return useQuery<FetchQuizResponse>({
    queryKey: ['quiz', contentId],
    queryFn: () => fetchQuiz(contentId),
    enabled: !!isLogin,
  });
};

export const useCheckQuestionAnswer = () => {
  return useMutation<CheckQuizAnswerResponse, Error, CheckAnswerRequest>({
    mutationFn: (questionAnswer: { questionId: string; answer: string }) =>
      checkQuizAnswer(questionAnswer),
  });
};
