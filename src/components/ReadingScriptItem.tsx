/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import { useParams } from 'next/navigation';

import { MessageCircleMoreIcon } from 'lucide-react';

import { useFetchBookmarksByContendId } from '@/api/hooks/useBookmarks';
import MemoInput from '@/components/MemoInput';
import useHandleBookmark from '@/hooks/useHandleBookmark';
import { Script } from '@/types/ContentDetail';

import Modal from './Modal';
import Tooltip from './Tooltip';
import { Button } from './ui/button';

interface ReadingScriptItemProps {
  index: number;
  script: Script;
  showTranslate: boolean;
}

export default function ReadingScriptItem({
  index,
  script,
  showTranslate,
}: ReadingScriptItemProps) {
  const params = useParams();
  const contentId = Number(params.id);

  const { data: bookmarkData, refetch: refetchBookmarks } =
    useFetchBookmarksByContendId(contentId);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [memoText, setMemoText] = useState('');
  const [showMemo, setShowMemo] = useState<boolean>(false);

  const bookmarkMemo = bookmarkData?.data.bookmarkList.find(
    (item) => item.sentenceIndex === index,
  );

  const { addBookmark, removeBookmarkMemo, addMemo, updateMemo } =
    useHandleBookmark(contentId);

  const handleAddBookmark = () => {
    if (!bookmarkMemo) {
      addBookmark(index);
    }
  };

  const handleRemoveBookmark = () => {
    if (bookmarkMemo) {
      setShowDeleteModal(true);
    }
  };

  const confirmRemoveBookmark = () => {
    if (bookmarkMemo) {
      removeBookmarkMemo(bookmarkMemo.bookmarkId, {
        onSuccess: () => {
          refetchBookmarks();
          setShowDeleteModal(false);
          setIsSelected(false);
        },
        onError: (error: unknown) => {
          console.error('북마크 삭제 중 오류 발생:', error);
          setShowDeleteModal(false);
        },
      });
    }
  };

  //  메모 추가 함수
  const handleAddMemoStart = () => {
    setShowMemo(true);

    if (bookmarkMemo) {
      setMemoText(bookmarkMemo.description || '');
    }

    // TODO(@smosco): setIsSelected가 해제되면 툴팁이 사라지지만 문장 연한 회색도 사라짐
    setIsSelected(false);
  };

  const handleSaveMemo = () => {
    const memoTextTrimmed = memoText.trim();

    if (memoTextTrimmed === '') {
      if (bookmarkMemo) {
        removeBookmarkMemo(bookmarkMemo.bookmarkId);
      }
    } else if (bookmarkMemo) {
      updateMemo(bookmarkMemo.bookmarkId, memoTextTrimmed);
    } else {
      addMemo(index, memoTextTrimmed);
    }

    setMemoText('');
    setShowMemo(false);
  };

  const handleReadMemo = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    if (bookmarkMemo) {
      setMemoText(bookmarkMemo?.description as string);
      setShowMemo(true);
    }
  };

  return (
    <li className="rounded relative leading-loose">
      <div
        onClick={() => setIsSelected(true)}
        role="button"
        tabIndex={0}
        className={`w-fit cursor-pointer px-2 transition-colors duration-300 ${
          bookmarkMemo ? 'bg-yellow-200' : ''
        } ${isSelected ? 'bg-gray-200' : ''} ${!bookmarkMemo && 'hover:bg-gray-200'}`}
      >
        <p className="font-semibold relative">
          {script.enScript}
          {showMemo && (
            <MemoInput
              memoText={memoText}
              setMemoText={setMemoText}
              onSaveMemo={handleSaveMemo}
              onClose={() => setShowMemo(false)}
            />
          )}
        </p>
        {bookmarkMemo?.description && (
          <span
            className="cursor-pointer ml-2 inline-flex"
            onClick={handleReadMemo}
          >
            <MessageCircleMoreIcon size="16px" color="purple" />
          </span>
        )}
      </div>
      {showTranslate && <p className="px-2 ">{script.koScript}</p>}

      {isSelected ? (
        <Tooltip
          onAddBookmark={handleAddBookmark}
          onRemoveBookmark={handleRemoveBookmark}
          onAddMemoStart={handleAddMemoStart}
          onClose={() => setIsSelected(false)}
          isBookmarked={!!bookmarkMemo}
        />
      ) : null}

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="삭제 확인"
          description="형광펜이랑 메모 다 사라져요. 그래도 삭제할까요?"
        >
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              취소
            </Button>
            <Button variant="destructive" onClick={confirmRemoveBookmark}>
              삭제
            </Button>
          </div>
        </Modal>
      )}
    </li>
  );
}
