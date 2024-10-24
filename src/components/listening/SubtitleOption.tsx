/* eslint-disable no-nested-ternary */

'use client';

import React, { Dispatch, SetStateAction } from 'react';

import { LayoutList, LayoutGrid, Globe } from 'lucide-react'; // Icons you're using

import { Button } from '@/components/ui/button'; // Assuming you're using a custom Button component

import { LanguageCode } from '../../types/Scripts';

type Mode = 'line' | 'block';

interface SubtitleOptionProps {
  mode: Mode;
  selectedLanguages: LanguageCode[];
  setSelectedLanguages: Dispatch<SetStateAction<LanguageCode[]>>;
  setMode: Dispatch<SetStateAction<Mode>>;
}

export default function SubtitleOption({
  mode,

  selectedLanguages,
  setSelectedLanguages,
  setMode,
}: SubtitleOptionProps) {
  const handleLanguageChange = () => {
    if (selectedLanguages.length === 0) {
      // 현재 선택된 언어가 없으면 한글 선택
      setSelectedLanguages(['koScript']);
    } else if (
      selectedLanguages.includes('koScript') &&
      !selectedLanguages.includes('enScript')
    ) {
      // 현재 한글만 선택되어 있으면 영어로 변경
      setSelectedLanguages(['enScript']);
    } else if (
      selectedLanguages.includes('enScript') &&
      !selectedLanguages.includes('koScript')
    ) {
      // 현재 영어만 선택되어 있으면 한글 + 영어로 변경
      setSelectedLanguages(['koScript', 'enScript']);
    } else {
      // 한글 + 영어 선택된 경우 선택을 모두 해제 (없음)
      setSelectedLanguages([]);
    }
  };

  const toggleViewMode = () => {
    setMode((prevMode) => (prevMode === 'line' ? 'block' : 'line'));
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <Button variant="outline" size="sm" onClick={toggleViewMode}>
        {mode === 'line' ? (
          <>
            <LayoutList size={18} className="mr-2" /> 한 줄 보기
          </>
        ) : (
          <>
            <LayoutGrid size={18} className="mr-2" /> 전체 보기
          </>
        )}
      </Button>

      {/* 다중 언어 선택 표시 */}
      <Button variant="outline" size="sm" onClick={handleLanguageChange}>
        <Globe size={18} className="mr-2" />
        {selectedLanguages.length === 0
          ? '자막 없이 보기'
          : selectedLanguages
              .map((lang) =>
                lang === 'koScript'
                  ? '한글'
                  : lang === 'enScript'
                    ? '영어'
                    : '',
              )
              .join(' + ')}
      </Button>
    </div>
  );
}
