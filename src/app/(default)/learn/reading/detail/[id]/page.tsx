/* eslint-disable react/no-array-index-key */

'use client';

import { useState, useEffect } from 'react';

import { useParams } from 'next/navigation';

import { ArrowUp } from 'lucide-react';

import { useContentDetail } from '@/api/hooks/useContentDetail';
import { useFetchQuiz } from '@/api/hooks/useQuiz';
import {
  useCreateScrap,
  useDeleteScrap,
  useCheckScrap,
} from '@/api/hooks/useScrap';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import FloatingButtons from '@/components/common/FloatingButtons';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import LogInOutButton from '@/components/common/LogInOutButton';
import Modal from '@/components/common/Modal';
import ScrollProgressBar from '@/components/common/ScrollProgressBar';
import QuizCarousel from '@/components/quiz/QuizCarousel';
import QuizCover from '@/components/quiz/QuizCover';
import ReadingScriptItem from '@/components/reading/ReadingScriptItem';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function DetailReadingPage() {
  const params = useParams();
  const contentId = Number(params.id);
  const { data, isLoading, isError, error } = useContentDetail(contentId);

  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data;

  const [showLoginModal, setShowLoginModal] = useState(false);

  const { data: checkScrap } = useCheckScrap(contentId);
  const createScrapMutation = useCreateScrap(contentId);
  const deleteScrapMutation = useDeleteScrap(contentId);

  const { data: quizData } = useFetchQuiz(contentId);

  const [showTranslate, setShowTranslate] = useState(true);

  const [isScrapped, setIsScrapped] = useState<boolean | undefined>(undefined);

  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    if (checkScrap?.data) {
      setIsScrapped(checkScrap.data);
    }
  }, [checkScrap]);

  const toggleTranslation = () => setShowTranslate((prev) => !prev);

  const handleScrapToggle = () => {
    // 로그인 안 한 경우
    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }

    if (isScrapped) {
      deleteScrapMutation.mutate(undefined, {
        onSuccess: () => {
          setIsScrapped(false);
        },
      });
    } else {
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
                return (
                  <ReadingScriptItem
                    index={index}
                    key={index}
                    script={script}
                    showTranslate={showTranslate}
                  />
                );
              })}
            </ul>
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
