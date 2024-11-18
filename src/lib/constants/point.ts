// 한글 매핑 상수
export const REASON_KR_MAPPING = {
  FIRST_DAILY_LOG_IN: '일일 첫 로그인',
  DAILY_MISSION: '일일 미션 SUCCESS',
  FIRST_SIGN_UP: '첫 가입',
  DAILY_QUIZ: '일일 퀴즈',
  DAILY_CONTENT: '1개 컨텐츠 학습',
  QUIZ_CORRECT_ANSWER: '퀴즈 정답',
  VIEW_RECENT_CONTENT: '최근 콘텐츠 보기',
  VIEW_QUIZ_HINT: '퀴즈 힌트 보기',
} as const;

// 타입 정의 (선택 사항)
export type ReasonKey = keyof typeof REASON_KR_MAPPING;
