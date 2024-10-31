'use client';

/* eslint-disable react/button-has-type */
import React from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import useThrottling from '@/lib/useThrottling';
import { Script } from '@/types/ContentDetail';
import { LanguageCode } from '@/types/Scripts';

import { TextDisplay } from './TextDisplay';

interface LineViewProps {
  subtitles: Script[];
  selectedLanguages: LanguageCode[];
  currentSubtitleIndex: number;
  seekTo: (timeInSeconds: number) => void;
  onSelectWord: (word: string, subtitle: Script, index: number) => void;
}

export function LineView({
  subtitles,
  selectedLanguages,
  currentSubtitleIndex,
  seekTo,
  onSelectWord,
}: LineViewProps) {
  const totalSubtitles = subtitles.length;

  const handlePrevious = () => {
    if (currentSubtitleIndex > 0) {
      seekTo(subtitles[currentSubtitleIndex - 1].startTimeInSecond);
    }
  };

  const handleNext = () => {
    if (currentSubtitleIndex < totalSubtitles - 1) {
      seekTo(subtitles[currentSubtitleIndex + 1].startTimeInSecond);
    }
  };
  const throttledHandlePrevious = useThrottling({
    buttonClicked: handlePrevious,
  });
  const throttledHandleNext = useThrottling({
    buttonClicked: handleNext,
  });

  return (
    <div className="flex flex-col">
      <div className="self-end">
        <button onClick={throttledHandlePrevious} className="cursor-pointer">
          <ChevronLeft className="stroke-violet-400" />
        </button>
        <button onClick={throttledHandleNext} className="cursor-pointer">
          <ChevronRight className="stroke-violet-400" />
        </button>
      </div>

      {subtitles[currentSubtitleIndex] && (
        // TODO: 사용자가 자막이 언제 넘어갈지 알 수 있도록 progressbar 추가
        <TextDisplay
          subtitle={subtitles[currentSubtitleIndex]}
          selectedLanguages={selectedLanguages}
          onSelectWord={onSelectWord}
        />
      )}
    </div>
  );
}
