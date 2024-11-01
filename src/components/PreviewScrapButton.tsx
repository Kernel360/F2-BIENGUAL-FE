import { Bookmark } from 'lucide-react';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import useHandleScrap from '@/hooks/useHandleScrap';
import Modal from './common/Modal';
import LogInOutButton from './common/LogInOutButton';
import { useState } from 'react';
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
  const { isScrapped, toggleScraped } = useHandleScrap(
    contentId,
    isScrappedData, // useHandleScrap에 isScrappedData를 넘겨주어서 isScrapped를 받아옴
  );

  const handleShowLoginModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowLoginModal(true);
  };

  const handleToggleScrap = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleScraped(); // 스크랩 토글
  };

  return (
    <>
      <button
        type="button"
        onClick={isLogin ? handleToggleScrap : handleShowLoginModal}
      >
        <Bookmark
          className="h-6 w-6"
          stroke={isScrapped ? 'white' : 'white'}
          fill={isScrapped ? 'violet' : ''}
        />
      </button>
      {/* 로그인 안 했을 때 보여줄 모달*/}
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
