/* eslint-disable no-nested-ternary */
// eslint-disable-next-line lines-around-directive
'use client';

import { useQuery } from '@tanstack/react-query';

export default function TestPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const response = await fetch(
        'https://dev.biengual.store/api/u1/user/me',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // 쿠키를 포함한 요청이 필요하면 설정
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
  });

  return (
    <div>
      <h1>API 통신 테스트</h1>
      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <pre>{data ? JSON.stringify(data, null, 2) : 'No data available'}</pre>
      )}
    </div>
  );
}
