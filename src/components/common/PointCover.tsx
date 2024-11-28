/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { CircleParking } from 'lucide-react';

import { useFetchCurrentPoints } from '@/api/hooks/useDashboard';
import { useReducePoints } from '@/api/hooks/usePoint';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import { useToast } from '@/hooks/use-toast';

import LogInOutButton from './LogInOutButton';
import Modal from './Modal';
import { Button } from '../ui/button';

interface PointCoverProps {
  data: {
    isPointRequired: boolean;
    contentId: string;
    contentType: 'READING' | 'LISTENING';
  };
  children: ReactNode;
}

export default function PointCover({ data, children }: PointCoverProps) {
  const [showPointModal, setShowPointModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPointErrorModal, setShowPointErrorModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { data: isLoginData } = useUserLoginStatus();
  const { data: pointsData } = useFetchCurrentPoints();
  const isLogin = !!isLoginData?.data;
  const userPoints = pointsData?.data.currentPoint || 0;
  const requiredPoints = 10; // 항상 10 포인트 차감

  const { contentId } = data;
  const reducePointMutation = useReducePoints();

  const router = useRouter();

  const { toast } = useToast();

  const handleOpen = (event: React.MouseEvent) => {
    if (data.isPointRequired && !isConfirmed) {
      event.preventDefault();

      if (!isLogin) {
        setShowLoginModal(true);
      } else if (userPoints < requiredPoints) {
        setShowPointErrorModal(true);
      } else {
        setShowPointModal(true);
      }
    }
  };

  const handleConfirm = async () => {
    setShowPointModal(false);

    try {
      const success = await reducePointMutation.mutateAsync(contentId);
      if (success) {
        setIsConfirmed(true);
        router.push(
          data.contentType === 'READING'
            ? `/learn/reading/detail/${data.contentId}`
            : `/learn/listening/detail/${data.contentId}`,
        );
      }
    } catch (error) {
      toast({ title: '포인트 차감 실패', duration: 1000 });
    }
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="relative w-full h-fit cursor-pointer"
      >
        {children}
        {data.isPointRequired && !isConfirmed && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-30 rounded-xl">
            <div className="bg-black/80 rounded-lg p-2 backdrop-blur-sm flex items-center gap-2 text-white">
              <CircleParking className="w-4 h-4" />
              <span className="text-sm font-medium z-50">
                10 포인트가 필요해요
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 로그인 필요 모달 */}
      {showLoginModal && (
        <Modal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          title="로그인 필요"
          description="이 기능을 이용하려면 로그인이 필요해요"
        >
          <LogInOutButton />
        </Modal>
      )}

      {/* 포인트 부족 모달 */}
      {showPointErrorModal && (
        <Modal
          isOpen={showPointErrorModal}
          onClose={() => setShowPointErrorModal(false)}
          title="포인트 부족"
          description={`현재 포인트: ${userPoints}P, 필요 포인트: ${requiredPoints}P`}
        >
          <div className="text-sm text-gray-500">
            퀴즈를 풀어 포인트를 얻을 수 있어요 😊
          </div>
        </Modal>
      )}

      {/* 포인트 차감 확인 모달 */}
      {showPointModal && (
        <Modal
          isOpen={showPointModal}
          onClose={() => setShowPointModal(false)}
          title="포인트 차감 확인"
          description={`현재 포인트: ${userPoints}P → 차감 후: ${
            userPoints - requiredPoints
          }P`}
        >
          <Button onClick={handleConfirm}>학습하기</Button>
        </Modal>
      )}
    </>
  );
}
