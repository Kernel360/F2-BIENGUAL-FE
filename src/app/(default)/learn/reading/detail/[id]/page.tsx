/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { ArrowUp, MessageCircleMoreIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import {
  useFetchBookmarksByContendId,
  useCreateBookmark,
  useUpdateBookmark,
  useDeleteBookmark,
} from '@/api/hooks/useBookmarks';
import { useContentDetail } from '@/api/hooks/useContentDetail';
import { useFetchQuiz } from '@/api/hooks/useQuiz';
import {
  useCreateScrap,
  useDeleteScrap,
  useCheckScrap,
} from '@/api/hooks/useScrap';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import FloatingButtons from '@/components/FloatingButtons';
import LoadingSpinner from '@/components/LoadingSpinner';
import LogInOutButton from '@/components/LogInOutButton';
import MemoInput from '@/components/MemoInput';
import Modal from '@/components/Modal';
import QuizCarousel from '@/components/quiz/QuizCarousel';
import QuizCover from '@/components/quiz/QuizCover';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import Tooltip from '@/components/Tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function DetailReadingPage() {
  const params = useParams();
  const contentId = Number(params.id);
  const { data, isLoading, isError, error } = useContentDetail(contentId);

  // 로그인 권한 훅
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data; // 로그인 상태 확인
  // 로그읜 모달
  const [showLoginModal, setShowLoginModal] = useState(false); // 권한 없을때 로그인 모달

  // 북마크 데이터 훅
  const { data: bookmarkData, refetch: refetchBookmarks } =
    useFetchBookmarksByContendId(contentId);
  const createBookmarkMutation = useCreateBookmark(contentId);
  const updateBookmarkMutation = useUpdateBookmark(contentId);
  const deleteBookmarkMutation = useDeleteBookmark(contentId);

  const { data: checkScrap } = useCheckScrap(contentId);
  const createScrapMutation = useCreateScrap(contentId);
  const deleteScrapMutation = useDeleteScrap(contentId);

  const { data: quizData } = useFetchQuiz(contentId);

  const [showTranslate, setShowTranslate] = useState(true);

  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<
    number | null
  >(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const [showMemo, setShowMemo] = useState<boolean>(false);
  const [memoText, setMemoText] = useState<string>('');
  const [memoPosition, setMemoPosition] = useState({ top: 0, left: 0 });

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); // 삭제 확인 모달 상태 추가

  const [isScrapped, setIsScrapped] = useState<boolean | undefined>(undefined);

  const [showQuiz, setShowQuiz] = useState(false); // 퀴즈 풀기 버튼 누를 때 보여줌

  useEffect(() => {
    if (checkScrap?.data) {
      setIsScrapped(checkScrap.data); // 서버에서 스크랩 여부를 받아와 상태 업데이트
    }
  }, [checkScrap]);

  const toggleTranslation = () => setShowTranslate((prev) => !prev);

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
    // - 로그인 권한 없으면 로그인 모달 띄우기
    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }
    // - 로그인 권한 있을때만 아래 실행

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
    // 로그인 권한 없으면 로그인 모달 띄우기
    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }
    // 로그인 권한 있을때만 아래 실행
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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {error?.message}</div>;

  const contentData = data?.data;

  if (!contentData) return <div>No Content Data Available</div>;

  return (
    <>
      <div className="flex">
        <div className="flex flex-col flex-1 gap-5 mx-auto pb-16 max-w-[800px] h-auto">
          <div>
            <Badge>{contentData.category}</Badge>
            <div className="font-bold text-2xl mt-2 mb-4">
              {contentData.title}
            </div>
            <div className="text-sm flex justify-end w-full">
              {contentData.hits} 조회수
            </div>
          </div>
          <Separator />
          <div className="flex justify-center">
            <img
              src={contentData.thumbnailUrl}
              alt="이미지"
              className="rounded-lg"
            />
          </div>
          <div>
            <ul className="flex flex-col gap-8 text-[#313131]">
              {contentData.scriptList.map((script, index) => {
                const bookmarkMemo = bookmarkData?.data.bookmarkList.find(
                  (item) => item.sentenceIndex === index,
                );
                return (
                  <li
                    key={index}
                    data-index={index}
                    className="rounded relative leading-loose"
                  >
                    <div
                      onClick={(e) => handleSentenceClick(e, index)}
                      role="button"
                      tabIndex={0}
                      className={`w-fit cursor-pointer px-2 transition-colors duration-300 ${
                        bookmarkMemo ? 'bg-yellow-200' : ''
                      } ${selectedSentenceIndex === index ? 'bg-gray-200' : ''} ${!bookmarkMemo && 'hover:bg-gray-200'}`}
                    >
                      <p className="font-semibold">{script.enScript}</p>
                      {bookmarkMemo?.description && (
                        <span
                          className="cursor-pointer ml-2 inline-flex"
                          onClick={(e) =>
                            handleMemoIconClick(
                              index,
                              bookmarkMemo.description ?? '',
                              e,
                            )
                          }
                        >
                          <MessageCircleMoreIcon size="16px" color="purple" />
                        </span>
                      )}
                    </div>
                    {showTranslate && (
                      <p className="px-2 ">{script.koScript}</p>
                    )}
                  </li>
                );
              })}
            </ul>
            {tooltipVisible && (
              <Tooltip
                position={tooltipPosition}
                onAddBookmark={handleAddBookmark}
                onAddMemo={handleMemoClick}
                onClose={() => setTooltipVisible(false)}
                isBookmarked={bookmarkData?.data.bookmarkList.some(
                  (item) => item.sentenceIndex === selectedSentenceIndex, // sentenceIndex로 비교
                )}
              />
            )}
            {showMemo && (
              <MemoInput
                position={memoPosition}
                memoText={memoText}
                setMemoText={setMemoText}
                onSaveMemo={handleSaveMemo}
                onClose={() => setShowMemo(false)}
              />
            )}
          </div>
          {/* 퀴즈 */}
          {isLogin ? (
            // 로그인 했을 때 퀴즈커버
            <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg ">
              {!showQuiz && (
                <QuizCover
                  startColor="from-blue-400"
                  endColor="to-purple-600"
                  text={`방금 학습한 내용, 확실히 기억하고 있나요?\n퀴즈로 점검해보세요!`}
                  textColor="text-white"
                  button={
                    <Button
                      onClick={() => setShowQuiz(true)}
                      className="bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                    >
                      퀴즈 풀기
                    </Button>
                  }
                />
              )}

              {showQuiz && (
                <div className="absolute inset-0 bg-white flex">
                  {/* 퀴즈 */}
                  {quizData && quizData.data['question-answer'].length > 0 ? (
                    <QuizCarousel
                      quizListData={quizData.data['question-answer']}
                    />
                  ) : (
                    <QuizCover
                      startColor="white"
                      endColor="to-purple-200"
                      text={`이런! 퀴즈 데이터가 없어요..\n관리자에게 문의해주세요`}
                      textColor="text-gray-700 shadow-lg"
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            // 로그인안했을때 퀴즈 커버
            <QuizCover
              startColor="from-gray-300"
              endColor="to-purple-500"
              text="퀴즈를 풀려면 로그인이 필요해요!"
              textColor="text-white"
              button={
                <LogInOutButton
                  bgColor="bg-white"
                  textColor="text-violet-700"
                />
              }
            />
          )}
        </div>
      </div>

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
            <Button variant="destructive" onClick={handleDeleteBookmark}>
              삭제
            </Button>
          </div>
        </Modal>
      )}

      <div className="fixed right-4 bottom-20 md:bottom-4">
        <Button
          variant="default"
          size="icon"
          className="rounded-full w-12 h-12"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <Modal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          title="로그인이 필요합니다."
          description="이 기능을 이용하려면 로그인이 필요해요! "
        >
          <div className="flex justify-center gap-4 mt-4">
            <LogInOutButton />
          </div>
        </Modal>
      )}

      {/* 번역, 스크랩 버튼 */}
      <FloatingButtons
        isScrapped={isScrapped}
        onScrapToggle={handleScrapToggle}
        showTranslate={showTranslate}
        onTranslateToggle={toggleTranslation}
      />
      <ScrollProgressBar />
    </>
  );
}
