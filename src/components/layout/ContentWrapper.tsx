'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import SideArea from './SideArea';

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="w-full max-w-[1140px] mx-auto">
      {pathname?.includes('/mypage') || pathname?.includes('/dashboard') ? (
        <div>{children}</div>
      ) : (
        <div className="flex">
          <div className="w-full max-w-[830px] py-[60px]">{children}</div>
          <SideArea />
        </div>
      )}
    </div>
  );
}
