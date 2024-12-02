import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  // 테스트 실행 전 실행되는 환경 설정 파일
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // 브라우저 환경을 시뮬레이션하기 위한 Jest 환경 설정
  testEnvironment: 'jest-environment-jsdom',

  // TypeScript, 경로 alias 매핑
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
  },

  // Jest에서 무시할 경로 설정 (e.g., 빌드 출력물)
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  // 커버리지 보고서를 생성할 경로
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/.next/**',
    '!<rootDir>/jest.config.ts',
  ],
};

export default createJestConfig(customJestConfig);
