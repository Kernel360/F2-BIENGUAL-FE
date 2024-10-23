/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useRef } from 'react';

import { HighlighterIcon, MessageCircleMoreIcon, Trash2 } from 'lucide-react';

import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import LogInOutButton from '@/components/LogInOutButton';

type TooltipProps = {
  onAddBookmark: () => void;
  onRemoveBookmark: () => void;
  onAddMemoStart: () => void;
  onClose: () => void;
  isBookmarked: boolean | undefined;
};

export default function Tooltip({
  onAddBookmark,
  onRemoveBookmark,
  onAddMemoStart,
  onClose,
  isBookmarked,
}: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data;

  // 외부 클릭 감지 및 툴팁 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        onClose(); // 외부 클릭 시 툴팁 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // mousedown 이벤트 사용
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // 이벤트 리스너 정리
    };
  }, [onClose]);

  return (
    <div
      ref={tooltipRef}
      className="absolute bg-white border border-gray-200 shadow-lg rounded-lg p-2 flex items-center gap-3 text-sm z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2"
      onClick={(e) => e.stopPropagation()} // 툴팁 클릭 시 이벤트 전파 방지
    >
      {/* 화살표 */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
      {/* 버튼 아이템 */}
      {!isLogin ? (
        <span className="flex items-center px-1">
          <LogInOutButton />
          <span className="ml-2 ">
            을 하면 형광펜과 메모를 사용할 수 있어요.
          </span>
        </span>
      ) : (
        <>
          {!isBookmarked ? (
            <button
              type="button"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
              onClick={onAddBookmark}
            >
              <HighlighterIcon size="16px" />
              <span>형광펜</span>
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
              onClick={onRemoveBookmark}
            >
              <Trash2 size="16px" />
              <span>삭제</span>
            </button>
          )}
          <button
            type="button"
            className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
            onClick={onAddMemoStart}
          >
            <MessageCircleMoreIcon size="16px" />
            <span>메모</span>
          </button>
        </>
      )}
    </div>
  );
}
