'use client';

import { useFetchScrap } from '@/api/hooks/useScrap';
import ContentPreview from '@/components/ContentPreview';
import EmptyAlert from '@/components/EmptyAlert';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function RecentContent() {
  const { data: allScrapData, isLoading, isError, error } = useFetchScrap();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  if (!allScrapData || allScrapData.data.scrapList.length === 0) {
    return <EmptyAlert alertDescription="스크랩 콘텐츠가 없어요" />;
  }
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">최근 스크랩한 콘텐츠</h1>
      {allScrapData.data.scrapList.map((item) => (
        <ContentPreview key={item.scrapId} data={item} />
      ))}
    </div>
  );
}
