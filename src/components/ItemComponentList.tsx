/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { BookOpen } from 'lucide-react';

import DifficultyDisplay from '@/components/DifficultyDisplay';

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
        bottomRightButton={
          <DifficultyDisplay calculatedLevel={data.calculatedLevel} />
        }
        leftBadge={
          <div className="flex gap-1">
            <Badge>{data.category}</Badge>

            {data.contentType === 'READING' && (
              <div className="flex justify-center items-center bg-gradient-to-l from-blue-500 to-sky-500 rounded-sm shadow-sm  ">
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
