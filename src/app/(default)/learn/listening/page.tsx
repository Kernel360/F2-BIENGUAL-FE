import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchPaginatedListeningPreview } from '@/api/queries/contentsQueries';
import LearnListeningClient from '@/app/(default)/learn/listening/LearnListeningClient';

export default async function ListeningPage({
  searchParams, // 서버 컴포넌트에서 직접 받을 수 있음
}: {
  searchParams: Record<string, string | undefined>;
}) {
  console.log('searchParams', searchParams);

  // 안전한 기본값 처리
  const page = Number(searchParams?.page || '1');
  const size = Number(searchParams?.size || '10');
  const sort = searchParams?.sort || 'createdAt';
  const direction = searchParams?.direction || 'DESC';
  const categoryId = Number(searchParams?.categoryId || '');

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      'paginatedListeningPreview',
      page,
      size,
      sort,
      direction,
      categoryId,
    ].filter((value) => value !== undefined),
    queryFn: () =>
      fetchPaginatedListeningPreview(page, size, sort, direction, categoryId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LearnListeningClient />
    </HydrationBoundary>
  );
}
