import * as React from 'react';
import { ko } from 'date-fns/locale';
import { Calendar as CustomCalendar } from '@/components/common/CustomShadcnCalendar';

export const mockMissionHistory: {
  [key: string]: {
    oneContent: boolean;
    bookmark: boolean;
    quiz: boolean;
    count: number;
  };
} = {
  '2024-11-01': {
    oneContent: true,
    bookmark: true,
    quiz: true,
    count: 3,
  },
  '2024-11-02': {
    oneContent: true,
    bookmark: true,
    quiz: false,
    count: 2,
  },
  '2024-11-03': {
    oneContent: true,
    bookmark: false,
    quiz: false,
    count: 1,
  },
  '2024-11-04': {
    oneContent: false,
    bookmark: false,
    quiz: false,
    count: 0,
  },
};

// TODO(@godhyzzang) 현재 mock데이터에 맞게 맞춰져있음. 추후 데이터 넘어오면 그대로 바꾸기만 하면 됨
// TODO(@godhyzzang)date-fns 사용?
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
        className="rounded-md"
        modifiers={{
          zero: (date: Date) => {
            const correctedDate = correctDate(date);
            return mockMissionHistory[correctedDate]?.count === 0;
          },
          one: (date: Date) => {
            const correctedDate = correctDate(date);
            return mockMissionHistory[correctedDate]?.count === 1;
          },
          two: (date: Date) => {
            const correctedDate = correctDate(date);
            return mockMissionHistory[correctedDate]?.count === 2;
          },
          three: (date: Date) => {
            const correctedDate = correctDate(date);
            return mockMissionHistory[correctedDate]?.count === 3;
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
        <div
          className="text-lg
       font-bold"
        >
          🔍 어떤 미션을 성공했을까?
        </div>
        <div>
          {Object.entries(mockMissionHistory).map(([date, details]) =>
            date === (selectedDate ? correctDate(selectedDate) : '') ? (
              <div key={date} className="flex flex-col mb-2">
                <span className="font-bold">{date}</span>
                <span>One Content: {details.oneContent ? 'Yes' : 'No'}</span>
                <span>Bookmark: {details.bookmark ? 'Yes' : 'No'}</span>
                <span>Quiz: {details.quiz ? 'Yes' : 'No'}</span>
                {/* <span>Count: {details.count}</span> */}
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
