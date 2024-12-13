'use client';

import React from 'react';

import { Book, HelpCircle, Highlighter } from 'lucide-react';

import {
  useFetchMissionStatus,
  useFetchRecentMissionHistory,
} from '@/api/hooks/useMission';
import { useUserTime } from '@/api/hooks/useUserInfo';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import LogInOutButton from '@/components/common/LogInOutButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatDate } from '@/lib/formatDate';

const mockData = {
  totalLearningDays: 30,
  todayMissionStatus: { oneContent: true, bookmark: false, quiz: true },
  recentMissionHistory: {
    data: {
      recentHistories: [
        { date: '2023-06-01', count: 2 },
        { date: '2023-06-02', count: 3 },
        { date: '2023-06-03', count: 1 },
        { date: '2023-06-04', count: 3 },
        { date: '2023-06-05', count: 2 },
      ],
    },
  },
};

export default function LearningTracker() {
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = !!isLoginData?.data;
  const { data: userMembershipDurationData } = useUserTime();
  const { data: todayMissionData } = useFetchMissionStatus();
  const { data: recentMissionHistory } = useFetchRecentMissionHistory();

  // eslint-disable-next-line no-nested-ternary
  const totalLearningDays = isLogin
    ? userMembershipDurationData?.data.createdAt
      ? Math.max(
          Math.floor(
            (new Date().getTime() -
              new Date(userMembershipDurationData.data.createdAt).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
          0,
        )
      : 0
    : mockData.totalLearningDays;

  const todayMissionStatus = isLogin
    ? todayMissionData?.data
    : mockData.todayMissionStatus;

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

  const completedGoals = missionItems.filter((item) => item.status).length;
  const progress = (completedGoals / missionItems.length) * 100;

  const historyData = isLogin
    ? recentMissionHistory?.data.recentHistories
    : mockData.recentMissionHistory.data.recentHistories;

  return (
    <Card className="fixed w-[260px] bg-white my-[60px] mx-5">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">
          Biengual과 함께{' '}
          <span className="text-primary">{totalLearningDays + 1}</span>일
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full mb-4" />
        <div className="font-bold text-center pb-1">
          오늘 {formatDate(String(new Date()), 'YYYY.MM.DD')}의 미션
        </div>
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
              {historyData
                ?.slice()
                .reverse()
                .map((history, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <div className="flex flex-col relative items-center gap-1">
                        <div
                          className={`w-8 rounded-md ${
                            // eslint-disable-next-line no-nested-ternary
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
                        {history.count > 0 && (
                          <div className="absolute top-0 text-center text-xs text-white font-bold pt-1">
                            {history.count}
                          </div>
                        )}
                        <span className="text-xs text-gray-500">
                          {formatDate(history.date, 'MM.DD', -1)}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {formatDate(history.date, 'YYYY.MM.DD', -1)}:
                        {history.count}개 달성
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
            </div>
          </TooltipProvider>
        </div>
      </CardContent>

      {!isLogin && (
        <div className="absolute  inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center rounded-lg">
          <div className="p-4 px-6 bg-white rounded-lg shadow-lg mb-4">
            <p className="text-center text-gray-700 font-medium text-sm mb-2">
              미션 기록을 쌓아가세요!
            </p>
            <LogInOutButton className="shadow-md hover:shadow-lg transition-shadow duration-300" />
          </div>
        </div>
      )}
    </Card>
  );
}
