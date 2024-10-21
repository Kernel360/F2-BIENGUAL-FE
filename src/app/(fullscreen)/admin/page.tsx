'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CreateContent from './CreateContent';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'CreateContent':
        return <CreateContent />;
      case 'ContentList':
        return null;
      default:
        return <CreateContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden sm:flex w-64 flex-col bg-white p-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">어드민 대시보드</h2>
          <nav className="space-y-2">
            <Button
              variant={activeTab === 'CreateContent' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('CreateContent')}
            >
              영상 컨텐츠 추가
            </Button>
          </nav>
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
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
