/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import { useParams } from 'next/navigation';

import { MessageCircleMoreIcon } from 'lucide-react';

import MemoInput from '@/components/common/MemoInput';
import Tooltip from '@/components/common/Tooltip';
import useHandleBookmark from '@/hooks/useHandleBookmark';
import { cn } from '@/lib/utils';
import { Script } from '@/types/ContentDetail';

import Modal from '../common/Modal';
import { Button } from '../ui/button';

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

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [memoText, setMemoText] = useState(script.description || '');
  const [showMemo, setShowMemo] = useState<boolean>(false);

  const {
    isAddBookmarkPending,
    addBookmark,
    isRemoveBookmarkMemoPending,
    removeBookmarkMemo,
    addMemo,
    updateMemo,
  } = useHandleBookmark(contentId);

  const handleAddBookmark = () => {
    if (!script.bookmarkId) {
      addBookmark(index);
      // TODO(@smosco): 북마크의 팬딩 상태로는 충분하지 않음 확인
      // eslint-disable-next-line no-param-reassign
      // script.isHighlighted = true;
    }
  };

  const handleRemoveBookmark = () => {
    if (script.bookmarkId) {
      setShowDeleteModal(true);
    }
  };

  const confirmRemoveBookmark = () => {
    setShowDeleteModal(false);
    if (script.bookmarkId) {
      removeBookmarkMemo(script.bookmarkId, {
        onSuccess: () => {
          setIsSelected(false);
        },
        onError: (error: unknown) => {
          console.error('북마크 삭제 중 오류 발생:', error);
        },
      });
    }
  };

  //  메모 추가 함수
  const handleAddMemoStart = () => {
    setShowMemo(true);

    if (script.bookmarkId) {
      setMemoText(script.description || '');
    }

    // TODO(@smosco): setIsSelected가 해제되면 툴팁이 사라지지만 문장 연한 회색도 사라짐
    setIsSelected(false);
  };

  const handleSaveMemo = () => {
    const memoTextTrimmed = memoText.trim();

    if (memoTextTrimmed === '') {
      if (script.bookmarkId) {
        removeBookmarkMemo(script.bookmarkId);
      }
    } else if (script.bookmarkId) {
      updateMemo(script.bookmarkId, memoTextTrimmed);
    } else {
      addMemo(index, memoTextTrimmed);
    }

    setMemoText('');
    setShowMemo(false);
  };

  const handleReadMemo = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    if (script.description) {
      setMemoText(script.description);
      setShowMemo(true);
    }
  };

  return (
    <li className="rounded relative leading-loose">
      <div
        onClick={() => setIsSelected(true)}
        role="button"
        tabIndex={0}
        className={cn(
          `w-fit cursor-pointer px-2 transition-colors duration-300`,
          // 팬딩 상태 또는 북마크가 활성화된 경우 노란색 적용
          (isAddBookmarkPending || script.bookmarkId) &&
            !isRemoveBookmarkMemoPending &&
            'bg-yellow-200',
          !script.isHighlighted && 'hover:bg-gray-200',
        )}
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
        {script.description && (
          <span
            className="cursor-pointer ml-2 inline-flex"
            onClick={handleReadMemo}
          >
            <MessageCircleMoreIcon size="16px" color="purple" />
          </span>
        )}
      </div>
      {showTranslate && <p className="px-2 ">{script.koScript}</p>}

      {isSelected && (
        <Tooltip
          onAddBookmark={handleAddBookmark}
          onRemoveBookmark={handleRemoveBookmark}
          onAddMemoStart={handleAddMemoStart}
          onClose={() => setIsSelected(false)}
          isBookmarked={script.isHighlighted}
        />
      )}

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
