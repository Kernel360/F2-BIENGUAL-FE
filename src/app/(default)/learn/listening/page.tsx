'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Clock } from 'lucide-react';

import { usePaginatedListeningPreview } from '@/api/hooks/usePreview';
import ContentTypeFilter from '@/components/common/ContentTypeFilter';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Pagination from '@/components/common/Pagination';
import ContentCard from '@/components/items/ContentCard';
import PreviewScrapButton from '@/components/PreviewScrapButton';
import { Badge } from '@/components/ui/badge';

function ListeningPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page'));
  // 기본값 지정해줘야만 null, undefined가 queryparams로 들어가지 않음
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  // TODO(@godhyzzang): 컨텐츠가 없을 때 보여줄 컴포넌트 만들 것
  // if (!listeningContents || listeningContents.data.contents.length === 0) {
  //   return <EmptyAlert alertDescription="컨텐츠가 없습니다." />;
  // }

  // 페이지네이션 버튼 누를때마다 페이지 이동
  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <main>
      <ContentTypeFilter />
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-7 mt-8">
        {listeningContents?.data.contents.map((content) => (
          <ContentCard
            key={content.contentId}
            href={`/learn/listening/detail/${content.contentId}`}
            topRightButton={
              <PreviewScrapButton
                contentId={content.contentId}
                isScrappedData={content.isScrapped}
                target="paginatedListeningPreview"
              />
            }
            bottomRightButton={
              <Badge className="flex items-center gap-1 bg-gray-200 bg-opacity-70">
                <Clock className="w-3 h-3" color="purple" />
                <span className="text-violet-800">24:00</span>
              </Badge>
            }
            coverImageUrl={content.thumbnailUrl}
            leftBadge={<Badge>{content.category}</Badge>}
            rightBadge={`조회수 ${content.hits}`}
            title={content.title}
            description={content.preScripts}
          />
        ))}
      </div>
      <Pagination
        totalPages={listeningContents?.data.totalPages ?? 0}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default ListeningPage;
