'use client';

import { useRef, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function SearchComponent() {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSearch = () => {
    if (inputRef.current) {
      const query = inputRef.current.value.replace(/\n/g, '').trim(); // 개행문자 제거 및 공백 제거

      if (query.length <= 0 || query.length >= 20) {
        toast({
          duration: 1000,
          description: '1~20자 이내로 검색해주세요',
        });

        return;
      }

      router.push(`/search?q=${encodeURIComponent(query)}`);
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
      className="hidden md:flex items-center min-w-[200px] w-[300px] space-x-1"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="제목 또는 내용을 검색해보세요"
        className="min-h-4 p-2 pl-4 outline-none border-none flex-grow rounded-lg bg-gray-50 text-gray-600 focus:ring-1 focus:ring-violet-400 focus:ring-opacity-70"
        onKeyDown={handleKeyDown}
      />
      <Button variant="ghost" size="icon" onClick={handleButtonClick}>
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
}
