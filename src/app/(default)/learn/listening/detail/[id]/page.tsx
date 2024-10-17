'use client';

import React, { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Modal from '@/components/Modal';
import VideoPlayer from '@/components/VideoPlayer';
import { useContentDetail } from '@/api/hooks/useContentDetail';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import QuizCover from '@/components/quiz/QuizCover';
import QuizCarousel from '@/components/quiz/QuizCarousel';
import { useFetchQuiz } from '@/api/hooks/useQuiz';
import LogInOutButton from '@/components/LogInOutButton';
import FloatingButtons from '@/components/FloatingButtons';
import {
  useCheckScrap,
  useCreateScrap,
  useDeleteScrap,
} from '@/api/hooks/useScrap';
import { useParams } from 'next/navigation';

export default function DetailListeningPage() {
  const param = useParams();
  const contentId = Number(param.id);

  const {
    data: ListeningDetailData,
    isLoading,
    isError,
    error,
  } = useContentDetail(contentId);

  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data; // 로그인 상태 확인
  const [showLoginModal, setShowLoginModal] = useState(false); // 권한 없을때 로그인 모달

  const { data: checkScrap } = useCheckScrap(contentId);
  const createScrapMutation = useCreateScrap(contentId);
  const deleteScrapMutation = useDeleteScrap(contentId);

  const [showQuiz, setShowQuiz] = useState(false); // 퀴즈 풀기 버튼 누를 때 보여줌
  const { data: quizData } = useFetchQuiz(contentId);

  const [isScrapped, setIsScrapped] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (checkScrap?.data) {
      setIsScrapped(checkScrap.data); // 서버에서 스크랩 여부를 받아와 상태 업데이트
    }
  }, [checkScrap]);

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  if (!ListeningDetailData || !ListeningDetailData.data) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-gray-500">리스닝 콘텐츠가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[830px] flex flex-col ">
      <div>
        <h1 className="text-2xl font-bold">
          {ListeningDetailData?.data.title}
        </h1>
        <Badge>{ListeningDetailData?.data.category}</Badge>
        <div className="text-sm flex justify-end w-full">
          {ListeningDetailData?.data.hits} 회
        </div>
      </div>
      <Separator />

      {/* TODO(@smosco): response 타입 나누기 싫어서 타입 단언 */}
      <VideoPlayer
        videoUrl={ListeningDetailData?.data.videoUrl as string}
        scriptsData={ListeningDetailData?.data.scriptList}
      />

      {/* 퀴즈 */}
      {isLogin ? (
        // 로그인 했을 때 퀴즈커버
        <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg ">
          {!showQuiz && (
            <QuizCover
              startColor="from-blue-400"
              endColor="to-purple-600"
              text={`방금 학습한 내용, 확실히 기억하고 있나요? \n 퀴즈로 점검해보세요!`}
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
            <div className="absolute inset-0 bg-white flex shadow-lg">
              {/* 퀴즈 */}
              {quizData && quizData.data['question-answer'].length > 0 ? (
                <QuizCarousel quizListData={quizData.data['question-answer']} />
              ) : (
                <QuizCover
                  startColor="white"
                  endColor="to-purple-200"
                  text={`이런! 퀴즈 데이터가 없어요...\n 관리자에게 문의해주세요`}
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
            <LogInOutButton bgColor="bg-white" textColor="text-violet-700" />
          }
        />
      )}

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
      />
    </div>
  );
}
