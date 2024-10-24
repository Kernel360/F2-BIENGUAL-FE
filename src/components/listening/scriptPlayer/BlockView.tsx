'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect } from 'react';

import { convertTime } from '@/lib/convertTime';
import { LanguageCode, Subtitle } from '@/types/Scripts';

import { TextDisplay } from './TextDisplay';

interface BlockViewProps {
  subtitles: Subtitle[];
  currentSubtitleIndex: number;
  selectedLanguages: LanguageCode[]; // 선택된 언어 배열
  seekTo: (timeInSeconds: number) => void;
  onClickSubtitle: (subtitle: Subtitle, index: number) => void;
  onSelectWord: (word: string, subtitle: Subtitle, index: number) => void;
  bookmarkedIndices: number[];
}

export function BlockView({
  subtitles,
  currentSubtitleIndex,
  selectedLanguages,
  seekTo,
  onClickSubtitle,
  onSelectWord,
  bookmarkedIndices,
}: BlockViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // console.log(containerRef.current);
      if (currentSubtitleIndex < containerRef.current.children.length - 1) {
        containerRef.current.children[currentSubtitleIndex].scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
      }
    }
  }, [currentSubtitleIndex]);

  return (
    <div ref={containerRef} className="flex flex-col">
      {subtitles.map((subtitle, index) => (
        <div
          className={`p-4 rounded-lg transition-colors duration-300 ease-in-out ${
            // eslint-disable-next-line no-nested-ternary
            bookmarkedIndices.includes(index)
              ? 'bg-yellow-200' // 북마크된 자막 하이라이트
              : index === currentSubtitleIndex
                ? 'bg-violet-50'
                : ''
          }`}
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
