'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  BookHeadphones,
  Bookmark,
  ChartPie,
  Search,
  Coins,
  User,
  LogIn,
} from 'lucide-react';

import { useFetchCurrentPoints } from '@/api/hooks/useDashboard';
import { useRequestLogout } from '@/api/hooks/useUserInfo';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import SearchComponent from '@/components/common/SearchComponent';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

import MobileSearch from './MobileSearch';

const navItems = [
  { name: '학습', href: '/learn/listening', icon: BookHeadphones },
  { name: '스크랩', href: '/scrapbook/content', icon: Bookmark },
  { name: '대시보드', href: '/dashboard', icon: ChartPie },
];

export function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: isLogin } = useUserLoginStatus();

  const { data: currentPoints } = useFetchCurrentPoints();

  const { mutate: fetchUserLogout } = useRequestLogout();

  return (
    <>
      <div className="sticky top-0 z-50 bg-white bg-opacity-95 border-b">
        <header className="flex items-center max-w-[1440px] h-16 mx-auto px-6">
          <Link href="/" className="text-lg font-bold mr-6 text-primary">
            Biengual
          </Link>
          <nav className="hidden md:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`py-3 px-6 flex-shrink-0 font-semibold hover:text-primary transition-colors ${
                  pathname === item.href || pathname.startsWith(item.href)
                    ? 'text-primary'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex ml-auto h-5 items-center space-x-4 text-sm">
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
            <Separator orientation="vertical" className="hidden md:block" />

            {isLogin?.data ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      {/* TODO(@smosco): 아바타 이미지 수정 */}
                      {/* <AvatarImage src="/avatars/01.png" alt="@username" /> */}
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-40 px-3"
                  align="end"
                  forceMount
                >
                  <Link href="/mypage/profile">
                    <DropdownMenuItem className="flex">
                      <User className=" h-4 w-4" />
                      <span>마이페이지</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/point">
                    <DropdownMenuItem className="">
                      {/* <span className="flex items-center text-xs border py-1 px-2 rounded"> */}
                      <Coins className=" h-4 w-4" />
                      포인트 :
                      <span className="text-primary">
                        {currentPoints?.data.currentPoint} P
                      </span>
                      {/* </span> */}
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center justify-center py-1.5 "
                    onClick={() => fetchUserLogout()}
                  >
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={`/login?returnUrl=${pathname}`}>
                <Button variant="outline" className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  로그인
                </Button>
              </Link>
            )}
          </div>
        </header>
      </div>
      <MobileSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </>
  );
}
