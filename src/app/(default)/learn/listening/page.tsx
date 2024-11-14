'use client';

import { usePaginatedListeningPreview } from '@/api/hooks/usePreview';
import ContentTypeFilter from '@/components/common/ContentTypeFilter';
import Pagination from '@/components/common/Pagination';
import ItemComponent from '@/components/ItemComponentCard';
import { useSetSearchParams } from '@/hooks/useSetSearchParams';

function ListeningPage() {
  const { path, searchParams, setSearchParams } = useSetSearchParams();

  const currentPage = Number(searchParams.get('page'));
  // 기본값 지정해줘야만 null, undefined가 queryparams로 들어가지 않음
  const size = Number(searchParams.get('size')) || 10;
  const sort = searchParams.get('sort') || 'createdAt';
  const direction = searchParams.get('direction') || 'DESC';
  const categoryId = Number(searchParams.get('categoryId')) || undefined;

  const {
    data: listeningContents,
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
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  // 페이지네이션 버튼 누를때마다 페이지 이동

  const handlePageChange = (page: number) => {
    setSearchParams({ path, params: { page: String(page) } });
  };

  return (
    <main>
      <ContentTypeFilter />
      {!listeningContents || listeningContents.data.contents.length === 0 ? (
        <div className="flex justify-center items-center mt-8">
          컨텐츠가 없습니다
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-7 mt-8">
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

export default ListeningPage;
