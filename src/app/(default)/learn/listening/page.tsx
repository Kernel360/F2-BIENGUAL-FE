// app/learn/listening/page.tsx

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchCategoriesByContentType } from '@/api/queries/categoryQueries';
import { fetchPaginatedListeningPreview } from '@/api/queries/contentsQueries';
import LearnListeningClient from '@/app/(default)/learn/listening/LearnListeningClient';

export default async function ListeningPage({
  searchParams, // 서버 컴포넌트에서 직접 받을 수 있음
}: {
  searchParams: Record<string, string | undefined>;
}) {
  // console.log('searchParams', searchParams);

  // 서버 컴포넌트라 useQueryClient 사용불가하므로 QueryClient 새로 생성
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['categories', 'LISTENING'],
    queryFn: () => fetchCategoriesByContentType('LISTENING'),
  });

  // 안전한 기본값 처리
  const page = Number(searchParams?.page || '1');
  const size = Number(searchParams?.size || '10');
  const sort = searchParams?.sort || 'createdAt';
  const direction = searchParams?.direction || 'DESC';
  const categoryId = searchParams?.categoryId || '';
  //  console.log('categoryId', categoryId);

  const categoryIdNumber = categoryId ? Number(categoryId) : undefined;
  //  console.log('categoryIdNumber', categoryIdNumber);

  await queryClient.prefetchQuery({
    queryKey: [
      'paginatedListeningPreview',
      page,
      size,
      sort,
      direction,
      categoryIdNumber,
    ].filter((value) => value !== undefined),
    queryFn: () =>
      fetchPaginatedListeningPreview(
        page,
        size,
        sort,
        direction,
        categoryIdNumber,
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LearnListeningClient />
    </HydrationBoundary>
  );
}
