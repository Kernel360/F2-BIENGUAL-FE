/* eslint-disable no-nested-ternary */

'use client';

import { useFetchMissionStatus } from '@/api/hooks/useMission';
import { useUserTime } from '@/api/hooks/useUserInfo';

function MobileLearningTracker() {
  const { data: userMembershipDurationData } = useUserTime();
  const { data: todayMissionData } = useFetchMissionStatus();
  const todayMissionStatus = todayMissionData?.data;

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

  const missionItems = [
    { status: todayMissionStatus?.oneContent, label: '1개 콘텐츠 학습' },
    { status: todayMissionStatus?.bookmark, label: '형광펜 사용' },
    { status: todayMissionStatus?.quiz, label: '퀴즈 완료' },
  ];

  const mockHistory = [
    { date: '2024.11.07', completedMissions: 3 },
    { date: '2024.11.08', completedMissions: 2 },
    { date: '2024.11.09', completedMissions: 1 },
    { date: '2024.11.10', completedMissions: 0 },
    { date: '2024.11.11', completedMissions: 1 },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">학습 트래커</h2>
      <div className="text-center">
        <span className="text-4xl font-bold">{totalLearningDays}</span>
        <span className="text-sm text-gray-500 ml-2">누적 학습일</span>
      </div>

      {/* 오늘의 미션 상태 표시 */}
      <div className="space-y-4">
        <h3 className="font-semibold">오늘의 미션</h3>
        {missionItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="flex items-center justify-between">
            <span>{item.label}</span>
            <input
              type="checkbox"
              checked={!!item.status}
              readOnly
              className="h-5 w-5 text-violet-600"
            />
          </div>
        ))}
      </div>

      {/* 최근 5일 미션 달성 표시 */}
      <h3 className="font-semibold mb-2">최근 5일 미션 달성</h3>
      <div className="flex justify-between items-end h-25">
        {mockHistory.map((day, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="flex flex-col items-center w-1/6">
            <div
              className={`w-full rounded-t transition-all duration-300 ${
                day.completedMissions > 0 && day.completedMissions === 1
                  ? 'bg-violet-200'
                  : day.completedMissions === 2
                    ? 'bg-violet-400'
                    : 'bg-violet-600'
              }`}
              style={{
                height: `${day.completedMissions * 30}px`,
              }}
            >
              {day.completedMissions > 0 && (
                <div className="text-center text-xs text-white font-bold pt-1">
                  {day.completedMissions}
                </div>
              )}
            </div>
            <div className="text-center text-sm text-gray-700 mt-1">
              {formatDate(day.date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobileLearningTracker;
