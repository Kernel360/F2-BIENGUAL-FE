/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useEffect, useState } from 'react';

import { ko } from 'date-fns/locale';
import { Book, Highlighter, HelpCircle } from 'lucide-react';

import { useFetchMissionCalendar } from '@/api/hooks/useDashboard';
import { Calendar as CustomCalendar } from '@/components/common/CustomShadcnCalendar';
import {
  LoadingPanel,
  ErrorPanel,
  // EmptyPanel,
} from '@/components/common/Panels';
import StatusBox from '@/components/StatusBox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, isToday } from '@/lib/formatDate';

const correctDate = (date: Date) => {
  const formattedDate = new Date(date);
  formattedDate.setDate(formattedDate.getDate() + 1);
  return formattedDate.toISOString().split('T')[0];
};

export default function MissionCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [currentMonth, setCurrentMonth] = useState<string>(
    formatDate(new Date(), 'YYYY-MM'),
  );

  const {
    data: missionCalendarData,
    isLoading,
    isError,
    refetch,
  } = useFetchMissionCalendar(currentMonth);

  // 월 변경 시 데이터 다시 가져오기
  useEffect(() => {
    if (currentMonth) {
      refetch(); // 현재 월이 변경되었을 때만 쿼리 다시 요청
    }
  }, [currentMonth]);

  const handleMonthChange = (newMonth: Date) => {
    const monthString = formatDate(newMonth, 'YYYY-MM');
    if (monthString !== currentMonth) {
      setCurrentMonth(monthString);
    }
  };

  const completedStyle = {
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

  const selectedDateString = formatDate(String(selectedDate), 'YYYY-MM-DD');

  const mission = missionCalendarData?.data.monthlyHistoryList.find(
    ({ date }) => {
      const newDate = new Date(
        new Date(date).getFullYear(),
        new Date(date).getMonth(),
        new Date(date).getDate() - 1,
      );
      const formattedDate = formatDate(String(newDate), 'YYYY-MM-DD');
      return formattedDate === selectedDateString;
    },
  );

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-medium">학습 미션 캘린더</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0 flex flex-col items-center">
        {isLoading && (
          <LoadingPanel title="학습 미션 캘린더" className="h-[370px]" />
        )}
        {isError && (
          <ErrorPanel title="학습 미션 캘린더" className="h-[370px]" />
        )}
        {!isLoading && !isError && (
          <>
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
              month={new Date(currentMonth)}
              className="rounded-md  "
              modifiers={{
                zero: (date: Date) => {
                  const correctedDate = correctDate(
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() + 1,
                    ),
                  );
                  return getMissionStatusCount(correctedDate) === 0;
                },
                one: (date: Date) => {
                  const correctedDate = correctDate(
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() + 1,
                    ),
                  );
                  return getMissionStatusCount(correctedDate) === 1;
                },
                two: (date: Date) => {
                  const correctedDate = correctDate(
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() + 1,
                    ),
                  );
                  return getMissionStatusCount(correctedDate) === 2;
                },
                three: (date: Date) => {
                  const correctedDate = correctDate(
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() + 1,
                    ),
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
              {/* <p className="font-bold">어떤 미션을 성공했을까? </p> */}
              <p className="font-bold text-start text-lg m-1">
                📂 어떤 미션을 성공했을까?
              </p>
              <div>
                {isToday(String(selectedDate)) ? (
                  <p className="text-sm mt-2">
                    캘린더에는 오늘 데이터는 반영되지 않아요
                  </p>
                ) : mission ? (
                  <div className="flex justify-evenly gap-2  my-2 text-sm ">
                    <StatusBox
                      label="콘텐츠 1개 학습"
                      completed={mission.missionStatus.oneContent}
                      icon={<Book className="w-6 h-6 stroke-1" />}
                    />
                    <StatusBox
                      label="문장 북마크 1개"
                      completed={mission.missionStatus.bookmark}
                      icon={<Highlighter className="w-6 h-6 stroke-1" />}
                    />
                    <StatusBox
                      label="퀴즈 1문제"
                      completed={mission.missionStatus.quiz}
                      icon={<HelpCircle className="w-6 h-6 stroke-1" />}
                    />
                  </div>
                ) : (
                  <div>미션 데이터가 없어요.</div>
                )}
              </div>
              {/* <span>Count: {mission.missionStatus.count}</span> */}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
