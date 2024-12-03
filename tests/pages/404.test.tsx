/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';

import { useRouter } from 'next/navigation';

import { render, screen, fireEvent } from '@testing-library/react';

import NotFoundPage from '@/app/not-found';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('404 페이지', () => {
  test('404 에러 메세지가 렌더링 됩니다. ', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  test('404 페이지에 한국어 메세지가 렌더링 됩니다.', () => {
    render(<NotFoundPage />);
    expect(
      screen.getByText(/서비스 이용에 불편함을 드려 죄송합니다./),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/올바른 URL을 입력하였는지 다시 한번 확인해 주세요./),
    ).toBeInTheDocument();
  });

  test('이전 페이지로 이동하기 버튼을 누르면 뒤로 돌아갑니다.', () => {
    const backMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: backMock,
    });

    render(<NotFoundPage />);

    const backButton = screen.getByText('이전 페이지로 돌아가기');
    fireEvent.click(backButton);

    expect(backMock).toHaveBeenCalled();
  });
});
