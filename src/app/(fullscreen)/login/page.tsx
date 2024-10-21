'use client';

import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, Headphones } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOAuthLogin = (provider: string) => {
    console.log(`Redirecting to ${provider} OAuth login...`);
    const returnUrl = searchParams.get('returnUrl');

    router.push(
      `${BASE_URL}/oauth2/authorization/${provider}${
        returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''
      }`,
    );
    // todo : 로그인 하고 db에 사용자의 카테고리 정보가 없으면 추가정보입력페이지로 이동
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900">
            영어 마스터의 지름길
          </h2>
          <p className="text-xl text-gray-600">
            리스닝과 리딩, 두 가지 핵심 영역을 정복하세요!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <BookOpen className="mx-auto h-8 w-8 text-blue-500" />
            <p className="mt-2 text-sm text-gray-600">CNN 기사에 바로 필기</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Headphones className="mx-auto h-8 w-8 text-red-500" />
            <p className="mt-2 text-sm text-gray-600">
              YouTube 영상 스크립트 공부
            </p>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Bi-Engual 로그인
            </CardTitle>
            <CardDescription className="text-center">
              소셜 계정으로 간편하게 시작하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              onClick={() => handleOAuthLogin('kakao')}
              className="w-full bg-[#FEE500] text-black hover:bg-[#FEE500]/90"
            >
              카카오로 로그인
            </Button>
            <Button
              onClick={() => handleOAuthLogin('naver')}
              className="w-full bg-[#03C75A] text-white hover:bg-[#03C75A]/90"
            >
              네이버로 로그인
            </Button>
            <Button
              onClick={() => handleOAuthLogin('google')}
              className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100"
            >
              Google로 로그인
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Login />
    </Suspense>
  );
}
