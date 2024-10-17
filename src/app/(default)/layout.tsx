import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/app/globals.css';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import ContentWrapper from '@/components/layout/ContentWrapper';
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
  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>
        <QueryClientProvider>
          <Header />
          <ContentWrapper>{children}</ContentWrapper>
          <MobileNav />
        </QueryClientProvider>
      </body>
    </html>
  );
}
