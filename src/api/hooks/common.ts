import { useQuery, UseQueryResult } from '@tanstack/react-query';

import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';

export const useQueryLoginOnly = <T>(options: {
  queryKey: (string | number)[];
  queryFn: () => Promise<T>;
}): UseQueryResult<T> => {
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = !!isLoginData?.data;

  return useQuery<T>({
    ...options,
    enabled: isLogin,
  });
};
