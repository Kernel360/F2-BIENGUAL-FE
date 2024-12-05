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
  searchParams, // 서버 컴포넌트에서 직접 받을 수 있음
}: {
  children: React.ReactNode;
  searchParams: Record<string, string | undefined>;
}) {
  console.log('searchParams', searchParams);

  // 안전한 기본값 처리
  const page = searchParams?.page || '1'; // 기본값 1
  const size = searchParams?.size || '10'; // 기본값 10
  const sort = searchParams?.sort || 'createdAt'; // 기본값 createdAt
  const direction = searchParams?.direction || 'DESC'; // 기본값 DESC
  const categoryId = searchParams?.categoryId || ''; // categoryId는 undefined 허용

  const pageNumber = Number(page);
  const sizeNumber = Number(size);
  const categoryIdNumber = categoryId ? Number(categoryId) : undefined;

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

  // TODO : pathname넣기
  // 콘텐츠 데이터 미리 가져오기
  await queryClient.prefetchQuery({
    queryKey: [
      'paginatedListeningPreview',
      pageNumber,
      sizeNumber,
      sort,
      direction,
      categoryIdNumber,
    ].filter((value) => value !== undefined),
    queryFn: () =>
      fetchPaginatedListeningPreview(
        pageNumber,
        sizeNumber,
        sort,
        direction,
        categoryIdNumber,
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full mx-auto px-6">
        <main className="flex-1">{children}</main>
      </div>
    </HydrationBoundary>
  );
}
