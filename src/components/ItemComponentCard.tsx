/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock } from 'lucide-react';

import PointCover from './common/PointCover';
import ContentCard from './items/ContentCard';
import PreviewScrapButton from './PreviewScrapButton';
import { Badge } from './ui/badge';

export default function ItemComponentCard({ data }: { data: any }) {
  return (
    <PointCover data={data}>
      <ContentCard
        href={`/learn/${data.contentType.toLowerCase()}/detail/${data.contentId}`}
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
          <Badge className="flex items-center gap-1 bg-gray-200 bg-opacity-70">
            <Clock className="w-3 h-3" color="purple" />
            <span className="text-violet-800">24:00</span>
          </Badge>
        }
        coverImageUrl={data.thumbnailUrl}
        leftBadge={<Badge>{data.category}</Badge>}
        rightBadge={`조회수 ${data.hits}`}
        title={data.title}
        description={data.preScripts}
      />
    </PointCover>
  );
}
