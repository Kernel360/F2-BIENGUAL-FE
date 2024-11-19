'use client';

import CategoryDistributionPanel from '@/components/dashboard/CategoryDistributionPanel';
import CurrentPointsPanel from '@/components/dashboard/CurrentPointsPanel';
import MissionCalendar from '@/components/dashboard/MissionCalendar';
import QuizAccuracyPanel from '@/components/dashboard/QuizAccuracyPanel';
import RecentLearningPanel from '@/components/dashboard/RecentLearningPanel';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <RecentLearningPanel />
        <CurrentPointsPanel />
        <MissionCalendar />
        <CategoryDistributionPanel />
        <QuizAccuracyPanel />
      </div>
    </div>
  );
}
