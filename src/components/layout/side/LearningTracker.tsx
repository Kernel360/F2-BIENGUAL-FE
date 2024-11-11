import React, { useState } from 'react';

import { Book, HelpCircle, Highlighter } from 'lucide-react';

import { useFetchMissionStatus } from '@/api/hooks/useMission';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DailyHistory {
  date: string;
  completedMissions: number;
}

interface LearningTrackerProps {
  totalLearningDays: number;
  history: DailyHistory[];
}

export default function LearningTracker({
  totalLearningDays,
  history,
}: LearningTrackerProps) {
  const { data: todayMissionData } = useFetchMissionStatus();
  const todayMissionStatus = todayMissionData?.data;

  const [selectedIndex, setSelectedIndex] = useState(0);

  // 미션 목록 정의
  const missionItems = [
    {
      status: todayMissionStatus?.oneContent,
      label: '1개 콘텐츠 학습',
      icon: <Book className="h-4 w-4" />,
    },
    {
      status: todayMissionStatus?.bookmark,
      label: '형광펜 사용',
      icon: <Highlighter className="h-4 w-4" />,
    },
    {
      status: todayMissionStatus?.quiz,
      label: '퀴즈 완료',
      icon: <HelpCircle className="h-4 w-4" />,
    },
  ];

  // 진행도 계산
  const completedGoals = missionItems.filter((item) => item.status).length;
  const progress = (completedGoals / missionItems.length) * 100;

  return (
    <Card className="fixed w-[260px] bg-white my-[60px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">
          누적 학습일: {totalLearningDays}일
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full mb-4" />
        {missionItems.map((item, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={`flex items-center p-2 rounded-md ${item.status ? 'bg-green-400' : 'bg-gray-300'}`}
          >
            {item.icon}
            <span className="ml-2 text-sm">{item.label}</span>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          {history.map((day, index) => (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`w-8 h-8 rounded-full ${day.completedMissions > 0 ? 'bg-green-500' : 'bg-gray-300'}`}
              onClick={() => setSelectedIndex(index)}
              aria-label={`${day.date}: ${day.completedMissions} 미션 완료`}
            >
              {day.completedMissions || ''}
            </button>
          ))}
        </div>
        <div className="text-sm text-center mt-4">
          {history[selectedIndex].date}일 미션{' '}
          {history[selectedIndex].completedMissions}개 완료
        </div>
      </CardContent>
    </Card>
  );
}
