'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { usePaginatedReadingPreview } from '@/api/hooks/usePreview';
import ContentTypeFilter from '@/components/common/ContentTypeFilter';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Pagination from '@/components/common/Pagination';
import ListItem from '@/components/items/ListItem';
import PreviewScrapButton from '@/components/PreviewScrapButton';
import { Badge } from '@/components/ui/badge';
// import { formatDate } from '@/lib/formatDate';

export default function ReadingPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page'));
  // 기본값 지정해줘야만 null, undefined가 queryparams로 들어가지 않음
  const size = Number(searchParams.get('size')) || 10;
  const sort = searchParams.get('sort') || 'createdAt';
  const direction = searchParams.get('direction') || 'DESC';
  const categoryId = Number(searchParams.get('categoryId')) || undefined;
  console.log('categoryId', categoryId);

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  // TODO(@godhyzzang): 컨텐츠가 없을 때 보여줄 컴포넌트 만들 것
  // if (!readingContents || readingContents.data.contents.length === 0) {
  //   return <p>콘텐츠가 없습니다.</p>;
  // }

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div>
      <ContentTypeFilter />
      <ul className="flex flex-col gap-6 mt-8">
        {readingContents?.data.contents.map((content) => (
          <ListItem
            key={content.contentId}
            href={`/learn/reading/detail/${content.contentId}`}
            coverImageUrl={content.thumbnailUrl}
            topRightButton={
              <PreviewScrapButton
                contentId={content.contentId}
                isScrappedData={content.isScrapped}
                target="paginatedReadingPreview"
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
        totalPages={readingContents?.data.totalPages || 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
