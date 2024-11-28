// CustomError.ts
import { CustomErrorMessages } from './customError';

// export type CustomErrorType = { code: string; message: string };

export class CustomError extends Error {
  code: string;

  message: string;

  constructor(code: string, message: string) {
    super(message); // 기본 Error 메시지를 설정
    this.code = code;
    this.message = message || CustomErrorMessages[code] || '알 수 없는 오류'; // CustomErrorMessages로 에러 메시지를 설정
    this.name = '커스텀에러'; // CustomError 이름을 설정

    // Error 객체의 스택 추적을 가능하게 하기 위해서는 Error.captureStackTrace를 호출
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}
