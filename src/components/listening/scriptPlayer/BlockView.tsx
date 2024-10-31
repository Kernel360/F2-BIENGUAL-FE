'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect } from 'react';

import { convertTime } from '@/lib/convertTime';
import { cn } from '@/lib/utils';
import { Script } from '@/types/ContentDetail';
import { LanguageCode } from '@/types/Scripts';

import { TextDisplay } from './TextDisplay';

interface BlockViewProps {
  subtitles: Script[];
  currentSubtitleIndex: number;
  selectedLanguages: LanguageCode[]; // 선택된 언어 배열
  seekTo: (timeInSeconds: number) => void;
  onClickSubtitle: (subtitle: Script, index: number) => void;
  onSelectWord: (word: string, subtitle: Script, index: number) => void;
}

export function BlockView({
  subtitles,
  currentSubtitleIndex,
  selectedLanguages,
  seekTo,
  onClickSubtitle,
  onSelectWord,
}: BlockViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      if (currentSubtitleIndex < containerRef.current.children.length - 1) {
        const container = containerRef.current;
        const target = container.children[currentSubtitleIndex];

        // 컨테이너의 상단에서부터 타겟까지의 거리 계산
        const targetTop = target.getBoundingClientRect().top;
        const containerTop = container.getBoundingClientRect().top;
        const relativeTop = targetTop - containerTop;

        container.scrollBy({
          top: relativeTop - 20,
          behavior: 'smooth',
        });
      }
    }
  }, [currentSubtitleIndex]);

  return (
    <div
      ref={containerRef}
      className="h-[16rem] p-6 flex flex-col overflow-y-scroll"
    >
      {subtitles.map((subtitle, index) => (
        <div
          className={cn(
            'p-4 rounded-lg transition-colors duration-300 ease-in-out ',
            index === currentSubtitleIndex ? 'bg-gray-200' : 'bg-transparent',
          )}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={() => {
            // TODO(@smosco): 자막 클릭 함수 구현
            seekTo(subtitle.startTimeInSecond);
            onClickSubtitle(subtitle, index);
          }}
        >
          <button className="w-20 px-3 py-2 mb-2 border-none rounded-full bg-violet-200 cursor-pointer text-sm text-[#5a5a5a]">
            {convertTime(subtitle.startTimeInSecond)}
          </button>

          <TextDisplay
            subtitle={subtitles[index]}
            selectedLanguages={selectedLanguages}
            onSelectWord={onSelectWord}
          />
        </div>
      ))}
    </div>
  );
}
