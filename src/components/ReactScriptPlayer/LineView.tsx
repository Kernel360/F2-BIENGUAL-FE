'use client';

/* eslint-disable react/button-has-type */
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LanguageCode, Subtitle } from '../../types/Scripts';
import { TextDisplay } from './TextDisplay';

interface LineViewProps {
  subtitles: Subtitle[];
  selectedLanguages: LanguageCode[];
  currentSubtitleIndex: number;
  seekTo: (timeInSeconds: number) => void;
  onSelectWord: (word: string, subtitle: Subtitle, index: number) => void;
  isVideoReadyButIsNotPlayingYet: boolean;
  bookmarkedIndices: number[];
}

export function LineView({
  subtitles,
  selectedLanguages,
  currentSubtitleIndex,
  seekTo,
  onSelectWord,
  isVideoReadyButIsNotPlayingYet,
  bookmarkedIndices,
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

  return (
    <div className="flex flex-col">
      <div className="self-end">
        <button onClick={handlePrevious} className="cursor-pointer">
          <ChevronLeft className="stroke-violet-400" />
        </button>
        <button onClick={handleNext} className="cursor-pointer">
          <ChevronRight className="stroke-violet-400" />
        </button>
      </div>
      {/* 비디오가 첫 로딩 후 재생되지 않았을 때만 준비 메세지 보여줌 */}
      {isVideoReadyButIsNotPlayingYet ? (
        <h2>영상을 재생해주세요!</h2>
      ) : (
        subtitles[currentSubtitleIndex] && (
          // TODO: 사용자가 자막이 언제 넘어갈지 알 수 있도록 progressbar 추가

          <div
            className={`p-6 transition-colors duration-300 ${
              bookmarkedIndices.includes(currentSubtitleIndex)
                ? 'bg-yellow-200' // 북마크된 자막 하이라이트
                : ''
            }`}
          >
            <TextDisplay
              subtitle={subtitles[currentSubtitleIndex]}
              selectedLanguages={selectedLanguages}
              onSelectWord={onSelectWord}
            />
          </div>
        )
      )}
    </div>
  );
}
