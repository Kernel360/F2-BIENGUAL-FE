'use client';

import { useRouter } from 'next/navigation';

import { Clock } from 'lucide-react';

import { usePaginatedListeningPreview } from '@/api/hooks/usePreview';
import ContentTypeFilter from '@/components/common/ContentTypeFilter';
import EmptyAlert from '@/components/common/EmptyAlert';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Pagination from '@/components/common/Pagination';
import ContentCard from '@/components/items/ContentCard';
import PreviewScrapButton from '@/components/PreviewScrapButton';
import { Badge } from '@/components/ui/badge';

function ListeningPage() {
  const router = useRouter();
  //    TODO@godhyzzang : page 1부터 시작하도록 api 수정 요청필요
  // const searchParams = useSearchParams();

  // const currentPage = Number(searchParams.get('page') || 0);

  const {
    data: listeningContents,
    isLoading,
    isError,
    error,
  } = usePaginatedListeningPreview();
  //    TODO@godhyzzang : page 1부터 시작하도록 api 수정 요청필요

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
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-7 mt-8">
        {listeningContents.data.contents.map((content) => (
          <ContentCard
            key={content.contentId}
            href={`/learn/listening/detail/${content.contentId}`}
            topRightButton={
              <PreviewScrapButton contentId={content.contentId} />
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
        totalPages={listeningContents.data.totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default ListeningPage;
