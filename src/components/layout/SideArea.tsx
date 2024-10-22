'use client';

import React, { useEffect, useState } from 'react';

import { Book, Bookmark, HelpCircle, Highlighter } from 'lucide-react';

import { useUserTime } from '@/api/hooks/useUserInfo';
import { calculateDaysBetweenDates } from '@/lib/calculateDaysBetweenDates';

import LearningTracker from '../side/LearningTracker';

export default function SideArea() {
  const mockDailyGoals = [
    {
      id: 'study',
      icon: <Book className="h-4 w-4" />,
      label: '10분 학습',
      completed: false,
    },
    {
      id: 'memo',
      icon: <Bookmark className="h-4 w-4" />,
      label: '메모 1개',
      completed: false,
    },
    {
      id: 'highlight',
      icon: <Highlighter className="h-4 w-4" />,
      label: '형광펜 1개',
      completed: false,
    },
    {
      id: 'quiz',
      icon: <HelpCircle className="h-4 w-4" />,
      label: '퀴즈 1개',
      completed: true,
    },
  ];

  const mockHistory = [
    { date: '2023.06.15', completedMissions: 3 },
    { date: '2023.06.14', completedMissions: 2 },
    { date: '2023.06.13', completedMissions: 4 },
    { date: '2023.06.12', completedMissions: 0 },
    { date: '2023.06.11', completedMissions: 1 },
  ];

  // TODO(@godhyzzang) : 현재 가입일 데이터 수정 필요
  const { data: userMembershipDurationData } = useUserTime();

  const [totalLearningDays, setTotalLearningDays] = useState<number>(0);

  useEffect(() => {
    if (userMembershipDurationData?.data.createdAt) {
      const today = new Date();
      const createdAt = new Date(userMembershipDurationData.data.createdAt);
      const learningDays = calculateDaysBetweenDates(today, createdAt);
      setTotalLearningDays(learningDays);
    }
  }, [userMembershipDurationData?.data.createdAt]);

  return (
    <div className="h-fit w-[260px] ml-[50px] py-[60px]">
      <LearningTracker
        totalLearningDays={totalLearningDays}
        dailyGoals={mockDailyGoals}
        history={mockHistory}
      />
    </div>
  );
}
