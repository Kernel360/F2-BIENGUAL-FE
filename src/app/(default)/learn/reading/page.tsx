// app/(default)/learn/reading/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchPaginatedReadingPreview } from '@/api/queries/contentsQueries';
import LearnReadingClient from '@/app/(default)/learn/reading/LearnReadingClient';

export default async function ReadingPage({
  searchParams, // 서버 컴포넌트에서 직접 받을 수 있음
}: {
  searchParams: Record<string, string | undefined>;
}) {
  console.log('searchParams', searchParams);

  // 안전한 기본값 처리
   const page = Number(searchParams?.page || '1'); // 기본값 1
   const size = Number(searchParams?.size || '10'); // 기본값 10
   const sort = searchParams?.sort || 'createdAt'; // 기본값 createdAt
   const direction = searchParams?.direction || 'DESC'; // 기본값 DESC
   const categoryId = searchParams?.categoryId || ''; // categoryId는 undefined 허용
   console.log('categoryId', categoryId);
   const categoryIdNumber = categoryId ? Number(categoryId) : undefined;
   console.log('categoryIdNumber', categoryIdNumber);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      'paginatedReadingPreview',
      page,
      size,
      sort,
      direction,
      categoryIdNumber,
    ].filter((value) => value !== undefined),
    queryFn: () =>
      fetchPaginatedReadingPreview(page, size, sort, direction, categoryIdNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LearnReadingClient />
    </HydrationBoundary>
  );
}
