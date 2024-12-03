'use client';

import { useState, useEffect, useRef } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  ChevronUp,
  X,
  HouseIcon,
  BookHeadphones,
  Bookmark,
  ChartPie,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import MobileLearningTracker from './side/MobileLearningTracker';

interface SwipeablePanelProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SwipeablePanel({
  children,
  isOpen,
  setIsOpen,
}: SwipeablePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);

  // 사용자가 화면을 터치한 시점의 y 좌표 기록
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  // 사용자가 손가락을 움직일 때 호출
  // 터치 시작 지점(startY)과 현재 터치 지점(currentY) 사시의 차이(diff)를 계산
  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null || !panelRef.current) return;
    const currentY = e.touches[0].clientY;
    const diff = startY.current - currentY;

    if (diff > 50 && !isOpen) {
      setIsOpen(true);
    } else if (diff < -50 && isOpen) {
      setIsOpen(false);
    }
  };

  const handleTouchEnd = () => {
    startY.current = null;
  };

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.style.transition = 'transform 0.3s ease-out';
      panelRef.current.style.transform = isOpen
        ? 'translateY(0)'
        : 'translateY(100%)';
    }
  }, [isOpen]);

  return (
    <div
      ref={panelRef}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t rounded-t-2xl shadow-lg z-30"
      style={{
        height: 'calc(100% - 12rem)',
        touchAction: 'none',
        transform: 'translateY(100%)',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="p-4 h-full overflow-auto">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 z-10"
          onClick={() => setIsOpen(false)}
        >
          <X />
        </Button>
        {children}
      </div>
    </div>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  const navItems = [
    { name: '학습', href: '/learn/listening', icon: BookHeadphones },
    { name: '스크랩', href: '/scrapbook/content', icon: Bookmark },
    { name: '홈', href: '/', icon: HouseIcon },
    { name: '대시보드', href: '/dashboard', icon: ChartPie },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'text-violet-600 bg-violet-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setIsTrackerOpen((prev) => !prev)}
            className="flex flex-col items-center py-1 px-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ChevronUp className="h-6 w-6" />
            <span className="text-xs mt-1">트래커</span>
          </button>
        </div>
      </nav>
      <SwipeablePanel isOpen={isTrackerOpen} setIsOpen={setIsTrackerOpen}>
        <MobileLearningTracker />
      </SwipeablePanel>
    </>
  );
}
