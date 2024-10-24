'use client';

import { useSearchParams, useRouter } from 'next/navigation';

import { usePaginatedListeningPreview } from '@/api/hooks/usePreview';
import ContentTypeFilter from '@/components/common/ContentTypeFilter';
import EmptyAlert from '@/components/common/EmptyAlert';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Pagination from '@/components/common/Pagination';
import ListeningPreviewCard from '@/components/listening/ListeningPreviewCard';

function ListeningPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || 0);

  const {
    data: listeningContents,
    isLoading,
    isError,
    error,
  } = usePaginatedListeningPreview(currentPage - 1);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  if (!listeningContents || listeningContents.data.contents.length === 0) {
    return <EmptyAlert alertDescription="북마크가 없습니다." />;
  }

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <main>
      <ContentTypeFilter />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-7 mt-8">
        {listeningContents.data.contents.map((content) => (
          <ListeningPreviewCard key={content.contentId} data={content} />
        ))}
      </div>
      <Pagination
        totalPages={listeningContents.data.totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default ListeningPage;
