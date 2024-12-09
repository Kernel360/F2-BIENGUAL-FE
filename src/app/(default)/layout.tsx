import { cookies } from 'next/headers';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ContentWrapper from '@/components/layout/ContentWrapper';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Toaster } from '@/components/ui/toaster';
import TanstackQueryPovider from '@/providers/QueryClientProvider';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieList = cookies();
  const isLoggedIn = !!cookieList.get('access_token');

  return (
    <TanstackQueryPovider
      initialDatas={[
        { queryKey: ['loginStatus'], initialData: { data: isLoggedIn } }, // 현재는 로그인상태만 받아서 넘겨줌, 추후 외부 스크랩도 추가 가능
      ]}
    >
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <Toaster />
      <MobileNav />
      <ReactQueryDevtools initialIsOpen={false} />
    </TanstackQueryPovider>
  );
}
