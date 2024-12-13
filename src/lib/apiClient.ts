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
  try {
    const response = await fetch(`${BASE_URL}/api${endpoint}`, {
      method,
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders,
      },
      credentials: 'include',
      ...options,
    });

    // JSON 응답 파싱 전에 검증
    const responseText = await response.text(); // 먼저 raw 텍스트 형태로 가져옴
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let responseData: any = null;

    if (responseText) {
      try {
        responseData = JSON.parse(responseText);
      } catch {
        throw new Error(`Invalid JSON format in response from ${endpoint}`);
      }
    }

    // 성공이 아닌 경우 처리
    if (!response.ok) {
      const errorCode = responseData?.code;

      // 커스텀 에러 코드 존재 시
      if (errorCode && CustomErrorMessages[errorCode]) {
        console.log('CustomError 발생');
        throw new CustomError(errorCode, CustomErrorMessages[errorCode]);
      }

      // 커스텀 에러 코드가 없을 경우
      console.log('Non-custom 에러 발생');
      throw new Error(
        `HTTP error! Status: ${response.status}. Message: ${responseData?.message || 'Unknown error'}`,
      );
    }

    return responseData as Response;
  } catch (error) {
    console.error('API Client Error:', error);
    throw error; // 에러를 호출한 쪽으로 전달
  }
};
