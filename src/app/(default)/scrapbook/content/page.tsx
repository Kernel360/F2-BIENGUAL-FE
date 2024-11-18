'use client';

import { Clock } from 'lucide-react';

import { useFetchScrap } from '@/api/hooks/useScrap';
import EmptyAlert from '@/components/common/EmptyAlert';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ContentCard from '@/components/items/ContentCard';
import { Badge } from '@/components/ui/badge';
import { formatFullDateWithPad } from '@/lib/formatDate';

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
      <h1 className="text-2xl font-bold mb-6">최근 스크랩한 콘텐츠</h1>
      {allScrapData.data.scrapList.map((item) => (
        // TODO@godhyzzang : 스크랩에도 카테고리 배지 넣는게 좋을 듯
        <ContentCard
          key={item.scrapId}
          href={
            item.contentType === 'READING'
              ? `/learn/reading/detail/${item.contentId}`
              : `/learn/listening/detail/${item.contentId}`
          }
          leftBadge={
            // TODO@godhyzzang : 리딩, 리스닝 다르면 글자 대신 그림 아이콘을 바꿔주는게 좋을듯
            <div>
              <Badge
                variant="secondary"
                className={`${
                  item.contentType === 'READING'
                    ? 'bg-green-300'
                    : 'bg-blue-200'
                } text-gray-800`}
              >
                {item.contentType}
                {/* TODO@godhyzzang : 일반 previewcomponent처럼 카테고리, 리스닝리딩 디자인 통일 필요  */}
              </Badge>
            </div>
          }
          rightBadge={
            <span className="text-sm text-muted-foreground">
              {formatFullDateWithPad(item.createdAt)} 저장
            </span>
          }
          bottomRightButton={
            item.contentType !== 'READING' && (
              <Badge className="flex items-center gap-1 bg-gray-200 bg-opacity-70">
                <Clock className="w-3 h-3" color="purple" />
                {/* <span className="text-violet-800">{item.duration}</span> // TODO(@godhyzzang) :  scrap도 duration추가 필요 */}
              </Badge>
            )
          }
          coverImageUrl={item.thumbnailUrl}
          title={item.title}
          description={item.preScripts}
        />
      ))}
    </div>
  );
}
