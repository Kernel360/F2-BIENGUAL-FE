'use client';

import React from 'react';

import { Clock } from 'lucide-react';

import { useRecentLearningPreview } from '@/api/hooks/useDashboard';
import ContentCard from '@/components/items/ContentCard';
import { Badge } from '@/components/ui/badge';

function RecentLearning() {
  const { data: recentLearningPreview, isLoading } = useRecentLearningPreview();

  if (isLoading) {
    return <p>로딩 중입니다.</p>;
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">최근 학습 콘텐츠</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-7 mt-8">
        {recentLearningPreview?.data.recentLearningPreview.map((item) => (
          <ContentCard
            key={item.contentId}
            href={
              item.contentType === 'READING'
                ? `/learn/reading/detail/${item.contentId}`
                : `/learn/listening/detail/${item.contentId}`
            }
            bottomRightButton={
              item.contentType !== 'READING' && (
                <Badge className="flex items-center gap-1 bg-gray-200 bg-opacity-70">
                  <Clock className="w-3 h-3" color="purple" />
                  <span className="text-violet-800">24:00</span>
                </Badge>
              )
            }
            footerContent={
              <div className="space-y-1">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-violet-500 h-1.5 rounded-full"
                    style={{ width: `${item.learningRate}%` }}
                  />
                </div>
                <div className="text-right text-sm text-gray-500">
                  {item.learningRate}%
                </div>
              </div>
            }
            coverImageUrl={item.thumbnailUrl}
            leftBadge={<Badge>{item.category}</Badge>}
            rightBadge={`조회수 ${item.hits}`}
            title={item.title}
            description={item.preScripts}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentLearning;
