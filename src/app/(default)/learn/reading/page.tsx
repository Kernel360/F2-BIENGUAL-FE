'use client';

import { useSearchParams, useRouter } from 'next/navigation';

import { useReadingContents } from '@/api/hooks/usePreview';
import ArticlePreview from '@/components/ArticlePreview';
import ContentTypeFilter from '@/components/ContentTypeFilter';
import LoadingSpinner from '@/components/LoadingSpinner';
import Pagination from '@/components/Pagination';

export default function ReadingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || 0);

  const {
    data: readingContents,
    isLoading,
    isError,
    error,
    // TODO(@smosco): 백엔드에 page 1부터 시작하게 변경 요청
  } = useReadingContents(currentPage - 1);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  if (!readingContents || readingContents.data.contents.length === 0) {
    return <p>콘텐츠가 없습니다.</p>;
  }

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div>
      <ContentTypeFilter />
      <ul className="flex flex-col gap-6 mt-8">
        {readingContents.data.contents.map((content) => (
          <ArticlePreview key={content.contentId} data={content} />
        ))}
      </ul>
      <Pagination
        totalPages={readingContents.data.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
