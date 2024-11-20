'use client';

import { usePaginatedReadingPreview } from '@/api/hooks/usePreview';
import ContentTypeFilter from '@/components/common/ContentTypeFilter';
import Pagination from '@/components/common/Pagination';
import ItemComponentList from '@/components/ItemComponentList';
import { useSetSearchParams } from '@/hooks/useSetSearchParams';
// import { formatDate } from '@/lib/formatDate';

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
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  const handlePageChange = (page: number) => {
    setSearchParams({ path, params: { page: String(page) } });
  };

  return (
    <main>
      <ContentTypeFilter />
      {/* TODO(@godhyzzang) : loading중인데도 컨텐트가 없습니다 잠깐 뜨는 경우 있음 */}

      {!readingContents || readingContents.data.contents.length === 0 ? (
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
          {/* TODO(@godhyzzang): 페이지네이션도 url state적용되게 해야함 */}
          <Pagination
            totalPages={readingContents?.data.totalPages || 0}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </main>
  );
}
