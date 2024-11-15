import * as React from 'react';
import { useEffect } from 'react';

import { ko } from 'date-fns/locale';

import { useFetchMissionCalendar } from '@/api/hooks/useDashboard';
import { Calendar as CustomCalendar } from '@/components/common/CustomShadcnCalendar';

const correctDate = (date: Date) => {
  const formattedDate = new Date(date);
  formattedDate.setDate(formattedDate.getDate() + 1);
  const formattedDatetwo = formattedDate.toISOString().split('T')[0];
  return formattedDatetwo;
};

export default function DashboardCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date(),
  );
  const [currentMonth, setCurrentMonth] = React.useState<string>(
    new Date().toISOString().split('T')[0].substring(0, 7), // TODO(@godhyzzang) : 전반적으로 date객체 사용하면 year, month,day에 +1이 필요함..근데 잘 안 됨
  );

  const { data: missionCalendarData, refetch } =
    useFetchMissionCalendar(currentMonth);

  useEffect(() => {
    if (selectedDate) {
      const newMonth = selectedDate.toISOString().split('T')[0].substring(0, 7);
      if (newMonth !== currentMonth) {
        setCurrentMonth(newMonth);
        refetch(); // month 이동하면 쿼리 다시 요청
      }
    }
  }, [selectedDate, currentMonth, refetch]);

  const handleMonthChange = (date: Date) => {
    const newMonth = date.toISOString().split('T')[0].substring(0, 7);
    setCurrentMonth(newMonth);
  };

  const completedStyle = {
    // tailwind문법이 modifierStyles에 호환되지 않아서 일반 css문법으로 변경
    //  zero: 'bg-gray-500 text-white rounded-full',
    // one: 'bg-green-500 text-white rounded-full',
    // two: 'bg-blue-500 text-white rounded-full',
    // three: 'bg-purple-500 text-white rounded-full',
    zero: {
      backgroundColor: '#d1d5db', // bg-gray-300
      color: 'white',
      borderRadius: '50%',
    },
    one: {
      backgroundColor: '#86efac', // bg-green-300
      color: 'white',
      borderRadius: '50%',
    },
    two: {
      backgroundColor: '#93c5fd', // bg-blue-300
      color: 'white',
      borderRadius: '50%',
    },
    three: {
      backgroundColor: '#8b5cf6', // bg-violet-500
      color: 'white',
      borderRadius: '50%',
    },
  };

  const getMissionStatusCount = (date: string) => {
    const mission = missionCalendarData?.data.monthlyHistoryList.find(
      (item) => item.date === date,
    );
    return mission ? mission.missionStatus.count : undefined;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold">✅ 미션 히스토리</div>
      <CustomCalendar
        classNames={{
          day_selected:
            'bg-purple-200 ring-2 ring-purple-500 ring-offset-2 ring-offset-white', // 날짜 눌렀을 때
        }}
        locale={ko}
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        onMonthChange={handleMonthChange}
        className="rounded-md"
        modifiers={{
          zero: (date: Date) => {
            const correctedDate = correctDate(date);

            return getMissionStatusCount(correctedDate) === 0;
          },
          one: (date: Date) => {
            const correctedDate = correctDate(date);
            return getMissionStatusCount(correctedDate) === 1;
          },
          two: (date: Date) => {
            const correctedDate = correctDate(date);

            return getMissionStatusCount(correctedDate) === 2;
          },
          three: (date: Date) => {
            const correctedDate = correctDate(date);

            return getMissionStatusCount(correctedDate) === 3;
          },
        }}
        modifiersStyles={{
          zero: completedStyle.zero,
          one: completedStyle.one,
          two: completedStyle.two,
          three: completedStyle.three,
        }}
      />

      <div className="flex flex-col rounded-sm p-3 border w-full h-full">
        <div className="text-lg font-bold">🔍 어떤 미션을 성공했을까?</div>
        <div>
          {missionCalendarData?.data.monthlyHistoryList.map(
            ({ date, missionStatus }) =>
              date === (selectedDate ? correctDate(selectedDate) : '') ? (
                <div key={date} className="flex flex-col mb-2">
                  <span className="font-bold">{date}</span>
                  <span>
                    One Content: {missionStatus.oneContent ? 'Yes' : 'No'}
                  </span>
                  <span>Bookmark: {missionStatus.bookmark ? 'Yes' : 'No'}</span>
                  <span>Quiz: {missionStatus.quiz ? 'Yes' : 'No'}</span>
                  <span>Count: {missionStatus.count}</span>
                </div>
              ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
