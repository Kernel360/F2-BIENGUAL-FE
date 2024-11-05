import React from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@/app/globals.css';
import QueryClientProvider from '@/providers/QueryClientProvider';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
          {children}
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
