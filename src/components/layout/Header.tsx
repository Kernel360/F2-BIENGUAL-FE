'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  BookHeadphones,
  Bookmark,
  CircleUserRound,
  ChartPie,
  Search,
} from 'lucide-react';

import LogInOutButton from '@/components/common/LogInOutButton';
import SearchComponent from '@/components/common/SearchComponent';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import MobileSearch from './MobileSearch';

export const navItems = [
  { name: '학습', href: '/learn/listening', icon: BookHeadphones },
  { name: '스크랩', href: '/scrapbook/content', icon: Bookmark },
  { name: '마이페이지', href: '/mypage/profile', icon: CircleUserRound },
  { name: '대시보드', href: '/dashboard', icon: ChartPie },
];

export function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 bg-[rgba(255,255,255,0.95)] border-b">
        <header className="flex items-center max-w-[1440px] h-16 mx-auto px-6 z-100">
          <Link href="/" className="text-lg font-semibold mr-6">
            Biengual
          </Link>
          <nav className="hidden md:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`py-3 px-6 flex-shrink-0 font-semibold hover:text-primary ${
                  pathname === item.href || pathname.startsWith(item.href)
                    ? 'font-bold'
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex ml-auto h-5 items-center space-x-2 text-sm">
            <div className="hidden md:block">
              <SearchComponent />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Separator orientation="vertical" />
            <LogInOutButton />
          </div>
        </header>
      </div>
      <MobileSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </>
  );
}
