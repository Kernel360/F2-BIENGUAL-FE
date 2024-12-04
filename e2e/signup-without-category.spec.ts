/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, './env') });

test('회원가입 - 카테고리 선택하지 않음', async ({ page }) => {
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

  // '나중에 고를래요' 버튼 클릭
  const [response] = await Promise.all([
    page.waitForResponse(
      (res) => res.url().includes('/user/me') && res.status() === 200,
    ), // API 요청 완료 대기
    page.getByRole('button', { name: '나중에 고를래요' }).click(),
  ]);

  // 응답 확인
  expect(response.ok()).toBeTruthy();

  // 로그아웃
  await page.getByRole('button', { name: 'U', exact: true }).click();
  await page.getByRole('menuitem', { name: '로그아웃' }).click();

  // 다시 로그인
  await page.getByRole('button', { name: '로그인', exact: true }).click();
  await page.getByRole('button', { name: '카카오로 로그인' }).click();

  // 현재 URL 확인
  const currentUrl = page.url();
  expect(currentUrl).not.toContain('/login/add'); // 카테고리 선택 페이지로 리다이렉트되지 않음 확인
});
