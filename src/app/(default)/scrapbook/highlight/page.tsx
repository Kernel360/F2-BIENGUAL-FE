'use client';

import { useFetchAllBookmarks } from '@/api/hooks/useBookmarks';
import EmptyAlert from '@/components/common/EmptyAlert';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MemoItem from '@/components/common/MemoItem';

export default function HighlighterAndMemo() {
  const {
    data: allBookmarkData,
    isLoading,
    isError,
    error,
  } = useFetchAllBookmarks();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  if (!allBookmarkData || allBookmarkData.data.bookmarkMyList.length === 0) {
    return <EmptyAlert alertDescription="저장된 북마크가 없어요" />;
  }

  return (
    <div className="container w-full mx-auto px-4 ">
      <p className="text-sm text-muted-foreground">
        {allBookmarkData.data.bookmarkMyList.length}개의 형광펜
      </p>
      {allBookmarkData.data.bookmarkMyList.map((item) => (
        <MemoItem key={item.bookmarkId} data={item} />
      ))}
    </div>
  );
}
