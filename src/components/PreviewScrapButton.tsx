import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Bookmark } from 'lucide-react';

import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import { useScrapToggle } from '@/hooks/useScrapToggle';

import LogInOutButton from './common/LogInOutButton';
import Modal from './common/Modal';

interface PreviewScrapButtonProps {
  contentId: number;
  isScrappedData: boolean;
}

export default function PreviewScrapButton({
  contentId,
  isScrappedData,
}: PreviewScrapButtonProps) {
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page'));

  const { toggleScrap } = useScrapToggle(contentId, isScrappedData, page);

  const handleShowLoginModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowLoginModal(true);
  };

  const handleToggleScrap = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleScrap();
  };

  return (
    <>
      <button
        type="button"
        onClick={isLogin ? handleToggleScrap : handleShowLoginModal}
      >
        <Bookmark
          className="h-6 w-6"
          stroke="white"
          fill={isScrappedData ? '#6622ec' : ''} // 스크랩 상태에 따라 아이콘 색상 변경
        />
      </button>
      {/* 로그인 안 했을 때 보여줄 모달 */}
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
    </>
  );
}
