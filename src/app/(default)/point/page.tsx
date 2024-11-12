/* eslint-disable react/no-array-index-key */

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
    <div className="py-4 border-b last:border-b-0">
      {activities.map((activity, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="flex justify-between items-center gap-4"
        >
          <div className="flex gap-4 items-start">
            {/* 첫 번째 활동일 경우에만 날짜를 표시 */}
            <span className="text-sm text-gray-500 w-20">
              {index === 0 ? formatDateToMonthDay(date) : ''}
            </span>
            <span className="text-sm text-gray-800">
              {activity.description}
            </span>
          </div>
          <span
            className={`font-bold text-base ${
              activity.points >= 0 ? 'text-blue-500' : 'text-red-500'
            }`}
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
      <div className="text-sm">
        {isLoading ? (
          <div className="text-center py-4">로딩 중...</div>
        ) : (
          data.map((dayActivity, index) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <PointHistoryItem key={index} {...dayActivity} />
          ))
        )}
        {data.length === 0 && (
          <p className="text-center text-gray-500 py-4">포인트 내역이 없어요</p>
        )}
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
    <div className="p-4 max-w-2xl mx-auto">
      <Card className="w-full shadow-md rounded-lg overflow-hidden">
        {/* 총 포인트 */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 flex flex-col items-center">
            <Trophy className="h-10 w-10 mb-2" />
            <CardTitle className="text-xl font-bold">내 포인트</CardTitle>
            <div className="text-2xl font-extrabold mt-2">500 P</div>
          </CardHeader>
        </Card>

        {/* 세부 포인트 내역 */}
        <CardHeader className="bg-gray-100 p-4 border-b">
          <CardTitle className="text-lg font-semibold text-gray-700">
            포인트 내역
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mt-4">
            <Select
              onValueChange={(value) => {
                setCurrentMonth(value);
              }}
              value={currentMonth}
            >
              <SelectTrigger className="text-base font-medium shadow border rounded-md p-2 focus:outline-none">
                <SelectValue placeholder={`${currentMonth}월`} />
              </SelectTrigger>
              <SelectContent className="text-base max-h-48 overflow-y-auto">
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {`${month}월`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="h-[400px] mt-4 p-4">
            {months.map((month) =>
              month === currentMonth ? (
                <MonthPointData key={month} month={month} />
              ) : null,
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
