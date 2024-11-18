/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useRef, useCallback } from 'react';

import { useParams } from 'next/navigation';

import { Trash2 } from 'lucide-react';

import ListeningMemoForm from '@/components/listening/ListeningMemoForm';
import { Button } from '@/components/ui/button';
import useHandleBookmark from '@/hooks/useHandleBookmark';
import { convertTime } from '@/lib/formatTime';
import { Script } from '@/types/ContentDetail';

interface BookmarkMemoItemProps {
  bookmark: Script;
  seekTo: (timeInSeconds: number) => void;
}

export default function BookmarkMemoItem({
  bookmark,
  seekTo,
}: BookmarkMemoItemProps) {
  const params = useParams();
  const contentId = Number(params.id);

  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState<string | null>(bookmark.description);
  const memoRef = useRef<HTMLDivElement>(null);

  const { removeBookmarkMemo, updateMemo } = useHandleBookmark(contentId);

  const handleSaveMemo = () => {
    if (memo !== null && memo.trim() !== '') {
      updateMemo(bookmark.bookmarkId, memo);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = useCallback(() => {
    setMemo(bookmark.description);
    setIsEditing(false);
  }, [bookmark.description]);

  const handleDeleteBookmark = () => {
    removeBookmarkMemo(bookmark.bookmarkId);
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
              seekTo((bookmark?.startTimeInSecond as number) + 0.1)
            }
          >
            {convertTime(bookmark?.startTimeInSecond as number)}
          </Button>
          <p className="mt-2 text-[14px] text-gray-600">{bookmark?.enScript}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleDeleteBookmark}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div ref={memoRef} onClick={() => setIsEditing(true)}>
        {/* 메모 폼 컴포넌트 */}
        <ListeningMemoForm
          isEditing={isEditing}
          memo={memo}
          setMemo={setMemo}
          handleCancelEdit={handleCancelEdit}
          handleSaveMemo={handleSaveMemo}
        />
      </div>
    </div>
  );
}
