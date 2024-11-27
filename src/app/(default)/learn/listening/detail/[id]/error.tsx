'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);
}
