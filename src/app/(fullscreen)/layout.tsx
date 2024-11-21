import React from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from '@/components/ui/toaster';
import QueryClientProvider from '@/providers/QueryClientProvider';

export default function FullscreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider>
      {children}
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
