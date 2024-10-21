'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Tab = 'create' | 'list';
const tabs: { key: Tab; label: string; href: string }[] = [
  {
    key: 'create',
    label: '영상 컨텐츠 추가',
    href: '/admin/create',
  },
  { key: 'list', label: '영상 컨텐츠 목록', href: '/admin/list' },
];
export default function AdminPage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('create');

  useEffect(() => {
    if (pathname.startsWith('/admin/list')) setActiveTab('list');
    else setActiveTab('create');
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden sm:flex w-64 flex-col bg-white p-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">어드민 대시보드</h2>
          <ul className="space-y-2">
            {tabs.map(({ key, label, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className={`inline-block px-2 py-3 text-center font-medium transition-colors whitespace-nowrap ${
                    activeTab === key && 'font-bold'
                  }`}
                >
                  {label}
                </Link>{' '}
                {activeTab === key && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
