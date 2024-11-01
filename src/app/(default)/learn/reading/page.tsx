'use client';

import { useRouter } from 'next/navigation';

import { usePaginatedReadingPreview } from '@/api/hooks/usePreview';
import ContentTypeFilter from '@/components/common/ContentTypeFilter';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Pagination from '@/components/common/Pagination';
import ListItem from '@/components/items/ListItem';
import { Badge } from '@/components/ui/badge';
import PreviewScrapButton from '@/components/PreviewScrapButton';
// import { formatDate } from '@/lib/formatDate';

export default function ReadingPage() {
  const router = useRouter();
  //    TODO@godhyzzang : page 1부터 시작하도록 api 수정 요청필요

  // const searchParams = useSearchParams();

  // const currentPage = Number(searchParams.get('page') || 0);

  const {
    data: readingContents,
    isLoading,
    isError,
    error,
  } = usePaginatedReadingPreview();
  //    TODO@godhyzzang : page 1부터 시작하도록 api 수정 요청필요

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
          <ListItem
            key={content.contentId}
            href={`/learn/reading/detail/${content.contentId}`}
            coverImageUrl={content.thumbnailUrl}
            topRightButton={
              <PreviewScrapButton
                contentId={content.contentId}
                isScrappedData={content.isScrapped}
              />
            }
            leftBadge={<Badge>{content.category}</Badge>}
            rightBadge={
              <p className="text-sm text-muted-foreground">{content.hits}회</p>
            }
            title={content.title}
            description={content.preScripts}
            footerContent={
              <>
                {/*  TODO(@godhyzzang): 날짜 보여주기 */}
                {/* <p className="text-sm mb-3">
                  {content.createdAt && `${formatDate(content.createdAt)} 저장`}
                </p> */}
              </>
            }
          />
        ))}
      </ul>
      <Pagination
        totalPages={readingContents.data.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
