'use client';

import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
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

type MonthData = DayActivity[];

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

function MonthAccordion({ month }: { month: string }) {
  const [data, setData] = useState<MonthData>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (isOpen: boolean) => {
    if (isOpen && data.length === 0) {
      setIsLoading(true);
      //  TODO(@smosco): tanstack query로 전환하면 isOpen에 따라서 enabled 만 변경
      const monthData =
        PointsHistory[2024][month as keyof (typeof PointsHistory)[2024]] || [];
      setData(monthData);
      setIsLoading(false);
    }
  };

  return (
    <AccordionItem value={month}>
      <AccordionTrigger
        onClickCapture={() => handleToggle(true)}
        className="hover:no-underline text-base"
      >
        <div className="flex justify-between items-center w-full">
          <span>{month}월</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-base">
        {isLoading ? (
          <div className="text-center py-4">로딩 중...</div>
        ) : (
          data.map((dayActivity, index) => (
            // eslint-disable-next-line react/no-array-index-key, react/jsx-props-no-spreading
            <PointHistoryItem key={index} {...dayActivity} />
          ))
        )}
        {data.length === 0 && <p className="text-sm">포인트 내역이 없어요</p>}
      </AccordionContent>
    </AccordionItem>
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

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>포인트 내역</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[800px] pr-4">
          <Accordion type="single" collapsible className="w-full">
            {months.map((month) => (
              <MonthAccordion key={month} month={month} />
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
