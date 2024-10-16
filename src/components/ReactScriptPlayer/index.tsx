'use client';

import React from 'react';
import { findCurrentSubtitleIndex } from '@/lib/findCurrentSubtitleIndex';
import { Script } from '@/types/ContentDetail';
import { LanguageCode, Subtitle } from '../../types/Scripts';
import { LineView } from './LineView';
import { BlockView } from './BlockView';

export interface ReactScriptPlayerProps {
  mode: 'line' | 'block';
  subtitles: Script[];
  selectedLanguages: LanguageCode[];
  seekTo: (timeInSeconds: number) => void;
  currentTime: number;
  onClickSubtitle: (subtitle: Subtitle, index: number) => void;
  onSelectWord: (word: string, subtitle: Subtitle, index: number) => void;
  isVideoReadyButIsNotPlayingYet: boolean;
  bookmarkedIndices: number[];
}

export function ReactScriptPlayer({
  mode,
  subtitles,
  selectedLanguages,
  seekTo,
  currentTime,
  onClickSubtitle,
  onSelectWord,
  isVideoReadyButIsNotPlayingYet,
  bookmarkedIndices,
}: ReactScriptPlayerProps) {
  const currentSubtitleIndex =
    findCurrentSubtitleIndex(subtitles, currentTime) ?? 0;

  return (
    <div className="flex flex-col h-[16rem] p-6 border-2 border-violet-100 rounded-xl overflow-y-auto">
      <p className="text-xl font-bold">Transcript</p>

      <div>
        {/* TODO(@smosco): line, block 뷰 props가 거의 동일하기 때문에 공통 props로 추출해서 관리 */}
        {mode === 'line' && (
          <LineView
            subtitles={subtitles}
            currentSubtitleIndex={currentSubtitleIndex}
            selectedLanguages={selectedLanguages}
            seekTo={seekTo}
            onSelectWord={onSelectWord}
            isVideoReadyButIsNotPlayingYet={isVideoReadyButIsNotPlayingYet}
            bookmarkedIndices={bookmarkedIndices}
          />
        )}
        {mode === 'block' && (
          <BlockView
            subtitles={subtitles}
            currentSubtitleIndex={currentSubtitleIndex}
            selectedLanguages={selectedLanguages}
            seekTo={seekTo}
            onClickSubtitle={onClickSubtitle}
            onSelectWord={onSelectWord}
            bookmarkedIndices={bookmarkedIndices}
          />
        )}
      </div>
    </div>
  );
}
