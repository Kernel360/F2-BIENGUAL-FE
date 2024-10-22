/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Trash2, Check, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';

import {
  useUpdateBookmark,
  useFetchAllBookmarks,
  useDeleteBookmark,
} from '@/api/hooks/useBookmarks';
import { convertTime } from '@/lib/convertTime';
import { BookmarkByContentId } from '@/types/Bookmark';
import { Subtitle } from '@/types/Scripts';

import { Button } from './ui/button';

interface BookmarkMemoItemProps {
  bookmark: BookmarkByContentId;
  subtitle: Subtitle | undefined;
  seekTo: (timeInSeconds: number) => void;
}

export default function BookmarkMemoItem({
  bookmark,
  subtitle,
  seekTo,
}: BookmarkMemoItemProps) {
  const params = useParams();
  const contentId = Number(params.id);

  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState<string | null>(bookmark.description);
  const memoRef = useRef<HTMLDivElement>(null);

  const updateBookmarkMutation = useUpdateBookmark(contentId);
  const deleteBookmarkMutation = useDeleteBookmark(contentId);
  const { refetch: refetchAllBookmarks } = useFetchAllBookmarks();

  const handleSaveMemo = () => {
    console.log('handleSaveMemo 호출됨');
    if (memo !== null && memo.trim() !== '') {
      console.log('메모 저장 시도:', memo);
      updateBookmarkMutation.mutate(
        { bookmarkId: bookmark.bookmarkId, description: memo },
        {
          onSuccess: () => {
            console.log('북마크 업데이트 성공');
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

  const handleCancelEdit = useCallback(() => {
    setMemo(bookmark.description);
    setIsEditing(false);
  }, [bookmark.description]);

  const handleDeleteBookmark = () => {
    deleteBookmarkMutation.mutate(bookmark.bookmarkId, {
      onSuccess: () => {
        refetchAllBookmarks();
      },
      onError: (error) => {
        console.error('북마크 삭제 실패', error);
      },
    });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (memoRef.current && !memoRef.current.contains(event.target as Node)) {
        handleCancelEdit();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleCancelEdit]);

  return (
    <div
      key={bookmark.bookmarkId}
      className="mb-4 p-3 rounded-lg bg-white shadow-sm"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="text-xs text-muted-foreground">
          <Button
            variant="secondary"
            className="rounded-full h-6 px-3 bg-violet-100 text-violet-700 hover:bg-violet-200"
            onClick={() =>
              seekTo((subtitle?.startTimeInSecond as number) + 0.1)
            }
          >
            {convertTime(subtitle?.startTimeInSecond as number)}
          </Button>
          <p className="mt-2 text-[14px] text-gray-600">{subtitle?.enScript}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleDeleteBookmark}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={memoRef}
        className={`flex flex-col pl-4 border-l-2 ${isEditing ? 'border-purple-700' : 'border-gray-300'}`}
        onClick={() => setIsEditing(true)}
      >
        <textarea
          value={memo || ''}
          onChange={(e) => setMemo(e.target.value)}
          placeholder={memo || '메모를 입력해주세요.'}
          className="min-h-5 w-[170px] border-none outline-none p-0 mr-6 bg-transparent text-[14px] font-[500]"
        />
        {isEditing && (
          <div className="flex justify-end space-x-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                handleCancelEdit();
                e.stopPropagation();
              }}
            >
              <X className="h-4 w-4 mr-2" /> 취소
            </Button>
            <Button
              onClick={() => {
                console.log('click');
                handleSaveMemo();
              }}
              size="sm"
            >
              <Check className="h-4 w-4 mr-2" /> 저장
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
