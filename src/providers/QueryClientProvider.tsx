'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClientOptions = {
  defaultOptions: {
    queries: {
      // TODO(@godhyzzang) : staleTime설정하고도 scrap데이터 잘 불러오는 방법 고민 필요
      staleTime: 60 * 1000, // 캐시된 데이터가 1분 동안 신선함 유지
    },
  },
};

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // 서버에서 항상 새로운 QueryClient 생성
    return new QueryClient(queryClientOptions);
  }

  // 브라우저에서 기존 클라이언트 재사용
  if (!browserQueryClient) {
    browserQueryClient = new QueryClient(queryClientOptions);
  }
  return browserQueryClient;
}

interface TanstackQueryPoviderProps {
  children: React.ReactNode;
  initialDatas?: { queryKey: string[]; initialData: unknown }[];
}

export default function TanstackQueryPovider({
  children,
  initialDatas,
}: TanstackQueryPoviderProps) {
  const queryClient = getQueryClient();

  // 초기 데이터 설정
  initialDatas?.forEach(({ queryKey, initialData }) => {
    queryClient.setQueryData(queryKey, initialData);
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
