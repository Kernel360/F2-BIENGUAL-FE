'use client';

import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';

import { Clock } from 'lucide-react';

import { useFetchSearchResults } from '@/api/hooks/useSearch';
import EmptyAlert from '@/components/common/EmptyAlert';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ContentCard from '@/components/items/ContentCard';
import { Badge } from '@/components/ui/badge';
import { formatViewCount } from '@/lib/formatViewCount';

function SearchResultsList() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: searchResultData, isLoading } = useFetchSearchResults(query);

  if (!query) {
    return <p>검색어를 입력해주세요</p>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!searchResultData || searchResultData.data.contents.length === 0) {
    return (
      <EmptyAlert alertDescription={`${query}에 대한 검색 결과가 없습니다.`} />
    );
  }

  return (
    <div className="px-6">
      <h1 className="text-2xl font-[600] mb-8">
        &apos;{query}&apos; 에 대한 검색 결과
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResultData.data.contents.map((result) => (
          <li key={result.contentId}>
            <ContentCard
              href={
                result.contentType === 'READING'
                  ? `/learn/reading/detail/${result.contentId}`
                  : `/learn/listening/detail/${result.contentId}`
              }
              // TODO(@smosco): 서치 컴포넌트에도 스크랩 추가했을 때 target을 어떻게 줄지
              // topRightButton={
              //   <PreviewScrapButton
              //     contentId={result.contentId}
              //     isScrappedData={result.isScrapped}
              //   />
              // }
              bottomRightButton={
                result.contentType !== 'READING' && (
                  <Badge className="flex items-center gap-1 bg-gray-200 bg-opacity-70">
                    <Clock className="w-3 h-3" color="purple" />
                    <span className="text-violet-800">{result.duration}</span>
                  </Badge>
                )
              }
              coverImageUrl={result.thumbnailUrl}
              leftBadge={<Badge>{result.category}</Badge>}
              rightBadge={`조회수 ${formatViewCount(result.hits)}`}
              title={result.title}
              description={result.preScripts}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchResultsList />
    </Suspense>
  );
}
