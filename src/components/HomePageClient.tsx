'use client';

import React from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';

import {
  fetchReadingPreview,
  fetchListeningPreview,
} from '@/api/queries/contentsQueries';
import {
  fetchRecommendedBookmarks,
  fetchRecommendedContents,
} from '@/api/queries/recommendQueries';
import Carousel from '@/components/common/Carousel';
import SentenceComponent from '@/components/SentenceComponent';
import { Button } from '@/components/ui/button';
import {
  ReadingPreviewResponse,
  ListeningPreviewResponse,
  RecommendedBookmarksResponse,
  RecommendedContentsResponse,
} from '@/types/Preview';

import ItemComponentCard from './ItemComponentCard';
import RecommendedList from './RecommendedList';

interface HomePageClientProps {
  initialReadingContents: ReadingPreviewResponse;
  initialListeningContents: ListeningPreviewResponse;
  initialSentences: RecommendedBookmarksResponse;
  initialRecommendedContents: RecommendedContentsResponse;
}

export default function HomePageClient({
  initialReadingContents,
  initialListeningContents,
  initialSentences,
  initialRecommendedContents,
}: HomePageClientProps) {
  const { data: readingList, isError: readingError } = useQuery({
    queryKey: ['readingPreview'],
    queryFn: () => fetchReadingPreview(),
    initialData: initialReadingContents,
  });

  const { data: listeningList, isError: listeningError } = useQuery({
    queryKey: ['listeningPreview'],
    queryFn: () => fetchListeningPreview(),
    initialData: initialListeningContents,
  });

  const { data: recommendedBookmarksData, isError: bookmarksError } = useQuery({
    queryKey: ['recommendedBookmarks'],
    queryFn: fetchRecommendedBookmarks,
    initialData: initialSentences,
  });

  const { data: recommendedContents, isError: recommendedError } = useQuery({
    queryKey: ['recommendedContents'],
    queryFn: () => fetchRecommendedContents(),
    initialData: initialRecommendedContents,
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 인기 리스닝 콘텐츠 캐러셀 */}
      <Carousel
        desktopItemsToShow={3}
        tabletItemsToShow={2}
        mobileItemsToShow={1}
        items={listeningList?.data.listeningPreview || []}
        header={
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-bold">
              <span className="text-red-500 text-medium">🔥 HOT </span>
              리스닝 콘텐츠
            </h3>
            <Link href="/learn/listening?page=1">
              <Button variant="ghost" className="shrink-0">
                더보기
                <ChevronRight size={24} color="#6B6B6B" />
              </Button>
            </Link>
          </div>
        }
        itemComponent={ItemComponentCard}
        autoPlay
      />
      {listeningError && (
        <p className="px-4 text-gray-500">
          인기 리스닝 콘텐츠를 불러오지 못했어요
        </p>
      )}

      {/* 문장 캐러셀 */}
      <Carousel
        desktopItemsToShow={1}
        tabletItemsToShow={1}
        mobileItemsToShow={1}
        items={recommendedBookmarksData?.data.popularBookmarks || []}
        itemComponent={SentenceComponent}
        autoPlayInterval={10000}
      />
      {bookmarksError && (
        <p className="px-4 text-gray-500">오늘의 문장을 불러오지 못했어요</p>
      )}

      {/* 인기 리딩 콘텐츠 캐러셀 */}
      <Carousel
        desktopItemsToShow={3}
        tabletItemsToShow={2}
        mobileItemsToShow={1}
        items={readingList?.data.readingPreview || []}
        header={
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-bold">
              <span className="text-red-500 text-medium">🔥 HOT </span> 리딩
              콘텐츠
            </h3>
            <Link href="/learn/reading?page=1">
              <Button variant="ghost">
                더보기
                <ChevronRight size={24} color="#6B6B6B" />
              </Button>
            </Link>
          </div>
        }
        itemComponent={ItemComponentCard}
        autoPlay
      />
      {readingError && (
        <p className="px-4 text-gray-500">
          인기 리딩 콘텐츠를 불러오지 못했어요
        </p>
      )}

      <RecommendedList
        recommendedData={recommendedContents?.data.recommendedContents}
      />
      {recommendedError && (
        <p className="px-4 text-gray-500">추천 콘텐츠를 불러오지 못했어요</p>
      )}
    </div>
  );
}
