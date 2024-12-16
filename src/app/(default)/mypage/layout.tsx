'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';

type Tab = 'profile' | 'point';

const tabs: { key: Tab; label: string; href: string }[] = [
  { key: 'profile', label: '프로필', href: '/mypage/profile' },
  // { key: 'point', label: '포인트', href: '/mypage/point' },
];

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  useEffect(() => {
    if (pathname.startsWith('/mypage/profile')) setActiveTab('profile');
    // else setActiveTab('point');
  }, [pathname]);

  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data;
  const router = useRouter();
  if (!isLogin) {
    router.replace('/login');
  }

  return (
    <>
      <nav className="bg-white border-b">
        <ul className="flex justify-center items-center h-11">
          {tabs.map(({ key, label, href }) => (
            <li key={key} className="relative">
              <Link
                href={href}
                className={`inline-block px-2 py-3 text-center font-medium transition-colors whitespace-nowrap ${
                  activeTab === key && 'font-bold'
                }`}
              >
                {label}
              </Link>
              {activeTab === key && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
              )}
            </li>
          ))}
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
}
