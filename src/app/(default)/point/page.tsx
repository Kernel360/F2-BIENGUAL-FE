'use client';

import { useState } from 'react';

import { Trophy } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { formatDateToMonthDay } from '@/lib/formDateToMonthDay';
import PointsHistory from '@/mock/pointsHistory.json';

interface Activity {
  description: string;
  points: number;
}

interface DayActivity {
  date: string;
  activities: Activity[];
}

function PointHistoryItem({ date, activities }: DayActivity) {
  return (
    <div className="py-2 border-b last:border-b-0">
      {activities.map((activity, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="flex justify-between items-center"
        >
          {/* 첫 번째 활동일 경우에만 날짜를 표시 */}
          <div className="flex gap-4 items-center">
            <span className="font-medium w-16 text-sm">
              {index === 0 ? formatDateToMonthDay(date) : ''}
            </span>
            <span>{activity.description}</span>
          </div>
          <span
            className={`font-bold ${activity.points >= 0 ? 'text-blue-500' : 'text-red-500'}`}
          >
            {activity.points >= 0 ? '+' : '-'}
            {Math.abs(activity.points)}원
          </span>
        </div>
      ))}
    </div>
  );
}

function MonthPointData({ month }: { month: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  const data =
    PointsHistory[2024][month as keyof (typeof PointsHistory)[2024]] || [];

  return (
    <div>
      <div className="text-base">
        {isLoading ? (
          <div className="text-center py-4">로딩 중...</div>
        ) : (
          data.map((dayActivity, index) => (
            // eslint-disable-next-line react/no-array-index-key, react/jsx-props-no-spreading
            <PointHistoryItem key={index} {...dayActivity} />
          ))
        )}
        {data.length === 0 && <p className="text-sm">포인트 내역이 없어요</p>}
      </div>
    </div>
  );
}

export default function PointHistory() {
  const months = [
    '12',
    '11',
    '10',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
    '1',
  ];
  const [currentMonth, setCurrentMonth] = useState<(typeof months)[number]>(
    months[0],
  );
  return (
    <div>
      <Card className="w-full mx-auto p-5">
        {/* 총 포인트 */}
        <Card>
          <CardHeader className="flex flex-row  justify-center items-center p-4">
            <CardTitle className="text-lg font-medium">내 포인트</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center px-4 pb-4 pt-0">
            <div className="flex ju items-center space-x-3">
              <Trophy className="h-8 w-8 text-primary" />
              <div className="text-xl font-bold">500 P</div>
            </div>
          </CardContent>
        </Card>
        {/* 세부 포인트 내역 */}
        <CardHeader>
          <CardTitle>포인트 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="flex flex-col items-center h-[400px] pr-4">
            <div className="w-[80px]  mx-auto">
              <Select
                onValueChange={(value) => {
                  setCurrentMonth(value);
                }}
                value={currentMonth}
              >
                <SelectTrigger className="w-inherit focus:outline-none focus:ring-0 border-none shadow-none text-lg font-medium">
                  <SelectValue placeholder={`${currentMonth}월`} />
                </SelectTrigger>
                <SelectContent className="min-w-[80px] max-h-[150px]">
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {`${month}월`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-3">
              {months.map((month) =>
                month === currentMonth ? (
                  <MonthPointData key={month} month={month} />
                ) : (
                  ''
                ),
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
