import { cookies } from 'next/headers';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  fetchMissionStatus,
  fetchRecentMissionHistory,
} from '@/api/queries/missionQueries';
import { fetchUserTime } from '@/api/queries/userQueries';
import ContentWrapper from '@/components/layout/ContentWrapper';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Toaster } from '@/components/ui/toaster';
import TanstackQueryPovider from '@/providers/QueryClientProvider';

export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieList = cookies();
  const isLoggedIn = !!cookieList.get('access_token');

  const cookieHeader = cookies().toString();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialDatas: { queryKey: string[]; initialData: any }[] = [
    { queryKey: ['loginStatus'], initialData: { data: isLoggedIn } },
  ];

  const [userTimeResult, missionStatusResult, recentMissionHistoryResult] =
    await Promise.allSettled([
      fetchUserTime({ Cookie: cookieHeader }),
      fetchMissionStatus({ Cookie: cookieHeader }),
      fetchRecentMissionHistory({ Cookie: cookieHeader }),
    ]);

  if (userTimeResult.status === 'fulfilled') {
    initialDatas.push({
      queryKey: ['userTime'],
      initialData: userTimeResult.value,
    });
  }
  if (missionStatusResult.status === 'fulfilled') {
    initialDatas.push({
      queryKey: ['missionStatus'],
      initialData: missionStatusResult.value,
    });
  }

  if (recentMissionHistoryResult.status === 'fulfilled') {
    initialDatas.push({
      queryKey: ['recentMissionHistory'],
      initialData: recentMissionHistoryResult.value,
    });
  }
  // console.log('initialDatas', initialDatas);
  return (
    <TanstackQueryPovider initialDatas={initialDatas}>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <Toaster />
      <MobileNav />
      <ReactQueryDevtools initialIsOpen={false} />
    </TanstackQueryPovider>
  );
}
