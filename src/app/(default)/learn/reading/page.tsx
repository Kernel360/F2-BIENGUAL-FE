'use client';

import { usePaginatedReadingPreview } from '@/api/hooks/usePreview';
import ContentTypeFilter from '@/components/common/ContentTypeFilter';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Pagination from '@/components/common/Pagination';
import ItemComponentList from '@/components/ItemComponentList';
import { useSetSearchParams } from '@/hooks/useSetSearchParams';

export default function ReadingPage() {
  const { path, searchParams, setSearchParams } = useSetSearchParams();
  const currentPage = Number(searchParams.get('page'));
  // 기본값 지정해줘야만 null, undefined가 queryparams로 들어가지 않음
  const size = Number(searchParams.get('size')) || 10;
  const sort = searchParams.get('sort') || 'createdAt';
  const direction = searchParams.get('direction') || 'DESC';
  const categoryId = Number(searchParams.get('categoryId')) || undefined;

  const {
    data: readingContents,
    isLoading,
    isError,
    error,
  } = usePaginatedReadingPreview(
    currentPage,
    size,
    sort,
    direction,
    categoryId,
  );

  if (isError) {
    return (
      <p className="text-red-500">
        리딩 콘텐츠 목록을 불러오지 못했어요: {error.message}
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
      (!readingContents || readingContents.data.contents.length === 0) ? (
        <div className="flex justify-center items-center mt-8">
          콘텐츠가 없습니다
        </div>
      ) : (
        <div>
          <ul className="flex flex-col gap-6 mt-8">
            {readingContents?.data.contents.map((content) => (
              <ItemComponentList data={content} key={content.contentId} />
            ))}
          </ul>
          <Pagination
            totalPages={readingContents?.data.totalPages ?? 0}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </main>
  );
}
