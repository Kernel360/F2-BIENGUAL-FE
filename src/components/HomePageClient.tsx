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
import ItemComponent from '@/components/ItemComponent';
import { Button } from '@/components/ui/button';
import {
  ReadingPreviewResponse,
  ListeningPreviewResponse,
} from '@/types/Preview';

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
    <div className="w-[830px] flex flex-col gap-12">
      {/* 인기 리딩 컨텐츠 캐러셀 */}
      <Carousel
        previewDatas={readingList?.data.readingPreview || []}
        header={
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-bold">인기 리딩 컨텐츠</h3>
            <Link href="/learn/reading?page=1">
              <Button variant="ghost">
                더보기
                <ChevronRight size={24} color="#6B6B6B" />
              </Button>
            </Link>
          </div>
        }
        itemComponent={ItemComponent}
        itemWidth={280}
        itemsPerPage={3}
      />
      {/* 인기 리스닝 컨텐츠 캐러셀 */}
      <Carousel
        previewDatas={listeningList?.data.listeningPreview || []}
        header={
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-bold">인기 리스닝 컨텐츠</h3>
            <Link href="/learn/listening?page=1">
              <Button variant="ghost">
                더보기
                <ChevronRight size={24} color="#6B6B6B" />
              </Button>
            </Link>
          </div>
        }
        itemComponent={ItemComponent}
        itemWidth={280}
        itemsPerPage={3}
      />
    </div>
  );
}
