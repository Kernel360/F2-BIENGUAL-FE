/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, './env') });

test('회원가입 - 카테고리 선택', async ({ page }) => {
  await page.goto('https://local.biengual.store:3000/');
  await page.getByRole('button', { name: '로그인', exact: true }).click();
  await page.getByRole('button', { name: '카카오로 로그인' }).click();

  // 입력 필드 채우기
  await page.getByPlaceholder('KakaoMail ID, email, phone number').click();
  await page
    .getByPlaceholder('KakaoMail ID, email, phone number')
    .fill(process.env.KAKAO_EMAIL || '');
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.KAKAO_PASSWORD || '');
  await page.getByRole('button', { name: 'Log In', exact: true }).click();

  // 카테고리 선택
  await page.getByRole('button', { name: 'Science' }).click();
  await page.getByRole('button', { name: 'Climate' }).click();

  // '다 골랐어요' 버튼 클릭
  const [response] = await Promise.all([
    page.waitForResponse(
      (res) => res.url().includes('/user/me') && res.status() === 200,
    ), // API 요청 완료 대기
    page.getByRole('button', { name: '다 골랐어요' }).click(),
  ]);

  // 응답 확인
  expect(response.ok()).toBeTruthy();

  // 프로필 페이지로 이동
  await page.goto('https://local.biengual.store:3000/mypage/profile');

  // 선택한 카테고리가 활성화 되어있는지 확인
  const climateButton = page.getByRole('button', { name: 'Climate' });
  const climateClass = await climateButton.getAttribute('class');
  expect(climateClass).toContain('bg-primary'); // 선택된 상태를 나타내는 클래스 확인

  const scienceButton = page.getByRole('button', { name: 'Science' });
  const scienceClass = await scienceButton.getAttribute('class');
  expect(scienceClass).toContain('bg-primary');
});
