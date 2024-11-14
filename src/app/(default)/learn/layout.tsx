import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchAllCategories } from '@/api/queries/categoryQueries';

export default async function LearnPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: () => fetchAllCategories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full mx-auto pl-6">
        <main className="flex-1">{children}</main>
      </div>
    </HydrationBoundary>
  );
}
