/* eslint-disable no-nested-ternary */

'use client';

import { CircleCheckBig, Book, Highlighter, HelpCircle } from 'lucide-react';

import {
  useFetchMissionStatus,
  useFetchRecentMissionHistory,
} from '@/api/hooks/useMission';
import { useUserTime } from '@/api/hooks/useUserInfo';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import { formatDate } from '@/lib/formatDate';

const mockData = {
  totalLearningDays: 30,
  todayMissionStatus: { oneContent: true, bookmark: false, quiz: true },
  recentMissionHistory: {
    data: {
      recentHistories: [
        { date: '2023-11-28', count: 2 },
        { date: '2023-11-27', count: 3 },
        { date: '2023-11-26', count: 1 },
        { date: '2023-11-25', count: 2 },
        { date: '2023-11-24', count: 3 },
      ],
    },
  },
};

function MobileLearningTracker() {
  const { data: userMembershipDurationData } = useUserTime();
  const { data: todayMissionData } = useFetchMissionStatus();
  const { data: recentMissionHistory } = useFetchRecentMissionHistory();
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = !!isLoginData?.data;

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

  const recentHistories = isLogin
    ? recentMissionHistory?.data.recentHistories
    : mockData.recentMissionHistory.data.recentHistories;

  const missionItems = [
    { status: todayMissionStatus?.oneContent, label: '1개 콘텐츠 학습' },
    { status: todayMissionStatus?.bookmark, label: '형광펜 사용' },
    { status: todayMissionStatus?.quiz, label: '퀴즈 완료' },
  ];

  return (
    <div className="relative space-y-6">
      <h2 className="text-2xl font-bold text-center">학습 트래커</h2>
      <div className="text-center">
        <span className="text-4xl font-bold">{totalLearningDays + 1}</span>
        <span className="text-sm text-gray-500 ml-2">누적 학습일</span>
      </div>

      {/* 오늘의 미션 상태 표시 */}
      <div className="space-y-4">
        <h3 className="font-medium text-center text-gray-500">
          오늘 {formatDate(String(new Date()), 'YYYY.MM.DD')}의 미션
        </h3>

        {missionItems.map((item, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={`flex items-center justify-between p-2 rounded-md transition-colors ${
              item.status
                ? 'bg-violet-100 text-violet-900'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            <span className="mx-2 text-sm font-medium flex gap-3 justify-center items-center">
              {item.label === '1개 콘텐츠 학습' && (
                <>
                  <Book className="w-6 h-6 stroke-1" />
                  콘텐츠 1개 학습
                </>
              )}
              {item.label === '형광펜 사용' && (
                <>
                  <Highlighter className="w-6 h-6 stroke-1" />
                  문장 북마크 1개
                </>
              )}
              {item.label === '퀴즈 완료' && (
                <>
                  <HelpCircle className="w-6 h-6 stroke-1" />
                  퀴즈 1문제 완료
                </>
              )}
            </span>
            <div
              className={`${item.status ? 'text-violet-500' : 'text-gray-400'}`}
            >
              {item.status && <CircleCheckBig stroke="#6622EC" />}
            </div>
          </div>
        ))}
      </div>

      {/* 최근 5일 미션 달성 표시 */}
      <h3 className="font-semibold mb-2">최근 5일 미션 달성</h3>
      <div className="flex justify-between items-end h-25">
        {recentHistories
          ?.slice()
          .reverse()
          .map((history, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="flex flex-col items-center w-1/6">
              <div
                className={`w-full rounded-t transition-all duration-300 ${
                  history.count > 0 && history.count === 1
                    ? 'bg-violet-200'
                    : history.count === 2
                      ? 'bg-violet-400'
                      : 'bg-violet-600'
                }`}
                style={{
                  height: `${history.count * 30}px`,
                }}
              >
                {history.count > 0 && (
                  <div className="text-center text-xs text-white font-bold pt-1">
                    {history.count}
                  </div>
                )}
              </div>
              <div className="text-center text-[12px] text-gray-700 mt-1">
                {formatDate(history.date, 'MM.DD', -1)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MobileLearningTracker;
