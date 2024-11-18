'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';

import ReactPlayer from 'react-player';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactScriptPlayer } from 'react-player-plugin-prompter';

import { useContentDetail } from '@/api/hooks/useContentDetail';
import {
  useUpdateMissionStatus,
  useFetchMissionStatus,
} from '@/api/hooks/useMission';
import { useFetchQuiz } from '@/api/hooks/useQuiz';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import FloatingButtons from '@/components/common/FloatingButtons';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import LogInOutButton from '@/components/common/LogInOutButton';
import Modal from '@/components/common/Modal';
import BookmarkMemoPanel from '@/components/listening/BookmarkMemoPanel';
import SubtitleOption from '@/components/listening/SubtitleOption';
import VideoPlayer from '@/components/listening/VideoPlayer';
import QuizCarousel from '@/components/quiz/QuizCarousel';
import QuizCover from '@/components/quiz/QuizCover';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useScrapToggle } from '@/hooks/useScrapToggle';
import { useUpdateLearningProgressOnUnmount } from '@/hooks/useUpdateLearningProgressOnUnmount';
import { formatViewCount } from '@/lib/formatViewCount';
import { useQuizStore } from '@/stores/quizStore';
import { CustomScriptLanguageCode } from '@/types/Scripts';

type Mode = 'line' | 'block';

export default function ListeningDetailClient({
  contentId,
}: {
  contentId: number;
}) {
  const {
    data: listeningDetailData,
    isLoading,
    isError,
    error,
  } = useContentDetail(contentId);

  const { toggleScrap } = useScrapToggle({
    contentId,
    target: 'contentDetail',
  });

  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data; // 로그인 상태 확인
  const [showLoginModal, setShowLoginModal] = useState(false); // 권한 없을때 로그인 모달

  const [showQuiz, setShowQuiz] = useState(false); // 퀴즈 풀기 버튼 누를 때 보여줌
  const { data: quizData } = useFetchQuiz(contentId);

  const playerRef = useRef<ReactPlayer | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const { data: missionStatus } = useFetchMissionStatus();
  const { mutate: updateMissionStatus } = useUpdateMissionStatus();
  const contentMissionHasUpdated = useRef(false);

  const [mode, setMode] = useState<Mode>('line');
  const availableLanguages: CustomScriptLanguageCode[] = [
    'enScript',
    'koScript',
  ];
  const [selectedLanguages, setSelectedLanguages] =
    useState<CustomScriptLanguageCode[]>(availableLanguages);

  const [isPlaying, setIsPlaying] = useState(true);

  const seekTo = (timeInSeconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(timeInSeconds, 'seconds');
    }
  };

  const { setContentQuestions } = useQuizStore();

  useEffect(() => {
    if (quizData) {
      setContentQuestions(contentId, quizData.data.questionAnswer);
    }
  }, [contentId, quizData, setContentQuestions]);

  useEffect(() => {
    if (
      playerRef.current &&
      playerRef.current.getDuration() &&
      listeningDetailData?.data.learningRate
    ) {
      seekTo(
        Number(playerRef.current?.getDuration()) *
          (listeningDetailData.data.learningRate / 100),
      );
    }
  }, [playerRef.current]);

  // 90% 이상 재생되면 콘텐츠 학습 미션 업데이트 요청 보냄(콜백 함수)
  const handleProgress = (playedSeconds: number) => {
    const duration = playerRef.current?.getDuration();

    if (
      duration &&
      (playedSeconds / duration) * 100 >= 90 &&
      !missionStatus?.data.oneContent &&
      !contentMissionHasUpdated.current
    ) {
      // TODO(@smosco): updateMissionStatus가 성공했을 때만 contentMissionHasupdated true로 변경
      contentMissionHasUpdated.current = true;
      updateMissionStatus({ oneContent: true });
    }
  };

  useUpdateLearningProgressOnUnmount(
    contentId,
    playerRef.current
      ? (playerRef.current.getCurrentTime() / playerRef.current.getDuration()) *
          100
      : 0,
  );

  const bookmarkList = useMemo(() => {
    if (!listeningDetailData) {
      return [];
    }

    return listeningDetailData.data.scriptList.filter(
      (item) => item.isHighlighted,
    );
  }, [listeningDetailData]);

  const handleScrapToggle = () => {
    // 로그인 권한 없으면 로그인 모달 띄우기
    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }
    // 데이터가 아직 로드되지 않은 경우 실행 방지
    if (isLoading || listeningDetailData?.data.isScrapped === undefined) {
      return;
    }

    toggleScrap(listeningDetailData?.data.isScrapped);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  if (!listeningDetailData || !listeningDetailData.data) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-gray-500">리스닝 콘텐츠가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold">
          {listeningDetailData?.data.title}
        </h1>
        <Badge>{listeningDetailData?.data.category}</Badge>
        <div className="text-sm flex justify-end w-full">
          조회수 {formatViewCount(listeningDetailData?.data.hits)}
        </div>
      </div>
      <Separator />

      {/* TODO(@smosco): response 타입 나누기 싫어서 타입 단언 */}
      <VideoPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        ref={playerRef}
        videoUrl={listeningDetailData?.data.videoUrl as string}
        setCurrentTime={setCurrentTime}
        onProgress={handleProgress}
      />

      {/* 보기모드, 언어 옵션 */}
      <SubtitleOption
        mode={mode}
        selectedLanguages={selectedLanguages}
        setMode={setMode}
        setSelectedLanguages={setSelectedLanguages}
      />

      {/* 자막 컨테이너 */}
      <ReactScriptPlayer
        mode={mode}
        scripts={listeningDetailData?.data.scriptList || []}
        selectedLanguages={selectedLanguages}
        seekTo={seekTo}
        currentTime={currentTime}
        onClickScript={(script, index) => {
          console.log(script, index);
        }}
        onSelectWord={(word, script, index) => {
          console.log(word, script, index);
        }}
        containerStyle={{
          width: '',
          height: '16rem',
          padding: '',
          backgroundColor: '',
          borderColor: '#ede9fe',
        }}
        textStyle={{
          color: '',
          fontSize: '',
          fontWeight: '',
          lineHeight: '',
          activeColor: '#f5f3ff',
        }}
        timeStyle={{
          color: '#5a5a5a',
          fontSize: '',
          backgroundColor: '#ddd6fe',
          borderRadius: '',
          padding: '',
        }}
      />

      {/* TODO(@godhyzzang) : logout상태일 때 블러처리한 커버사진 있으면 좋을듯 */}
      {/* 북마크 메모 패널 */}
      <BookmarkMemoPanel
        bookmarkList={bookmarkList}
        seekTo={seekTo}
        scriptsData={listeningDetailData?.data.scriptList}
        currentTime={currentTime}
        setIsPlaying={setIsPlaying}
        setShowLoginModal={setShowLoginModal}
        missionStatus={missionStatus?.data}
      />
      {/* 퀴즈 */}
      {isLogin ? (
        // 로그인 했을 때 퀴즈커버
        <div className="w-full h-fit overflow-hidden rounded-lg shadow-lg ">
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
            <div className="inset-0 bg-white flex">
              {/* 퀴즈 */}
              {quizData && quizData.data.questionAnswer.length > 0 ? (
                <QuizCarousel />
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
        isScrapped={listeningDetailData.data.isScrapped}
        onScrapToggle={handleScrapToggle}
      />
    </div>
  );
}
