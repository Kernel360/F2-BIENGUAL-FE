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
    console.error(error);
    router.push('/');
  }, [error]);
}
