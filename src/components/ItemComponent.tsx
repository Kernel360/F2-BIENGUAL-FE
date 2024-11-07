/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Clock } from 'lucide-react';

import Modal from './common/Modal';
import ContentCard from './items/ContentCard';
import PreviewScrapButton from './PreviewScrapButton';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ItemComponent({ data }: { data: any }) {
  const [showPointModal, setShowPointModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const router = useRouter();

  const handleOpen = (event: React.MouseEvent) => {
    if (data.isPointRequired && !isConfirmed) {
      // 포인트가 필요할 때만 모달을 띄움
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
        className="relative w-full h-fit mr-3 cursor-pointer"
      >
        <ContentCard
          href={
            // eslint-disable-next-line no-nested-ternary
            isConfirmed || !data.isPointRequired
              ? data.contentType === 'READING'
                ? `/learn/reading/detail/${data.contentId}`
                : `/learn/listening/detail/${data.contentId}`
              : '#'
          }
          topRightButton={
            <PreviewScrapButton
              contentId={data.contentId}
              isScrappedData={data.isScrapped}
              target={
                data.contentType === 'READING'
                  ? 'readingPreview'
                  : 'listeningPreview'
              }
            />
          }
          bottomRightButton={
            data.contentType !== 'READING' && (
              <Badge className="flex items-center gap-1 bg-gray-200 bg-opacity-70">
                <Clock className="w-3 h-3" color="purple" />
                <span className="text-violet-800">24:00</span>
              </Badge>
            )
          }
          coverImageUrl={data.thumbnailUrl}
          leftBadge={<Badge>{data.category}</Badge>}
          rightBadge={`조회수 ${data.hits}`}
          title={data.title}
          description={data.preScripts}
        />
        {/* 포인트가 필요한 경우 오버레이 표시 */}
        {data.isPointRequired && !isConfirmed && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 rounded-xl">
            <div className="bg-black/80 rounded-lg p-2 backdrop-blur-sm flex items-center gap-2 text-white">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">포인트 필요</span>
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
          <Button onClick={handleConfirm}>학습하기</Button>
        </Modal>
      )}
    </>
  );
}
