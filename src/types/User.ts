import { CategoryList } from './Category';

export interface User {
  username?: string;
  nickname: string;
  email: string;
  phoneNumber?: string;
  birth?: string; // Date일수도 있음
  gender?: 'GENDER_MALE' | 'GENDER_FEMALE';
  myCategories?: CategoryList[];
}

export interface UserResponse {
  code: string;
  message: string;
  data: User;
}

export interface UserUpdateRequest {
  username?: string;
  nickname?: string;
  phoneNumber?: string;
  birth?: string; // Date일수도 있음
  gender?: 'GENDER_MALE' | 'GENDER_FEMALE';
  categories?: number[];
}

export interface UserUpdateResponse {
  code: string;
  message: string;
  data: {
    userId: number;
  };
}

export interface UserTimeResponse {
  code: 'string';
  message: 'string';
  data: {
    createdAt: 'string';
    updatedAt: 'string';
  };
}

export interface UserLoginStatusResponse {
  code: string;
  message: string;
  data: boolean; // 로그인 상태
}

export interface UserRequestLogoutResponse {
  code: string;
  message: string;
}
