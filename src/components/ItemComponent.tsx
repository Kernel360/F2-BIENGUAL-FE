// TODO(@smosco): 리팩토링 필요

import { Clock } from 'lucide-react';

import ContentCard from './items/ContentCard';
import PreviewScrapButton from './PreviewScrapButton';
import { Badge } from './ui/badge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ItemComponent({ data }: any) {
  return (
    <ContentCard
      href={
        data.contentType === 'READING'
          ? `/learn/reading/detail/${data.contentId}`
          : `/learn/listening/detail/${data.contentId}`
      }
      topRightButton={
        <PreviewScrapButton
          contentId={data.contentId}
          isScrappedData={data.isScrapped}
          target={
            data.contentType === 'READING'
              ? 'readingPreview'
              : 'listeningPreview'
          }
        />
      }
      bottomRightButton={
        data.contentType !== 'READING' && (
          <Badge className="flex items-center gap-1 bg-gray-200 bg-opacity-70">
            <Clock className="w-3 h-3" color="purple" />
            <span className="text-violet-800">24:00</span>
          </Badge>
        )
      }
      coverImageUrl={data.thumbnailUrl}
      leftBadge={<Badge>{data.category}</Badge>}
      rightBadge={`조회수 ${data.hits}`}
      title={data.title}
      description={data.preScripts}
    />
  );
}
