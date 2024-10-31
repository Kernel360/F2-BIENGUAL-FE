'use client';

import React from 'react';

import { findCurrentSubtitleIndex } from '@/lib/findCurrentSubtitleIndex';
import { Script } from '@/types/ContentDetail';
import { LanguageCode, Subtitle } from '@/types/Scripts';

import { BlockView } from './BlockView';
import { LineView } from './LineView';

export interface ReactScriptPlayerProps {
  mode: 'line' | 'block';
  subtitles: Script[];
  selectedLanguages: LanguageCode[];
  seekTo: (timeInSeconds: number) => void;
  currentTime: number;
  onClickSubtitle: (subtitle: Subtitle, index: number) => void;
  onSelectWord: (word: string, subtitle: Subtitle, index: number) => void;
}

export function ReactScriptPlayer({
  mode,
  subtitles,
  selectedLanguages,
  seekTo,
  currentTime,
  onClickSubtitle,
  onSelectWord,
}: ReactScriptPlayerProps) {
  const currentSubtitleIndex =
    findCurrentSubtitleIndex(subtitles, currentTime) ?? 0;

  return (
    <div className="flex flex-col border-2 border-violet-100 rounded-xl ">
      <p className="p-6 text-xl font-bold">Transcript</p>

      <div>
        {/* TODO(@smosco): line, block 뷰 props가 거의 동일하기 때문에 공통 props로 추출해서 관리 */}
        {mode === 'line' && (
          <LineView
            subtitles={subtitles}
            currentSubtitleIndex={currentSubtitleIndex}
            selectedLanguages={selectedLanguages}
            seekTo={seekTo}
            onSelectWord={onSelectWord}
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
          />
        )}
      </div>
    </div>
  );
}
