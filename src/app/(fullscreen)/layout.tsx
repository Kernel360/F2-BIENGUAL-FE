import React from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';
import QueryClientProvider from '@/providers/QueryClientProvider';

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
