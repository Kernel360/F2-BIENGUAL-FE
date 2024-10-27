import { Bookmark } from 'lucide-react';

import useHandleScrap from '@/hooks/useHandleScrap';

interface PreviewScrapButtonProps {
  contentId: number;
}

export default function PreviewScrapButton({
  contentId,
}: PreviewScrapButtonProps) {
  const { isScrapped, toggleScraped } = useHandleScrap(contentId);

  const handleScrapClick = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleScraped(); // 스크랩 처리
  };
  return (
    <button type="button" onClick={handleScrapClick}>
      <Bookmark
        className="h-6 w-6"
        stroke={isScrapped ? 'white' : 'white'}
        fill={isScrapped ? 'violet' : ''}
      />
    </button>
  );
}
