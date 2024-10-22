import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';

import type { Metadata } from 'next';

import '@/app/globals.css';
import ContentWrapper from '@/components/layout/ContentWrapper';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Toaster } from '@/components/ui/toaster';
import QueryClientProvider from '@/providers/QueryClientProvider';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Biengual',
  description: 'learn english with biengual',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieList = cookies();
  const isLoggedIn = !!cookieList.get('access_token');

  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>
        <QueryClientProvider
          initialDatas={[
            { queryKey: ['loginStatus'], initialData: { data: isLoggedIn } }, // 현재는 로그인상태만 받아서 넘겨줌, 추후 외부 스크랩도 추가 가능
          ]}
        >
          <Header />
          <ContentWrapper>{children}</ContentWrapper>
          <Toaster /> {/* shadcn toast사용하기 위한 설정  */}
          <MobileNav />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
