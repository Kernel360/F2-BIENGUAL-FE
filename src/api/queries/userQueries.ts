import {
  UserResponse,
  UserUpdateRequest,
  UserUpdateResponse,
  UserTimeResponse,
  UserLoginStatusResponse,
} from '@/types/User';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export const fetchUserInfo = async (): Promise<UserResponse> => {
  const response = await fetch(`${BASE_URL}/user/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateUserInfo = async (
  userInfo: UserUpdateRequest,
): Promise<UserUpdateResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/user/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update user info:', error);
    throw error;
  }
};

export const fetchUserTime = async (): Promise<UserTimeResponse> => {
  const response = await fetch(`${BASE_URL}/user/time`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const fetchUserLoginStatus =
  async (): Promise<UserLoginStatusResponse> => {
    const response = await fetch(`${BASE_URL}/user/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

export const fetchUserLogout = async (): Promise<UserLoginStatusResponse> => {
  const response = await fetch(`${BASE_URL}/user/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
