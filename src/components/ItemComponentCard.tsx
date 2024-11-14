/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { BookOpen, Clock, Headphones } from 'lucide-react';

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
          data.contentType !== 'READING' && (
            <Badge className="flex items-center gap-1 bg-gray-200 bg-opacity-70">
              <Clock className="w-3 h-3" color="purple" />
              <span className="text-violet-800">{data.duration}</span>
            </Badge>
          )
        }
        coverImageUrl={data.thumbnailUrl}
        leftBadge={
          <div className="flex gap-1">
            <Badge className="">{data.category}</Badge>
            {data.contentType !== 'READING' ? (
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
        rightBadge={`조회수 ${data.hits}`}
        title={data.title}
        description={data.preScripts}
      />
    </PointCover>
  );
}
