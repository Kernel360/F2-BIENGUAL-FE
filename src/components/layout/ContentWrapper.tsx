'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import SideArea from './SideArea';

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="flex justify-center max-w-[1140px] mx-auto">
      {pathname?.includes('/mypage') ? (
        <div>{children}</div>
      ) : (
        <>
          <div className="flex-1 py-[60px]">{children}</div>
          <SideArea />
        </>
      )}
    </div>
  );
}
