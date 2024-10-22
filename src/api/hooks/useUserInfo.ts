import {
  useQuery,
  UseQueryResult,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import {
  fetchUserInfo,
  updateUserInfo,
  fetchUserTime,
  fetchUserLogout,
} from '@/api/queries/userQueries';
import {
  UserResponse,
  UserUpdateResponse,
  UserUpdateRequest,
  UserTimeResponse,
  UserRequestLogoutResponse,
} from '@/types/User';

import { useQueryLoginOnly } from './common';

export const useUserInfo = (): UseQueryResult<UserResponse> => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUserInfo(),
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<UserUpdateResponse, Error, UserUpdateRequest>({
    mutationFn: (userInfo: UserUpdateRequest) => updateUserInfo(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useUserTime = (): UseQueryResult<UserTimeResponse> => {
  return useQueryLoginOnly({
    queryKey: ['userTime'],
    queryFn: () => fetchUserTime(),
  });
};

export const useRequestLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<UserRequestLogoutResponse, Error>({
    mutationFn: () => fetchUserLogout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loginStatus'] });
    },
  });
};
