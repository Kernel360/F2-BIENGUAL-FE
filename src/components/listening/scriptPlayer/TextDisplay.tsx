'use client';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import { Subtitle, LanguageCode } from '@/types/Scripts';

export function TextDisplay({
  subtitle,
  selectedLanguages,
  onSelectWord,
}: {
  subtitle: Subtitle;
  selectedLanguages: LanguageCode[]; // 선택된 언어 배열
  onSelectWord: (word: string, subtitle: Subtitle, index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {selectedLanguages.map((language) => (
        <p
          key={language}
          className={`animate-fadeIn ${language === 'enScript' ? 'font-[600]' : ''}`}
          onMouseUp={() => {
            const selection = window.getSelection();
            if (selection && selection.toString()) {
              const selectedWord = selection.toString().trim();
              if (selectedWord) {
                // TODO(@smosco): 문장의 index, 문장 내 단어의 index까지 넘겨야할지 고민
                onSelectWord(selectedWord, subtitle, 0);
              }
            }
          }}
        >
          {subtitle[language] || `(${language} 자막이 없어요!)`}
          {/* 선택된 언어가 없을 경우 대비 */}
        </p>
      ))}
    </div>
  );
}
