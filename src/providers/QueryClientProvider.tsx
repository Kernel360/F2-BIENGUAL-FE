'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClientOptions = {
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, // todo : 이것때문에 자동설정된  refetchOnWindowFocus 작동안하는 이슈로 추측됨
    },
  },
};

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // 서버에서는 항상 새로운 QueryClient 생성
    return new QueryClient(queryClientOptions);
  }

  // 브라우저에서는 기존 클라이언트를 재사용하거나 새로 생성
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

  initialDatas?.forEach(({ queryKey, initialData }) => {
    queryClient.setQueryData(queryKey, initialData);
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
