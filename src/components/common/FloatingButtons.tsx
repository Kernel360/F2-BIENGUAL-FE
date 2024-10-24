'use client';

import { Bookmark, Languages } from 'lucide-react';

import { Button } from '@/components/ui/button';

// 부모 컴포넌트로부터 스크랩 상태와 함수를 props로 받음
export default function FloatingButtons({
  isScrapped,
  onScrapToggle,
  showTranslate,
  onTranslateToggle,
}: {
  isScrapped: boolean | undefined;
  onScrapToggle: () => void;
  showTranslate?: boolean;
  onTranslateToggle?: () => void;
}) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
      {onTranslateToggle && (
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full w-12 h-12 ${showTranslate && 'bg-primary'}`}
          onClick={onTranslateToggle}
        >
          <Languages
            className="h-6 w-6"
            color={showTranslate ? 'white' : 'black'}
          />
        </Button>
      )}
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full w-12 h-12 ${isScrapped && 'bg-primary'}`}
        onClick={onScrapToggle} // 스크랩 상태를 토글하는 함수 실행
      >
        <Bookmark className="h-6 w-6" color={isScrapped ? 'white' : 'black'} />
        <span className="sr-only">Bookmark</span>
      </Button>
    </div>
  );
}
