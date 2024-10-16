'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Tab = 'profile' | 'learn' | 'challenges';

const tabs: { key: Tab; label: string; href: string }[] = [
  { key: 'profile', label: '프로필', href: '/mypage/profile' },
  { key: 'learn', label: '나의 학습', href: '/mypage/learn' },
  { key: 'challenges', label: '나의 챌린지', href: '/mypage/challenges' },
];

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  useEffect(() => {
    if (pathname.startsWith('/mypage/learn')) setActiveTab('learn');
    else if (pathname.startsWith('/mypage/challenges'))
      setActiveTab('challenges');
    else setActiveTab('profile');
  }, [pathname]);

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
