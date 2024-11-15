/* eslint-disable no-nested-ternary */
import React from 'react';

import { Book, HelpCircle, Highlighter } from 'lucide-react';

import {
  useFetchMissionStatus,
  useFetchRecentMissionHistory,
} from '@/api/hooks/useMission';
import { useUserTime } from '@/api/hooks/useUserInfo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function LearningTracker() {
  const { data: userMembershipDurationData } = useUserTime();
  const { data: todayMissionData } = useFetchMissionStatus();
  const { data: recentMissionHistory } = useFetchRecentMissionHistory();

  const totalLearningDays = userMembershipDurationData?.data.createdAt
    ? Math.max(
        Math.floor(
          (new Date().getTime() -
            new Date(userMembershipDurationData.data.createdAt).getTime()) /
            (1000 * 60 * 60 * 24),
        ),
        0,
      )
    : null;

  const todayMissionStatus = todayMissionData?.data;

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

  const mockHistory = [
    { date: '2024.11.07', completedMissions: 3 },
    { date: '2024.11.08', completedMissions: 2 },
    { date: '2024.11.09', completedMissions: 1 },
    { date: '2024.11.10', completedMissions: 0 },
    { date: '2024.11.11', completedMissions: 1 },
  ];

  // 진행도 계산
  const completedGoals = missionItems.filter((item) => item.status).length;
  const progress = (completedGoals / missionItems.length) * 100;

  // 날짜 포맷팅
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <Card className="fixed w-[260px] bg-white my-[60px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">
          누적 학습일: {totalLearningDays}일
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full mb-4" />
        <div className="space-y-2">
          {missionItems.map((item, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`flex items-center p-2 rounded-md transition-colors ${
                item.status
                  ? 'bg-violet-100 text-violet-900'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              <div
                className={`${item.status ? 'text-violet-500' : 'text-gray-400'}`}
              >
                {item.icon}
              </div>
              <span className="ml-2 text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="text-sm font-medium text-gray-500 mb-2">
            최근 5일 미션 달성
          </div>
          <TooltipProvider>
            <div className="flex items-end justify-between h-20 px-2">
              {recentMissionHistory?.data.recentHistories.map(
                (history, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className={`w-8 rounded-md ${
                            history.count > 0 && history.count === 1
                              ? 'bg-violet-200'
                              : history.count === 2
                                ? 'bg-violet-400'
                                : 'bg-violet-600'
                          }`}
                          style={{
                            height: `${history.count * 20}px`,
                          }}
                        />
                        <span className="text-xs text-gray-500">
                          {formatDate(history.date)}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {formatDate(history.date)}: {history.count}개 달성
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ),
              )}
            </div>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
