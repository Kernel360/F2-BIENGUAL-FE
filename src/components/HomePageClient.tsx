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
import LoadingSpinner from '@/components/common/LoadingSpinner';
import SentenceComponent from '@/components/SentenceComponent';
import { Button } from '@/components/ui/button';
import {
  ReadingPreviewResponse,
  ListeningPreviewResponse,
  // TODO(@godhyzzang) : 추천bookmark한 문장도  initialData연결
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
  const { data: readingList, isLoading: readingLoading } = useQuery({
    queryKey: ['readingPreview'],
    queryFn: () => fetchReadingPreview(),
    initialData: initialReadingContents,
  });

  const { data: listeningList, isLoading: listeningLoading } = useQuery({
    queryKey: ['listeningPreview'],
    queryFn: () => fetchListeningPreview(),
    initialData: initialListeningContents,
  });

  const { data: recommendedBookmarksData, isLoading: isSentenceLoading } =
    useQuery({
      queryKey: ['recommendedBookmarks'],
      queryFn: fetchRecommendedBookmarks,
      initialData: initialSentences,
    });

  const { data: recommendedContents, isLoading: isRecommendedLoading } =
    useQuery({
      queryKey: ['recommendedContents'],
      queryFn: () => fetchRecommendedContents(),
      initialData: initialRecommendedContents,
    });

  if (
    readingLoading ||
    listeningLoading ||
    isSentenceLoading ||
    isRecommendedLoading
  ) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 인기 리스닝 콘텐츠 캐러셀 */}
      <Carousel
        previewDatas={listeningList?.data.listeningPreview || []}
        header={
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-bold">인기 리스닝 콘텐츠</h3>
            <Link href="/learn/listening?page=1">
              <Button variant="ghost" className="shrink-0">
                더보기
                <ChevronRight size={24} color="#6B6B6B" />
              </Button>
            </Link>
          </div>
        }
        // TODO(@smosco): ItemComponent margin 안 먹음
        itemComponent={ItemComponentCard}
        itemWidth={255}
        // isAutoPlay
        loopExtensionCount={2} // 한 화면에 캐러셀이 3개인 캐러셀은 2개 확장해야 Loop기능 가능
      />
      {/* 문장 캐러셀 */}
      <Carousel
        previewDatas={recommendedBookmarksData?.data.popularBookmarks || []}
        itemComponent={SentenceComponent}
        itemWidth={798}
        // isAutoPlay
        // autoPlayInterval={10000}
      />
      {/* 인기 리딩 콘텐츠 캐러셀 */}
      <Carousel
        previewDatas={readingList?.data.readingPreview || []}
        header={
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-bold">인기 리딩 콘텐츠</h3>
            <Link href="/learn/reading?page=1">
              <Button variant="ghost">
                더보기
                <ChevronRight size={24} color="#6B6B6B" />
              </Button>
            </Link>
          </div>
        }
        itemComponent={ItemComponentCard}
        itemWidth={255}
        // isAutoPlay
        loopExtensionCount={2} // 한 화면에 캐러셀이 3개인 캐러셀은 2개 확장해야 Loop기능 가능
      />
      <RecommendedList
        recommendedData={recommendedContents?.data.recommendedContents}
      />
    </div>
  );
}
