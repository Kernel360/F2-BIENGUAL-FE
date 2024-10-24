'use client';

import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import { useReadingPreview, useListeningPreview } from '@/api/hooks/usePreview';
import Carousel from '@/components/common/Carousel';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ContentCard from '@/components/items/ContentCard';
import { Button } from '@/components/ui/button';

// todo: 임시코드 바꾸기
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ItemComponent({ data }: any) {
  return (
    <ContentCard
      href={
        data.contentType === 'READING'
          ? `/learn/reading/detail/${data.contentId}`
          : `/learn/listening/detail/${data.contentId}`
      }
      coverImageUrl={data.thumbnailUrl}
      category={data.category}
      title={data.title}
      description={data.preScripts}
    />
  );
}

export default function HomePage() {
  const { data: readingList, isLoading: readingLoading } = useReadingPreview();
  const { data: listeningList, isLoading: listeningLoading } =
    useListeningPreview();

  if (readingLoading || listeningLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-[830px] flex flex-col gap-12">
      {/* 인기 리스닝 컨텐츠 캐러셀 */}
      <Carousel
        previewDatas={readingList?.data.readingPreview || []}
        header={
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-bold">인기 리딩 컨텐츠</h3>
            <Link href="/learn/reading">
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
      {/* 인기 리딩 컨텐츠 캐러셀 */}
      <Carousel
        previewDatas={listeningList?.data.listeningPreview || []}
        header={
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-bold">인기 리스닝 컨텐츠</h3>
            <Link href="/learn/listening">
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
