'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyAlert from '@/components/EmptyAlert';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useFetchSearchResults } from '@/api/hooks/useSearch';
import ListeningPreviewCard from '@/components/ListeningPreviewCard';
import ReadingPreviewCard from '@/components/ReadingPreviewCard';

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
    <div>
      <h1 className="text-2xl font-[600] mb-8">
        &apos;{query}&apos; 에 대한 검색 결과
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResultData.data.contents.map((result) => (
          <li key={result.contentId}>
            {result.contentType === 'READING' ? (
              <ReadingPreviewCard data={result} />
            ) : (
              <ListeningPreviewCard data={result} />
            )}
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
