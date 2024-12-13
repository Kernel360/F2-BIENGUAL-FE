'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import SideArea from './SideArea';

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();

  const showSideArea = !(
    pathname?.startsWith('/dashboard') || pathname?.startsWith('/mypage')
  );

  return (
    <div className="flex w-full max-w-[1140px] mx-auto ">
      <div
        className={` ${cn(showSideArea ? ` w-full max-w-[830px] py-[60px]` : `w-full justify-center`)} `}
      >
        {children}
      </div>

      {showSideArea && (
        <div className="hidden md:block">
          <SideArea />
        </div>
      )}
    </div>
  );
}
