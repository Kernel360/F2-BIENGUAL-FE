import React from 'react';

import '@/app/globals.css';
import localFont from 'next/font/local';

import { Metadata } from 'next';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap', // 폰트 로드 전에 기본 폰트 표시
});

export const metadata: Metadata = {
  title: 'Biengual',
  description: 'learn english with biengual',
};

export default function FullscreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>{children}</body>
    </html>
  );
}
