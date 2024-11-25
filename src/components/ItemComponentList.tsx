/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { BookOpen } from 'lucide-react';

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
          />
        }
        leftBadge={
          <div className="flex gap-1">
            <Badge>{data.category}</Badge>
            {data.contentType === 'READING' && (
              <div className="bg-gradientpl from-blue-500 to-sky-500 p-auto rounded-sm shadow-sm flex justify-center items-center  ">
                <BookOpen className="p-1 h-6 w-6  text-white" />
              </div>
            )}
          </div>
        }
        rightBadge={
          <p className="text-sm text-muted-foreground">{data.hits}회</p>
        }
        title={data.title}
        description={data.preScripts}
      />
    </PointCover>
  );
}
