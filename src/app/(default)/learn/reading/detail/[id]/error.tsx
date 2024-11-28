'use client';

// Error boundaries must be Client Components
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('error바운더리', error);
  }, [error]);

  const router = useRouter();
  return (
    <div className=" w-full h-full py-16 flex items-center justify-center bg-gradient-to-r text-purple-600">
      <div className="container p-4 md:px-6 flex flex-col items-center justify-center space-y-12 text-center">
        <h1 className="font-medium text-2xl  drop-shadow-lg ">
          에러가 발생했습니다 : {error.message}
        </h1>

        <div className="flex flex-col ">
          <Button
            className="bg-white text-purple-600 hover:bg-white/90 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 mt-6"
            onClick={() => router.back()}
          >
            이전 페이지로 돌아가기
          </Button>
          <Button
            className="bg-white text-purple-600 hover:bg-white/90 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 mt-6"
            onClick={() => reset()}
          >
            다시 시도하기
          </Button>
        </div>
      </div>
    </div>
  );
}
