'use client';

import Link from 'next/link';

import { Trophy, ChevronRight } from 'lucide-react';

import { useFetchCurrentPoints } from '@/api/hooks/useDashboard';
import {
  LoadingPanel,
  ErrorPanel,
  EmptyPanel,
} from '@/components/common/Panels';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CurrentPointsPanel() {
  const { data, isLoading, isError } = useFetchCurrentPoints();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-lg font-medium">내 포인트</CardTitle>
        <Link
          href="/mypage/point"
          className="text-md text-muted-foreground hover:text-primary"
        >
          포인트 내역 <ChevronRight className="inline h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        {isLoading && <LoadingPanel title="내 포인트" className="" />}
        {isError && <ErrorPanel title="내 포인트" className="" />}
        {!isLoading && !isError && data?.data === null && (
          <EmptyPanel
            title="내 포인트"
            message="포인트가 없습니다."
            className="h-[110px]"
          />
        )}
        {!isLoading && !isError && (
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-primary" />
            <div className="text-xl font-bold">
              {data?.data.currentPoint || 0} P
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
