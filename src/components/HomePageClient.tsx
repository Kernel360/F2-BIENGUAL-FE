'use client';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';

import {
  fetchReadingPreview,
  fetchListeningPreview,
} from '@/api/queries/contentsQueries';
import Carousel from '@/components/common/Carousel';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import SentenceComponent, { sentences } from '@/components/SentenceComponent';
import { Button } from '@/components/ui/button';
import {
  ReadingPreviewResponse,
  ListeningPreviewResponse,
} from '@/types/Preview';

import ItemComponentCard from './ItemComponentCard';
import RecommendedList from './RecommendedList';

interface HomePageClientProps {
  initialReadingContents: ReadingPreviewResponse;
  initialListeningContents: ListeningPreviewResponse;
}

export default function HomePageClient({
  initialReadingContents,
  initialListeningContents,
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

  if (readingLoading || listeningLoading) {
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
      />
      <Carousel
        previewDatas={sentences}
        itemComponent={SentenceComponent}
        itemWidth={798}
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
      />
      <RecommendedList />
    </div>
  );
}
