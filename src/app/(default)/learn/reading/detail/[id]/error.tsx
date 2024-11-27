'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    router.back();
  }, [error]);
}
