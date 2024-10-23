/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useRef, useEffect } from 'react';

type MemoInputProps = {
  memoText: string;
  setMemoText: React.Dispatch<React.SetStateAction<string>>;
  onSaveMemo: () => void;
  onClose: () => void;
};

export default function MemoInput({
  memoText,
  setMemoText,
  onSaveMemo,
  onClose,
}: MemoInputProps) {
  const memoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (memoRef.current && !memoRef.current.contains(event.target as Node)) {
        setMemoText(''); // 외부 클릭 시 memoText 초기화
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // mousedown 이벤트 사용
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, setMemoText]);

  return (
    <div
      ref={memoRef}
      className="absolute w-72 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50 mt-2 top-full left-0 "
      onClick={(e) => e.stopPropagation()} // 메모 창 클릭 시 이벤트 전파 방지
    >
      <textarea
        className="w-full p-2 border-none outline-none resize-none h-16"
        value={memoText}
        onChange={(e) => setMemoText(e.target.value)}
        placeholder="메모를 입력해 주세요."
      />
      <div className="flex justify-end gap-3 mt-2">
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => {
            setMemoText(''); // 취소 버튼 클릭 시 memoText 초기화
            onClose();
          }}
        >
          취소
        </button>
        <button
          type="button"
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={() => {
            onSaveMemo();
            setMemoText(''); // 저장 후 memoText 초기화
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
}
