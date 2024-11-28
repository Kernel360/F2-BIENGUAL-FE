import { CustomErrorMessages } from '@/api/customError';
import { CustomError } from '@/api/customErrorClass';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface FetchOptions extends RequestInit {
  customHeaders?: Record<string, string>;
}

export const apiClient = async <Response>(
  endpoint: string,
  { method = 'GET', customHeaders = {}, ...options }: FetchOptions = {},
): Promise<Response> => {
  const response = await fetch(`${BASE_URL}/api${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders,
    },
    credentials: 'include',
    ...options,
  });

  const responseData = await response.json();

  // 성공이 아닌 경우 (response 200~299 사이의 코드가 아닌 경우)
  if (!response.ok) {
    const errorCode = responseData?.code;
    // 커스텀 에러 코드 존재하는 에러
    // mutation은 hook에서 try-catch로 에러처리 해주어야함.
    // mutation이 아닌 에러는 errorBoundary로 처리됨
    if (errorCode && CustomErrorMessages[errorCode]) {
      console.log('customError 발생');
      throw new CustomError(errorCode, CustomErrorMessages[errorCode]);
    }
    // 커스텀 에러 코드 존재하지 않는 에러
    console.log('non-custom 에러 발생');
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return responseData;
};
