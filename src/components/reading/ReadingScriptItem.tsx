/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import { useParams } from 'next/navigation';

import { MessageCircleMoreIcon } from 'lucide-react';

import { useUpdateMissionStatus } from '@/api/hooks/useMission';
import MemoInput from '@/components/common/MemoInput';
import Tooltip from '@/components/common/Tooltip';
import useHandleBookmark from '@/hooks/useHandleBookmark';
import { cn } from '@/lib/utils';
import { Script } from '@/types/ContentDetail';
import { MissionStatus } from '@/types/Mission';

import Modal from '../common/Modal';
import { Button } from '../ui/button';

interface ReadingScriptItemProps {
  index: number;
  script: Script;
  showTranslate: boolean;
  missionStatus: MissionStatus | undefined;
}

export default function ReadingScriptItem({
  index,
  script,
  showTranslate,
  missionStatus,
}: ReadingScriptItemProps) {
  const params = useParams();
  const contentId = Number(params.id);

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [memoText, setMemoText] = useState(script.description || '');
  const [showMemo, setShowMemo] = useState<boolean>(false);

  const { addBookmark, removeBookmarkMemo, addMemo, updateMemo } =
    useHandleBookmark(contentId);

  const { mutate: updateMissionStatus } = useUpdateMissionStatus();

  const handleAddBookmark = async () => {
    if (!script.bookmarkId) {
      const result = await addBookmark(index);

      if (result && !missionStatus?.bookmark) {
        // 북마크가 성공적으로 생성된 후에만 수행
        updateMissionStatus({ bookmark: true });
      }
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

  const handleSaveMemo = async () => {
    const memoTextTrimmed = memoText.trim();

    if (memoTextTrimmed === '') {
      if (script.bookmarkId) {
        removeBookmarkMemo(script.bookmarkId);
      }
    } else if (script.bookmarkId) {
      // 이미 북마크 되어 있는 경우 업데이트
      updateMemo(script.bookmarkId, memoTextTrimmed);
    } else {
      // 북마크가 아예 안되어 있는 경우만 생성
      const result = await addMemo(index, memoTextTrimmed);

      if (result && !missionStatus?.bookmark) {
        // 메모 추가가 성공한 후에만 미션 상태 업데이트
        updateMissionStatus({ bookmark: true });
      }
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
          script.isHighlighted && 'bg-yellow-200',
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
