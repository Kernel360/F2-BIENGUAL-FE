/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import { useSearchParams, usePathname } from 'next/navigation';

import { Bookmark } from 'lucide-react';

import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import { useScrapToggle } from '@/hooks/useScrapToggle';

import LogInOutButton from './common/LogInOutButton';
import Modal from './common/Modal';

interface PreviewScrapButtonProps {
  contentId: number;
  isScrappedData: boolean;
  contentType?: 'READING' | 'LISTENING';
}

export default function PreviewScrapButton({
  contentId,
  isScrappedData,
  contentType,
}: PreviewScrapButtonProps) {
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const generateQueryKey = () => {
    // 기본값 설정
    const defaultValues = {
      page: 1,
      size: 10,
      sort: 'createdAt',
      direction: 'DESC',
      categoryId: null, // 전체인 경우 null로 처리
    };

    // URL에서 값을 가져오거나 기본값으로 대체
    const page = Number(searchParams.get('page')) || defaultValues.page;
    const { size } = defaultValues; // 고정값
    const sort = searchParams.get('sort') || defaultValues.sort;
    const direction = searchParams.get('direction') || defaultValues.direction;
    const categoryId = searchParams.get('categoryId')
      ? Number(searchParams.get('categoryId'))
      : defaultValues.categoryId;

    // 경로별 queryKey 구성
    if (pathname === '/') {
      // 메인 페이지
      return contentType === 'READING'
        ? ['readingPreview']
        : ['listeningPreview'];
    }

    if (pathname.startsWith('/learn')) {
      // 학습 페이지
      const type = pathname.includes('/reading')
        ? 'paginatedReadingPreview'
        : pathname.includes('/listening')
          ? 'paginatedListeningPreview'
          : null;

      if (!type) {
        throw new Error('Invalid path: unable to determine query type');
      }

      return [type, page, size, sort, direction, categoryId].filter(
        (item) => item !== null,
      ); // 기본값(categoryId)이 null인 경우 제거
    }

    throw new Error('Invalid path: no matching query key logic');
  };

  const { toggleScrap } = useScrapToggle({
    contentId,
    queryKey: generateQueryKey(),
  });

  const handleShowLoginModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowLoginModal(true);
  };

  const handleToggleScrap = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleScrap(isScrappedData);
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
          title="로그인이 필요해요"
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
