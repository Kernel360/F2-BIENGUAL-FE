import * as React from 'react';
import { useEffect } from 'react';

import { ko } from 'date-fns/locale';

import { useFetchMissionCalendar } from '@/api/hooks/useDashboard';
import { Calendar as CustomCalendar } from '@/components/common/CustomShadcnCalendar';
import { formatFullDateWithPad } from '@/lib/formatDate';

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
      backgroundColor: 'rgb(221 214 254)', // bg-violet-200
      color: 'white',
      borderRadius: '50%',
    },
    two: {
      backgroundColor: 'rgb(167 139 250)', // bg-violet-300
      color: 'white',
      borderRadius: '50%',
    },
    three: {
      backgroundColor: 'rgb(124 58 237)', // bg-violet-500
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

  console.log(selectedDate);

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold">✅ 미션 히스토리</div>
      <CustomCalendar
        classNames={{
          day_selected:
            'bg-white-200 ring-2 ring-purple-500 ring-offset-2 ring-offset-white', // 날짜 눌렀을 때
        }}
        locale={ko}
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        onMonthChange={handleMonthChange}
        className="rounded-md"
        modifiers={{
          // n일의 미션 기록은 n+1일 새벽4시에 기록되므로 날짜 조정 필요
          zero: (date: Date) => {
            const correctedDate = correctDate(
              new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
            );

            return getMissionStatusCount(correctedDate) === 0;
          },
          one: (date: Date) => {
            const correctedDate = correctDate(
              new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
            );
            return getMissionStatusCount(correctedDate) === 1;
          },
          two: (date: Date) => {
            const correctedDate = correctDate(
              new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
            );

            return getMissionStatusCount(correctedDate) === 2;
          },
          three: (date: Date) => {
            const correctedDate = correctDate(
              new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
            );
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
            ({ date, missionStatus }) => {
              const newDate = new Date(
                new Date(date).getFullYear(),
                new Date(date).getMonth(),
                new Date(date).getDate() - 1,
              );
              const newNewDate = formatFullDateWithPad(String(newDate), '-');
              const newSelectedDate = formatFullDateWithPad(
                String(selectedDate),
                '-',
              );
              return newNewDate === (newSelectedDate || '') ? (
                <div key={date} className="flex flex-col mb-2">
                  <span className="font-bold">{newNewDate}</span>
                  <span>
                    One Content: {missionStatus.oneContent ? 'Yes' : 'No'}
                  </span>
                  <span>Bookmark: {missionStatus.bookmark ? 'Yes' : 'No'}</span>
                  <span>Quiz: {missionStatus.quiz ? 'Yes' : 'No'}</span>
                  <span>Count: {missionStatus.count}</span>
                </div>
              ) : null;
            },
          )}
        </div>
      </div>
    </div>
  );
}
