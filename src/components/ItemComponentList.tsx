/* eslint-disable @typescript-eslint/no-explicit-any */

import PointCover from './common/PointCover';
import ListItem from './items/ListItem';
import PreviewScrapButton from './PreviewScrapButton';
import { Badge } from './ui/badge';

export default function ItemComponentList({ data }: { data: any }) {
  return (
    <PointCover data={data}>
      <ListItem
        href={`/learn/${data.contentType.toLowerCase()}/detail/${data.contentId}`}
        coverImageUrl={data.thumbnailUrl}
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
        leftBadge={<Badge>{data.category}</Badge>}
        rightBadge={
          <p className="text-sm text-muted-foreground">{data.hits}회</p>
        }
        title={data.title}
        description={data.preScripts}
      />
    </PointCover>
  );
}
