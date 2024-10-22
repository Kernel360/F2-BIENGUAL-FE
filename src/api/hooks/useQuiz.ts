import { useQuery } from '@tanstack/react-query';

import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import { FetchQuizResponse } from '@/types/Quiz';

import { fetchQuiz } from '../queries/quizQueries';

export const useFetchQuiz = (contentId: number) => {
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data;
  return useQuery<FetchQuizResponse>({
    queryKey: ['quiz', contentId],
    queryFn: () => fetchQuiz(contentId),
    enabled: !!isLogin,
  });
};
