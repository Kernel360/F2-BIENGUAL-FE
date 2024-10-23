import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import '@/app/globals.css';
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
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
