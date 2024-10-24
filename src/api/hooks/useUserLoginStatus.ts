import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UserLoginStatusResponse } from '@/types/User';

import { fetchUserLoginStatus } from '../queries/userQueries';

// 로그인 상태 확인하는 tanstack query훅.
const useUserLoginStatus = (
  initialData?: UserLoginStatusResponse,
): UseQueryResult<UserLoginStatusResponse> => {
  return useQuery<UserLoginStatusResponse>({
    queryKey: ['loginStatus'],
    queryFn: fetchUserLoginStatus,
    initialData,
    staleTime: 0, // loginStatus는 캐시없이 항상 최신 상태로 가져와야 refetchOnWindowFocus 제대로 작동
    refetchOnWindowFocus: true, // 기본값 true지만 명시적으로 적어줌
  });
};

export default useUserLoginStatus;
