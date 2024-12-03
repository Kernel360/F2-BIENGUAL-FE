'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    // global-error must include html and body tags
    <html lang="en">
      <body>
        <div className="min-h-[400px] w-full flex items-center justify-center px-4">
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                콘텐츠를 불러올 수 없습니다
              </h2>
              <p className="text-sm text-gray-500">
                {error.message ||
                  '일시적인 오류가 발생했습니다. 다시 시도해 주세요.'}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => reset()}
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                다시 시도하기
              </Button>
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                이전 페이지로 돌아가기
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
