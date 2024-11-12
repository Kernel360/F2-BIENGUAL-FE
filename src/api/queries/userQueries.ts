import { apiClient } from '@/lib/apiClient';
import {
  UserResponse,
  UserUpdateRequest,
  UserUpdateResponse,
  UserTimeResponse,
  UserLoginStatusResponse,
} from '@/types/User';

// 사용자 정보 조회 (GET)
export const fetchUserInfo = async (): Promise<UserResponse> => {
  return apiClient<UserResponse>('/user/me', {
    method: 'GET',
  });
};

// 사용자 정보 수정 (PUT)
export const updateUserInfo = async (
  userInfo: UserUpdateRequest,
): Promise<UserUpdateResponse> => {
  return apiClient<UserUpdateResponse>('/user/me', {
    method: 'PUT',
    body: JSON.stringify(userInfo),
  });
};

// 사용자 학습 시간 조회 (GET)
export const fetchUserTime = async (): Promise<UserTimeResponse> => {
  return apiClient<UserTimeResponse>('/user/time', {
    method: 'GET',
  });
};

// 사용자 로그인 상태 조회 (GET)
export const fetchUserLoginStatus =
  async (): Promise<UserLoginStatusResponse> => {
    return apiClient<UserLoginStatusResponse>('/user/status', {
      method: 'GET',
    });
  };

// 사용자 로그아웃 (POST)
export const fetchUserLogout = async (): Promise<UserLoginStatusResponse> => {
  return apiClient<UserLoginStatusResponse>('/user/logout', {
    method: 'POST',
  });
};
