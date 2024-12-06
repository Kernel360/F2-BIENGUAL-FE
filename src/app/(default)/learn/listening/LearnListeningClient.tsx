// app/learn/listening/LearnListeningClient.tsx

'use client';

import { usePaginatedListeningPreview } from '@/api/hooks/usePreview';
import ContentTypeFilter from '@/components/common/ContentTypeFilter';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Pagination from '@/components/common/Pagination';
import ItemComponent from '@/components/ItemComponentCard';
import { useSetSearchParams } from '@/hooks/useSetSearchParams';

function LearnListeningClient() {
  const { path, searchParams, setSearchParams } = useSetSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const size = Number(searchParams.get('size')) || 10;
  const sort = searchParams.get('sort') || 'createdAt';
  const direction = searchParams.get('direction') || 'DESC';
  const categoryId = Number(searchParams.get('categoryId')) || undefined;

  const {
    data: listeningContents,
    isLoading,
    isError,
    error,
  } = usePaginatedListeningPreview(
    currentPage,
    size,
    sort,
    direction,
    categoryId,
  );

  if (isError) {
    return (
      <p className="text-red-500">
        리스닝 콘텐츠 목록을 불러오지 못했어요: {error.message}
      </p>
    );
  }

  const handlePageChange = (page: number) => {
    setSearchParams({ path, params: { page: String(page) } });
  };

  return (
    <main>
      <ContentTypeFilter />

      {isLoading && <LoadingSpinner />}

      {!isLoading &&
      (!listeningContents || listeningContents.data.contents.length === 0) ? (
        <div className="flex justify-center items-center mt-8">
          콘텐츠가 없습니다
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-7 mt-8">
          {listeningContents?.data.contents.map((content) => (
            <ItemComponent key={content.contentId} data={content} />
          ))}
        </div>
      )}

      <Pagination
        totalPages={listeningContents?.data.totalPages ?? 0}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default LearnListeningClient;
