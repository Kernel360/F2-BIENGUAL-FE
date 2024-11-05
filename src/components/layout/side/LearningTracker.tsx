/* eslint-disable react/button-has-type */

import React, { useState } from 'react';

import { Book, HelpCircle, Highlighter } from 'lucide-react';

import { useFetchMissionStatus } from '@/api/hooks/useMission';
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
  const { data: todayMissionData } = useFetchMissionStatus();
  const todayMissionStatus = todayMissionData?.data;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const completedGoals = dailyGoals.filter((goal) => goal.completed).length;
  const progress = (completedGoals / dailyGoals.length) * 100;

  const missionItems = [
    {
      status: todayMissionStatus?.oneContent,
      label: '10분 학습',
      icon: <Book className="h-4 w-4" />,
    },
    {
      status: todayMissionStatus?.bookmark,
      label: '형광펜 1개',
      icon: <Highlighter className="h-4 w-4" />,
    },
    {
      status: todayMissionStatus?.quiz,
      label: '퀴즈 1개',
      icon: <HelpCircle className="h-4 w-4" />,
    },
  ];

  // 미션 완료 히스토리
  // TODO(@godhyzzang) : component로 분리 필요
  const renderHistoryCircle = (day: DailyHistory, index: number) => {
    const isSelected = index === selectedIndex;

    const dateBackgroundColorArray = [
      'bg-gray-300',
      'bg-green-300',
      'bg-blue-300',
      'bg-violet-500',
    ];
    const dateBackgroundColor = dateBackgroundColorArray[day.completedMissions];

    const borderColor = isSelected ? 'border-violet-700' : 'border-transparent';

    return (
      <button
        key={day.date}
        className={`w-8 h-8 rounded-full ${dateBackgroundColor} ${borderColor} border-2 flex items-center justify-center text-white font-bold focus:outline-none`}
        onClick={() => setSelectedIndex(index)}
        aria-label={`${day.date}: ${day.completedMissions} missions completed`}
      >
        {day.completedMissions > 0 ? day.completedMissions : ''}
      </button>
    );
  };

  // 대시보드 캘린더와 연결?
  return (
    <Card className=" fixed w-[260px] bg-white my-[60px] ">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">
          누적 학습일: {totalLearningDays}일
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progress} className="w-full" />
          <div className="grid grid-cols-1 gap-2">
            {todayMissionStatus &&
              missionItems.map((item, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    item.status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-300'
                  }`}
                >
                  <div className="ml-2 text-sm flex justify-center">
                    {item.icon} <span>{item.label}</span>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            {history.map((day, index) => renderHistoryCircle(day, index))}
          </div>
          <div className="text-sm text-center">
            {history[selectedIndex].date}일 미션{' '}
            {history[selectedIndex].completedMissions}개 완료
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
