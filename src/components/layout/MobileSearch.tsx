/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { useRef, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface MobileSearchProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileSearch({ isOpen, setIsOpen }: MobileSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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

      router.replace(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  if (!isOpen) return null;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="md:hidden fixed inset-0 bottom-16 bg-background z-40 flex flex-col bg-black bg-opacity-50"
      onClick={() => setIsOpen(false)}
    >
      <div className="bg-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center px-4 h-16 border-b">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="제목 또는 내용 검색하기"
            className="flex-1 ml-3 outline-none text-foreground placeholder:text-muted-foreground"
            onKeyDown={handleKeyDown}
          />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-8 w-8" />
          </Button>
        </div>
        <div className="h-[280px] px-8 py-6 overflow-auto">
          {/* 추후 검색 결과나 추천 검색어 등을 표시 */}
          <p className="text-sm text-gray-500">20자 이내로 검색해주세요</p>
          <p className="text-sm text-gray-500 mt-2">약간의 오타를 허용해요</p>
        </div>
      </div>
    </div>
  );
}
