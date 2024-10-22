import { useEffect, useState } from 'react';

import {
  useCreateBookmark,
  useDeleteBookmark,
  useFetchBookmarksByContendId,
  useUpdateBookmark,
} from '@/api/hooks/useBookmarks';
import {
  useCheckScrap,
  useCreateScrap,
  useDeleteScrap,
} from '@/api/hooks/useScrap';

export default function useBookmarkManager(contentId: number) {
  // 북마크 데이터 훅
  const { data: bookmarkData, refetch: refetchBookmarks } =
    useFetchBookmarksByContendId(contentId);
  const createBookmarkMutation = useCreateBookmark(contentId);
  const updateBookmarkMutation = useUpdateBookmark(contentId);
  const deleteBookmarkMutation = useDeleteBookmark(contentId);

  const { data: checkScrap } = useCheckScrap(contentId);
  const createScrapMutation = useCreateScrap(contentId);
  const deleteScrapMutation = useDeleteScrap(contentId);

  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<
    number | null
  >(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  // 아래 lint해제 라인 -> tooltipPosition사용하지 않음으로 인해 깃헙액션에 걸리는 경우 방지
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const [showMemo, setShowMemo] = useState<boolean>(false);
  const [memoText, setMemoText] = useState<string>('');
  const [memoPosition, setMemoPosition] = useState({ top: 0, left: 0 });

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); // 삭제 확인 모달 상태 추가

  const [isScrapped, setIsScrapped] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (checkScrap?.data) {
      setIsScrapped(checkScrap.data); // 서버에서 스크랩 여부를 받아와 상태 업데이트
    }
  }, [checkScrap]);

  useEffect(() => {
    if (!tooltipVisible && !showMemo && !showDeleteModal) {
      // 툴팁이 닫히고 메모도 클릭하지 않고 삭제도 클릭하지 않았을 때만 선택된 문장 초기화
      setSelectedSentenceIndex(null);
    }
  }, [tooltipVisible, showMemo, showDeleteModal]);

  // 문장 클릭 시 툴팁 표시 및 선택된 문장 설정
  const handleSentenceClick = (
    e: React.MouseEvent<HTMLDivElement>,
    sentenceIndex: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY - 40,
      left: rect.left + window.scrollX + rect.width / 2,
    });
    setSelectedSentenceIndex(sentenceIndex);
    setTooltipVisible(true);
    setShowMemo(false);
  };

  // 북마크 추가 및 삭제 모달 표시 처리 함수
  const handleAddBookmark = () => {
    if (selectedSentenceIndex !== null) {
      const existingBookmark = bookmarkData?.data.bookmarkList.some(
        (item) => item.sentenceIndex === selectedSentenceIndex,
      );

      if (existingBookmark) {
        // 이미 북마크가 있는 경우, 삭제 확인 모달 표시
        setShowDeleteModal(true);
      } else {
        createBookmarkMutation.mutate(
          {
            sentenceIndex: selectedSentenceIndex,
          },
          {
            onSuccess: () => {
              refetchBookmarks(); // 북마크 추가 후 데이터 갱신
            },
          },
        );
      }
      setTooltipVisible(false);
      setShowMemo(false); // 메모가 열려있을 때도 닫기(todo: 화인)
    }
  };

  // 삭제 확인 시 실행
  const handleDeleteBookmark = () => {
    if (selectedSentenceIndex !== null) {
      const bookmarkToDelete = bookmarkData?.data.bookmarkList.find(
        (item) => item.sentenceIndex === selectedSentenceIndex,
      );

      if (bookmarkToDelete) {
        deleteBookmarkMutation.mutate(bookmarkToDelete.bookmarkId, {
          onSuccess: () => {
            refetchBookmarks(); // 북마크 삭제 후 데이터 갱신
          },
        });
      }
      setTooltipVisible(false);
      setShowMemo(false);
      setShowDeleteModal(false); // 모달 닫기
    }
  };

  // 메모 버튼 클릭 시 메모 input 위치 조정 및 상태 업데이트
  const handleMemoClick = () => {
    if (selectedSentenceIndex === null) return;

    // 선택된 문장의 DOM 엘리먼트를 찾음
    const sentenceElement = document.querySelector(
      `li[data-index="${selectedSentenceIndex}"] div`,
    );

    // 선택된 문장의 위치에 따라 메모 input 위치 설정
    if (sentenceElement) {
      const rect = sentenceElement.getBoundingClientRect();
      setMemoPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    // React Query 캐시에서 기존 메모 데이터를 가져옴
    const existingMemo = bookmarkData?.data.bookmarkList.find(
      (item) => item.sentenceIndex === selectedSentenceIndex,
    );

    // 기존 메모가 있으면 메모 내용을 설정하고, 없으면 빈 문자열을 설정
    setMemoText(existingMemo ? (existingMemo.description ?? '') : '');

    // 메모 입력창 표시
    setShowMemo(true);

    // 툴팁 숨기기
    setTooltipVisible(false);
  };

  // 메모 아이콘 클릭 시 메모 보여주기
  const handleMemoIconClick = (
    sentenceIndex: number,
    description: string,
    e: React.MouseEvent<HTMLSpanElement>,
  ) => {
    e.stopPropagation(); // 이벤트 전파 방지
    const sentenceElement = document.querySelector(
      // TODO(@smosco): DOM 직업 접근하지 않고 useRef 사용하는 방식으로 변경
      `li[data-index="${sentenceIndex}"] div`,
    );
    if (sentenceElement) {
      const rect = sentenceElement.getBoundingClientRect();
      setMemoPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    setMemoText(description);
    setSelectedSentenceIndex(sentenceIndex);
    setShowMemo(true);
    setTooltipVisible(false);
  };

  // 메모 저장 함수
  // 메모 저장 함수 - 메모가 존재하면 수정, 존재하지 않으면 생성
  const handleSaveMemo = () => {
    if (selectedSentenceIndex === null) return;

    const existingMemo = bookmarkData?.data.bookmarkList.find(
      (item) => item.sentenceIndex === selectedSentenceIndex,
    );
    const memoTextTrimmed = memoText.trim();

    if (memoTextTrimmed === '') {
      // 메모 삭제
      if (existingMemo) {
        deleteBookmarkMutation.mutate(existingMemo.bookmarkId, {
          onSuccess: () => {
            refetchBookmarks(); // 북마크 삭제 후 목록 갱신
          },
        });
      }
      return;
    }

    if (existingMemo) {
      // 메모 수정 (기존 메모가 있는 경우)
      updateBookmarkMutation.mutate(
        { bookmarkId: existingMemo.bookmarkId, description: memoTextTrimmed },
        {
          onSuccess: () => {
            refetchBookmarks(); // 메모 수정 후 목록 갱신
          },
        },
      );
    } else {
      // 메모 생성 (기존 메모가 없는 경우)
      createBookmarkMutation.mutate(
        {
          sentenceIndex: selectedSentenceIndex,
          description: memoTextTrimmed,
        },
        {
          onSuccess: () => {
            refetchBookmarks(); // 메모 생성 후 목록 갱신
          },
        },
      );
    }

    setMemoText(''); // 메모 저장 후 초기화
    setShowMemo(false); // 메모 입력창 닫기
  };

  const handleScrapToggle = () => {
    if (isScrapped) {
      // 스크랩 삭제
      deleteScrapMutation.mutate(undefined, {
        onSuccess: () => {
          setIsScrapped(false);
        },
      });
    } else {
      // 스크랩 생성
      createScrapMutation.mutate(undefined, {
        onSuccess: () => {
          setIsScrapped(true);
        },
      });
    }
  };

  return {
    bookmarkProps: {
      handleMemoIconClick,
      handleSentenceClick,
      handleAddBookmark,
      handleDeleteBookmark,
      handleMemoClick,
      handleSaveMemo,
      handleScrapToggle,
      isScrapped,
      memoPosition,
      memoText,
      selectedSentenceIndex,
      showDeleteModal,
      setShowDeleteModal,
    },
  };
}
