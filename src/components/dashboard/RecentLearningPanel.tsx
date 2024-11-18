'use client';

import Link from 'next/link';

import { PlayCircle, ChevronRight } from 'lucide-react';

import { useOneRecentLearningPreview } from '@/api/hooks/useDashboard';
import {
  LoadingPanel,
  ErrorPanel,
  EmptyPanel,
} from '@/components/common/Panels';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RecentLearningPanel() {
  const { data, isLoading, isError } = useOneRecentLearningPreview();

  if (isLoading) return <LoadingPanel title="최근 학습 강의" />;
  if (isError) return <ErrorPanel title="최근 학습 강의" />;
  if (!data?.data.title)
    return (
      <EmptyPanel title="최근 학습 강의" message="학습 기록이 없습니다." />
    );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-lg font-medium">최근 학습 강의</CardTitle>
        <Link
          href="/dashboard/learning/recent"
          className="text-md text-muted-foreground hover:text-primary"
        >
          학습 목록 <ChevronRight className="inline h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="flex items-center space-x-3">
          <PlayCircle className="h-8 w-8 text-primary" />
          <div>
            <p className="text-md font-medium leading-tight line-clamp-1">
              {data?.data.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {data?.data.learningRate}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
