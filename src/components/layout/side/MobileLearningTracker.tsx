'use client';

import { useFetchMissionStatus } from '@/api/hooks/useMission';

function MobileLearningTracker() {
  const { data: todayMissionData } = useFetchMissionStatus();
  const todayMissionStatus = todayMissionData?.data;

  const totalLearningDays = 28;

  const missionItems = [
    { status: todayMissionStatus?.oneContent, label: '1개 콘텐츠 학습' },
    { status: todayMissionStatus?.bookmark, label: '형광펜 사용' },
    { status: todayMissionStatus?.quiz, label: '퀴즈 완료' },
  ];

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
              className="h-5 w-5 text-blue-600"
            />
          </div>
        ))}
      </div>

      {/* 최근 5일 미션 진행도 표시 */}
      <h3 className="font-semibold mb-2">최근 5일 진행도</h3>
      <div className="flex justify-between items-end h-20">
        {[3, 2, 1, 0, 1].map((value, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="w-1/6 bg-blue-200 rounded-t"
            style={{ height: `${value * 25}%` }}
          >
            <div className="text-center text-xs mt-1">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobileLearningTracker;
