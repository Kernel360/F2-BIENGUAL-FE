'use client';

import { useRef, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function SearchComponent() {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    if (inputRef.current) {
      const query = inputRef.current.value.replace(/\n/g, '').trim(); // 개행문자 제거 및 공백 제거
      if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputRef.current) {
      handleSearch();
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={searchRef}
      className="  flex items-center min-w-[200px] w-[300px] space-x-1"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="콘텐츠 제목을 검색하세요"
        className="min-h-4 p-2 outline-none border-none flex-grow rounded-lg bg-gray-50 text-gray-600 focus:ring-1 focus:ring-violet-400 focus:ring-opacity-70"
        onKeyDown={handleKeyDown}
      />
      <Button variant="ghost" size="icon" onClick={handleButtonClick}>
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
}
