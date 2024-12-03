'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useRequestLogout } from '@/api/hooks/useUserInfo'; // custom hook import
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import { Button } from '@/components/ui/button';

interface LogInOutButtonProps {
  textColor?: string;
  bgColor?: string;
  className?: string;
}

export default function LogInOutButton({
  textColor,
  bgColor,
  className,
}: LogInOutButtonProps) {
  const { data: isLogin } = useUserLoginStatus();
  const { mutate: fetchUserLogout } = useRequestLogout();
  const currentPathname = usePathname();

  return isLogin?.data ? (
    <Button onClick={() => fetchUserLogout()}>로그아웃</Button>
  ) : (
    <Link href={`/login?returnUrl=${currentPathname}`}>
      <Button
        className={`${bgColor || ''} ${textColor || ''} ${className} w-full`}
      >
        로그인하기
      </Button>
    </Link>
  );
}
