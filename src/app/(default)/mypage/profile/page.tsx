import { cookies } from 'next/headers';

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { fetchAllCategories } from '@/api/queries/categoryQueries';
import { fetchUserInfo } from '@/api/queries/userQueries';

import ProfileClient from './ProfileClient';

export default async function mypageProfilePage() {
  const cookieHeader = cookies().toString();

  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ['user'],
      queryFn: () => fetchUserInfo({ Cookie: cookieHeader }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: () => fetchAllCategories({ Cookie: cookieHeader }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileClient />
    </HydrationBoundary>
  );
}
