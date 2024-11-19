'use client';

import { useState, useRef, useEffect } from 'react';

import Link from 'next/link';

import { Circle, Share2, Trash2 } from 'lucide-react';

import {
  useDeleteBookmark,
  useFetchAllBookmarks,
  useUpdateBookmark,
} from '@/api/hooks/useBookmarks';
import { formatDate } from '@/lib/formatDate';
import { Bookmark } from '@/types/Bookmark';

import { Button } from '../ui/button';

export default function MemoItem({
  data: {
    contentId,
    contentTitle,
    contentType,
    bookmarkId,
    bookmarkDetail,
    description,
    updatedAt,
  },
}: {
  data: Bookmark;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState<string | null>(description);
  const memoRef = useRef<HTMLDivElement>(null);

  const deleteBookmarkMutation = useDeleteBookmark(contentId);
  const updateBookmarkMutation = useUpdateBookmark(contentId);
  const { refetch: refetchAllBookmarks } = useFetchAllBookmarks();

  // TODO(@smosco): 삭제 모달 추가
  const handleDeleteBookmark = () => {
    deleteBookmarkMutation.mutate(bookmarkId, {
      onSuccess: () => {
        refetchAllBookmarks();
      },
      onError: (error) => {
        console.error('북마크 삭제 실패', error);
      },
    });
  };

  const handleSaveMemo = () => {
    if (memo !== null && memo.trim() !== '') {
      updateBookmarkMutation.mutate(
        { bookmarkId, description: memo },
        {
          onSuccess: () => {
            refetchAllBookmarks();
            setIsEditing(false);
          },
          onError: (error) => {
            console.error('메모 수정 실패', error);
          },
        },
      );
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (memoRef.current && !memoRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [memoRef]);

  return (
    <div className="py-4 border-b border-gray-200">
      {/* 북마크된 문장이 포함된 콘텐츠 제목 */}
      {/* TODO(@smosco): 어쩌면 콘텐츠 타입도 받아와야할지도 */}
      <Link href={`/learn/${contentType?.toLowerCase()}/detail/${contentId}`}>
        <h2 className="text-sm font-medium hover:underline underline-offset-2">
          {contentTitle}
        </h2>
      </Link>
      <span className="text-xs text-muted-foreground">
        {updatedAt && `${formatDate(updatedAt, 'YYYY.MM.DD')} 저장`}
      </span>
      {/* 북마크된 문장 */}
      <div className="flex items-start space-x-2 mb-2">
        <Circle className="h-3 w-3 mt-1 text-muted-foreground" />
        <p className="text-sm text-muted-foreground flex-grow">
          {bookmarkDetail}
        </p>
      </div>

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        ref={memoRef}
        className={`flex ml-5 pl-4 border-l-2  ${isEditing ? 'border-purple-700' : 'border-gray-300'}`}
        onClick={() => setIsEditing(true)}
      >
        <textarea
          value={memo || ''}
          onChange={(e) => setMemo(e.target.value)}
          placeholder={memo || '메모를 입력해주세요.'}
          className="min-h-6 w-[350px] border-none outline-none p-0 mr-6"
        />
        {isEditing && (
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              취소
            </Button>
            {/* TODO(@smosco): 북마크 메모 수정 삭제 기능 api 연결 */}
            <Button onClick={handleSaveMemo}>저장</Button>
          </div>
        )}
      </div>
      {/* 북마크 문장 삭제 공유 버튼 */}
      <div className="flex justify-end space-x-2 mt-2">
        <Button variant="ghost" size="icon" aria-label="Share">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Delete"
          onClick={handleDeleteBookmark}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
