'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ContentTypeFilter() {
  const path = usePathname();

  const linkItems = [
    { href: '/learn/listening', label: '리스닝', key: 'listening' },
    { href: '/learn/reading', label: '리딩', key: 'reading' },
  ];

  return (
    <div className="flex space-x-2">
      {linkItems.map(({ href, label, key }) => {
        const isActive = path === href;

        return (
          <Link key={key} href={href}>
            <Button
              variant={isActive ? 'default' : 'outline'}
              className="rounded-full px-4 py-2 text-sm font-medium"
            >
              {label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
