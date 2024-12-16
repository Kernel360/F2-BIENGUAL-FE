/* eslint-disable react/no-array-index-key */

// TODO(@godhyzzang) : 현재 레이팅 평가 현황 나타내는 컴포넌트 만들어야함

'use client';

import { useState, useEffect } from 'react';

import { ArrowUp, Eye } from 'lucide-react';

import { useContentDetail } from '@/api/hooks/useContent';
import { useFetchMissionStatus } from '@/api/hooks/useMission';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import DifficultyEvaluator from '@/components/common/DifficultyEvaluator';
import FloatingButtons from '@/components/common/FloatingButtons';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import LogInOutButton from '@/components/common/LogInOutButton';
import Modal from '@/components/common/Modal';
import DifficultyDisplay from '@/components/DifficultyDisplay';
import QuizWrapper from '@/components/quiz/QuizWrapper';
import MissionScrollProgressbar from '@/components/reading/MissionScrollProgressbar';
import ReadingScriptItem from '@/components/reading/ReadingScriptItem';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useScrapToggle } from '@/hooks/useScrapToggle';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useUpdateLearningProgressOnUnmount } from '@/hooks/useUpdateLearningProgressOnUnmount';
import { formatViewCount } from '@/lib/formatViewCount';

export default function ReadingDetailClient({
  contentId,
}: {
  contentId: number;
}) {
  const { data, isLoading, isError, error } = useContentDetail(contentId);

  const scrollProgress = useScrollProgress();
  useUpdateLearningProgressOnUnmount(contentId, scrollProgress);
  const { toggleScrap } = useScrapToggle({
    contentId,
    queryKey: ['contentDetail', contentId],
  });

  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data;

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showTranslate, setShowTranslate] = useState(true);

  const { data: missionStatus } = useFetchMissionStatus();

  const toggleTranslation = () => setShowTranslate((prev) => !prev);

  const handleScrapToggle = () => {
    // 로그인하지 않은 경우
    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }

    // 데이터가 아직 로드되지 않은 경우 실행 방지
    if (isLoading || data?.data.isScrapped === undefined) {
      return;
    }

    toggleScrap(data?.data.isScrapped);
  };

  useEffect(() => {
    if (!data?.data.currentLearningRate) return; // 학습률이 없으면 실행하지 않음

    const handleScrollPosition = () => {
      const scrollPosition =
        (document.documentElement.scrollHeight - window.innerHeight) *
        (Number(data?.data.currentLearningRate) / 100);

      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    };

    // 페이지 로딩 시에만 실행
    handleScrollPosition();
  }, [contentId, data?.data.currentLearningRate]);
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {error?.message}</div>;

  const contentData = data?.data;

  if (!contentData) return <div>콘텐츠가 존재하지 않아요!</div>;

  return (
    <div className="w-full flex flex-col gap-5 h-auto">
      <div>
        <h1 className="text-lg font-bold mb-2">{contentData.title}</h1>
        <div className="flex justify-between gap-1">
          <Badge>{contentData.category}</Badge>
          <DifficultyDisplay calculatedLevel={contentData.calculatedLevel} />
          <div className="text-sm flex justify-end items-center w-full gap-1 text-gray-400">
            <Eye className="w-4 h-4" />
            {formatViewCount(contentData.hits)}
          </div>
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

      <div className="mb-6">
        <ul className="flex flex-col gap-6 text-[#313131]">
          {contentData.scriptList.map((script, index) => {
            return (
              <ReadingScriptItem
                index={index}
                key={index}
                script={script}
                showTranslate={showTranslate}
                missionStatus={missionStatus?.data}
              />
            );
          })}
        </ul>
      </div>

      <QuizWrapper contentId={contentId} />
      <DifficultyEvaluator
        contentId={contentId}
        customLevel={contentData?.customLevel}
      />
      {/* 로그인 모달 */}
      {showLoginModal && (
        <Modal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          title="로그인이 필요해요"
          description="이 기능을 이용하려면 로그인이 필요해요! "
        >
          <div className="flex justify-center gap-4 mt-4">
            <LogInOutButton />
          </div>
        </Modal>
      )}

      {/* 번역, 스크랩 버튼 */}
      <FloatingButtons
        isScrapped={data?.data.isScrapped}
        onScrapToggle={handleScrapToggle}
        showTranslate={showTranslate}
        onTranslateToggle={toggleTranslation}
      />
      <MissionScrollProgressbar
        scrollPercent={scrollProgress}
        missionStatus={missionStatus?.data}
      />

      <div className="fixed right-4 bottom-25 md:bottom-4">
        <Button
          variant="default"
          size="icon"
          className="rounded-full w-12 h-12"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
