'use client';

import Calendar from '@/components/common/DashboardCalendar';
import CategoryDistributionPanel from '@/components/dashboard/CategoryDistributionPanel';
import CurrentPointsPanel from '@/components/dashboard/CurrentPointsPanel';
import QuizAccuracyPanel from '@/components/dashboard/QuizAccuracyPanel';
import RecentLearningPanel from '@/components/dashboard/RecentLearningPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <RecentLearningPanel />
        <CurrentPointsPanel />
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-medium">학습 캘린더</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <p className="text-center text-sm">
              🥹캘린더에는 오늘 데이터는 반영되지 않아요
            </p>
            <Calendar />
          </CardContent>
        </Card>
        <CategoryDistributionPanel />
        <QuizAccuracyPanel />
      </div>
    </div>
  );
}
