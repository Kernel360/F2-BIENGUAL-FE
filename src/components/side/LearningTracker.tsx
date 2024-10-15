/* eslint-disable react/button-has-type */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DailyGoal {
  id: string;
  icon: React.ReactNode;
  label: string;
  completed: boolean;
}

interface DailyHistory {
  date: string;
  completedMissions: number;
}

interface LearningTrackerProps {
  totalLearningDays: number;
  dailyGoals: DailyGoal[];
  history: DailyHistory[];
}

export default function LearningTracker({
  totalLearningDays,
  dailyGoals,
  history,
}: LearningTrackerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const completedGoals = dailyGoals.filter((goal) => goal.completed).length;
  const progress = (completedGoals / dailyGoals.length) * 100;

  const renderHistoryCircle = (day: DailyHistory, index: number) => {
    const isSelected = index === selectedIndex;
    const bgColor = day.completedMissions > 0 ? 'bg-green-500' : 'bg-gray-300';
    const borderColor = isSelected ? 'border-blue-500' : 'border-transparent';

    return (
      <button
        key={day.date}
        className={`w-8 h-8 rounded-full ${bgColor} ${borderColor} border-2 flex items-center justify-center text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-300`}
        onClick={() => setSelectedIndex(index)}
        aria-label={`${day.date}: ${day.completedMissions} missions completed`}
      >
        {day.completedMissions > 0 ? day.completedMissions : ''}
      </button>
    );
  };

  return (
    <Card className="w-full bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">
          누적 학습일: {totalLearningDays}일
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progress} className="w-full" />
          <div className="grid grid-cols-2 gap-2">
            {dailyGoals.map((goal) => (
              <div
                key={goal.id}
                className={`flex items-center p-2 rounded-md transition-colors ${
                  goal.completed
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                }`}
              >
                {goal.icon}
                <span className="ml-2 text-sm">{goal.label}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            {history.map((day, index) => renderHistoryCircle(day, index))}
          </div>
          <div className="text-sm text-center">
            {history[selectedIndex].date}:{' '}
            {history[selectedIndex].completedMissions} 미션 완료
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
