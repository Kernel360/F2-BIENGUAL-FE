import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import {
  CheckQuizAnswerResponse,
  CheckAnswerRequest,
  FetchQuizResponse,
  ViewHintResponse,
} from '@/types/Quiz';

import { checkQuizAnswer, fetchQuiz, viewHint } from '../queries/quizQueries';

export const useFetchQuiz = (contentId: number, showQuiz: boolean) => {
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data;
  return useQuery<FetchQuizResponse>({
    queryKey: ['quiz', contentId],
    queryFn: () => fetchQuiz(contentId),
    // TODO(@smosco): 로그인 안하고 showQuiz 아니면 enabled 처리(근데 이상함)
    enabled: !!isLogin && showQuiz,
  });
};

export const useCheckQuestionAnswer = () => {
  return useMutation<CheckQuizAnswerResponse, Error, CheckAnswerRequest>({
    mutationFn: (questionAnswer: { questionId: string; answer: string }) =>
      checkQuizAnswer(questionAnswer),
  });
};

export const useViewHint = () => {
  const queryClient = useQueryClient();

  return useMutation<ViewHintResponse, Error, string>({
    mutationFn: (questionId: string) => viewHint(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentPoints'] });
    },
  });
};
