'use client';

import { useRef, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface MobileSearchProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileSearch({ isOpen, setIsOpen }: MobileSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = () => {
    if (inputRef.current) {
      const query = inputRef.current.value.replace(/\n/g, '').trim();
      if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
        setIsOpen(false);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bottom-16 bg-background z-50 flex flex-col">
      <div className="flex items-center px-4 h-16 border-b">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="제목 검색하기"
          className="flex-1 ml-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          onKeyDown={handleKeyDown}
        />
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {/* 추후 검색 결과나 추천 검색어 등을 표시 */}
      </div>
    </div>
  );
}
