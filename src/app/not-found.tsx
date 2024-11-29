'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-12 text-center">
        <div className="space-y-6">
          <h1 className="text-9xl font-bold tracking-tighter animate-bounce">
            404
          </h1>
          <h2 className="text-3xl font-semibold">Page Not Found</h2>
          <p className="text-lg">
            서비스 이용에 불편함을 드려 죄송합니다.
            <br />
            올바른 URL을 입력하였는지 다시 한번 확인해 주세요.
          </p>
          <div className="flex flex-col ">
            <Button
              className="bg-white text-purple-600 hover:bg-white/90 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 mt-6"
              onClick={() => router.back()}
            >
              이전 페이지로 돌아가기
            </Button>
            <Button
              className="bg-white text-purple-600 hover:bg-white/90 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 mt-6"
              onClick={() => router.push('/')}
            >
              홈으로 가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
