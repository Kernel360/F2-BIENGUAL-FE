// app/learn/layout.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchCategoriesByContentType } from '@/api/queries/categoryQueries';
import { fetchPaginatedListeningPreview } from '@/api/queries/contentsQueries';

export default async function LearnPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const queryClient = new QueryClient();

  // 카테고리 데이터 미리 가져오기
  await queryClient.prefetchQuery({
    queryKey: ['categories', 'LISTENING'],
    queryFn: () => fetchCategoriesByContentType('LISTENING'),
  });
  await queryClient.prefetchQuery({
    queryKey: ['categories', 'READING'],
    queryFn: () => fetchCategoriesByContentType('READING'),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full mx-auto px-6">
        <main className="flex-1">{children}</main>
      </div>
    </HydrationBoundary>
  );
}
