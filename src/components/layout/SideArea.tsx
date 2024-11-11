'use client';

import React, { useEffect, useState } from 'react';

import { useUserTime } from '@/api/hooks/useUserInfo';
import { calculateDaysBetweenDates } from '@/lib/calculateDaysBetweenDates';

import LearningTracker from './side/LearningTracker';

export default function SideArea() {
  const mockHistory = [
    { date: '2023.06.15', completedMissions: 3 },
    { date: '2023.06.14', completedMissions: 2 },
    { date: '2023.06.13', completedMissions: 1 },
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
    <div className="hidden md:block h-fit w-[260px] ml-[50px] py-[60px]">
      {/* TODO(@smosco): 학습 트래커 동그라미로 만들것 */}
      <LearningTracker
        totalLearningDays={totalLearningDays}
        history={mockHistory}
      />
    </div>
  );
}
