// app/learn/listening/page.tsx

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchPaginatedListeningPreview } from '@/api/queries/contentsQueries';
import LearnListeningClient from '@/app/(default)/learn/listening/LearnListeningClient';
import { fetchCategoriesByContentType } from '@/api/queries/categoryQueries';


export default async function ListeningPage({
  searchParams, // 서버 컴포넌트에서 직접 받을 수 있음
}: {
  searchParams: Record<string, string | undefined>;
}) {
  console.log('searchParams', searchParams);

     // 서버 컴포넌트라 useQueryClient 사용불가하므로 QueryClient 새로 생성

     const queryClient = new QueryClient();
     // 카테고리 데이터 미리 가져오기
     await queryClient.prefetchQuery({
       queryKey: ['categories', 'LISTENING'],
       queryFn: () => fetchCategoriesByContentType('LISTENING'),
     });

  // 안전한 기본값 처리
   const page = Number(searchParams?.page || '1'); // 기본값 1
   const size = Number(searchParams?.size || '10'); // 기본값 10
   const sort = searchParams?.sort || 'createdAt'; // 기본값 createdAt
   const direction = searchParams?.direction || 'DESC'; // 기본값 DESC
   const categoryId = searchParams?.categoryId || ''; // categoryId는 undefined 허용
   console.log('categoryId', categoryId);
   const categoryIdNumber = categoryId ? Number(categoryId) : undefined;
   console.log('categoryIdNumber', categoryIdNumber);

 

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
      fetchPaginatedListeningPreview(page, size, sort, direction, categoryIdNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LearnListeningClient />
    </HydrationBoundary>
  );
}
