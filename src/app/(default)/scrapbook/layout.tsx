'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Bookmark, HighlighterIcon } from 'lucide-react';

import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import LogInOutButton from '@/components/common/LogInOutButton';
import Modal from '@/components/common/Modal';

interface NavItemProps {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItemProps[] = [
  {
    title: '최근 스크랩한 콘텐츠',
    icon: <Bookmark className="h-4 w-4" />,
    href: '/scrapbook/content',
  },
  {
    title: '형광펜과 메모',
    icon: <HighlighterIcon className="h-4 w-4" />,
    href: '/scrapbook/highlight',
  },
];

function NavItem({ item, active }: { item: NavItemProps; active: boolean }) {
  return (
    <Link href={item.href} className="w-full">
      <div
        className={`h-9 text-sm flex whitespace-nowrap justify-center items-center font-medium w-full gap-2 py-3 px-4 rounded-md transition-all 
          ${
            active
              ? 'bg-purple-100 text-purple-700 shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
          }`}
      >
        <span className="h-4 w-4 flex items-center justify-center rounded-md text-purple-500">
          {item.icon}
        </span>
        <span className="font-medium">{item.title}</span>
      </div>
    </Link>
  );
}

function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-full px-4 ">
      <h2 className="text-xl font-bold text-purple-700 ">내 스크랩북</h2>
      <div className="flex  gap-2  border-b-2 border-b-purple-50 my-8">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            active={pathname.startsWith(item.href)}
          />
        ))}
      </div>
    </nav>
  );
}

export default function ScrapbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 로그인 권한 훅
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data; // 로그인 상태 확인
  // 로그읜 모달
  const [showLoginModal, setShowLoginModal] = useState(!isLogin);

  const router = useRouter();

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <SideNav />
        <main className="flex-1">{children}</main>
      </div>

      {/* 로그인 안 되어있으면 로그인 해야만 하는 나갈 수 있는 모달 */}
      {showLoginModal && (
        <Modal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
            router.replace('/');
          }}
          title="로그인이 필요해요"
          description="이 기능을 이용하려면 로그인이 필요해요! "
        >
          <div className="flex justify-center gap-4 mt-4">
            <LogInOutButton />
          </div>
        </Modal>
      )}
    </>
  );
}
