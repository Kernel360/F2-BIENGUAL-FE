'use client';

import { Clock, Headphones, BookOpen } from 'lucide-react';

import { useFetchScrap } from '@/api/hooks/useScrap';
import EmptyAlert from '@/components/common/EmptyAlert';
import LoadingSpinner from '@/components/common/LoadingSpinner';
// import DifficultyDisplay from '@/components/DifficultyDisplay';
import ContentCard from '@/components/items/ContentCard';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/formatDate';

export default function RecentContent() {
  const { data: allScrapData, isLoading, isError, error } = useFetchScrap();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  if (!allScrapData || allScrapData.data.scrapList.length === 0) {
    return <EmptyAlert alertDescription="스크랩 콘텐츠가 없어요" />;
  }
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {allScrapData.data.scrapList.map((item) => (
          <ContentCard
            key={item.contentId}
            href={`/learn/${item.contentType.toLowerCase()}/detail/${item.contentId}`}
            // TODO(@godhyzzang) : calculatedLevel 추가 필요

            // bottomLeftButton={
            //   <DifficultyDisplay calculatedLevel={item.calculatedLevel} />
            // }
            bottomRightButton={
              item.contentType !== 'READING' && (
                <Badge className="flex items-center gap-1 bg-gray-200 bg-opacity-70">
                  <Clock className="w-3 h-3" color="purple" />
                  <span className="text-violet-800">{item.duration}</span>
                </Badge>
              )
            }
            coverImageUrl={item.thumbnailUrl}
            leftBadge={
              <div className="flex gap-1">
                <Badge className="">{item.category}</Badge>
                {item.contentType !== 'READING' ? (
                  <div className="flex justify-center items-center bg-gradient-to-l from-red-500 to-orange-500 rounded-sm shadow-sm">
                    <Headphones className="p-1 h-6 w-6 text-white" />
                  </div>
                ) : (
                  <div className="flex justify-center items-center bg-gradient-to-l from-blue-500 to-sky-500 rounded-sm shadow-sm  ">
                    <BookOpen className="p-1 h-6 w-6  text-white" />
                  </div>
                )}
              </div>
            }
            rightBadge={
              <span className="text-sm text-muted-foreground">
                {formatDate(item.createdAt, 'YYYY.MM.DD')} 저장
              </span>
            }
            title={item.title}
            description={item.preScripts}
          />
        ))}
      </div>
    </div>
  );
}
