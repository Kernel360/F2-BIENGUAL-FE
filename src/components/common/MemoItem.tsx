'use client';

import { useState, useRef, useEffect } from 'react';

import Link from 'next/link';

import { Circle, Trash2 } from 'lucide-react';

import {
  useDeleteBookmark,
  useFetchAllBookmarks,
  useUpdateBookmark,
} from '@/api/hooks/useBookmarks';
import { useToast } from '@/hooks/use-toast';
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
  const memoContainerRef = useRef<HTMLDivElement>(null);

  const deleteBookmarkMutation = useDeleteBookmark(contentId);
  const updateBookmarkMutation = useUpdateBookmark(contentId);
  const { refetch: refetchAllBookmarks } = useFetchAllBookmarks();

  const { toast } = useToast();

  const handleDeleteBookmark = () => {
    deleteBookmarkMutation.mutate(bookmarkId, {
      onSuccess: () => {
        refetchAllBookmarks();
      },
      onError: () => {
        toast({
          title: '형광펜을 삭제하지 못했어요',
          duration: 500,
        });
      },
    });
  };

  const handleSaveMemo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const trimmedMemo = memo?.trim() ?? '';
    if (trimmedMemo !== '') {
      updateBookmarkMutation.mutate(
        { bookmarkId, description: trimmedMemo },
        {
          onSuccess: () => {
            setIsEditing(false);
            refetchAllBookmarks();
          },
          onError: () => {
            toast({
              title: '메모를 수정하지 못했어요',
              duration: 500,
            });
          },
        },
      );
    } else {
      setMemo(description); // 빈 문자열이 저장되지 않도록 원래 메모로 복원
      setIsEditing(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMemo(description); // 원래 메모로 복원
    setIsEditing(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        memoContainerRef.current &&
        !memoContainerRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
        setMemo(description); // 외부 클릭 시 원래 메모로 복원
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [memoContainerRef, description]);

  return (
    <div className="py-4 border-b border-gray-200">
      <Link href={`/learn/${contentType?.toLowerCase()}/detail/${contentId}`}>
        <h2 className="text-sm font-medium hover:underline underline-offset-2">
          {contentTitle}
        </h2>
      </Link>
      <span className="text-xs text-muted-foreground">
        {updatedAt && `${formatDate(updatedAt, 'YYYY.MM.DD')} 저장`}
      </span>
      <div className="flex items-start space-x-2 mb-2">
        <Circle className="h-3 w-3 mt-1 text-muted-foreground" />
        <p className="text-sm text-muted-foreground flex-grow">
          {bookmarkDetail}
        </p>
      </div>

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        ref={memoContainerRef}
        onClick={() => setIsEditing(true)}
        role="button"
        tabIndex={0}
        className={`flex ml-4 pl-4 border-l-2 ${
          isEditing ? 'border-purple-700' : 'border-gray-300'
        }`}
      >
        <textarea
          value={memo || ''}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력해주세요."
          className="min-h-6 w-[350px] max-h-12 border-none outline-none mr-2"
        />
        {isEditing && (
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button onClick={handleSaveMemo}>저장</Button>
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-2 mt-2">
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
