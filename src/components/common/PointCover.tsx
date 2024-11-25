/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { CircleParking } from 'lucide-react';

import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';

import LogInOutButton from './LogInOutButton';
import Modal from './Modal';
import { Button } from '../ui/button';

interface PointCoverProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  children: ReactNode;
}

export default function PointCover({ data, children }: PointCoverProps) {
  const [showPointModal, setShowPointModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = !!isLoginData?.data;

  const router = useRouter();

  const handleOpen = (event: React.MouseEvent) => {
    if (data.isPointRequired && !isConfirmed) {
      event.preventDefault();
      setShowPointModal(true);
    }
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    setShowPointModal(false);
    router.push(
      data.contentType === 'READING'
        ? `/learn/reading/detail/${data.contentId}`
        : `/learn/listening/detail/${data.contentId}`,
    );
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="relative w-full h-fit cursor-pointer mr-3"
      >
        {children}
        {/* 포인트가 필요한 경우 오버레이 표시 */}
        {data.isPointRequired && !isConfirmed && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-30 rounded-xl">
            <div className="bg-black/80 rounded-lg p-2 backdrop-blur-sm flex items-center gap-2 text-white">
              <CircleParking className="w-4 h-4" />
              <span className="text-sm font-medium z-50">포인트 필요</span>
            </div>
          </div>
        )}
      </div>
      {showPointModal && (
        <Modal
          isOpen={showPointModal}
          onClose={() => setShowPointModal(false)}
          title="포인트 차감 확인"
          description="최신 콘텐츠를 학습하려면 포인트가 필요해요."
        >
          {isLogin ? (
            <Button onClick={handleConfirm}>학습하기</Button>
          ) : (
            <LogInOutButton />
          )}
        </Modal>
      )}
    </>
  );
}
