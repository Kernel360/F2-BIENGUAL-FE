'use client';

import { PlayCircle, ChevronRight, Trophy } from 'lucide-react';
import { Bar, BarChart, Pie, PieChart } from 'recharts';

import Calendar from '@/components/common/DashboardCalendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

const quizData = [
  { month: 'Jan', total: 20, correct: 15, accuracy: 75 },
  { month: 'Feb', total: 25, correct: 20, accuracy: 80 },
  { month: 'Mar', total: 30, correct: 25, accuracy: 83 },
  { month: 'Apr', total: 35, correct: 28, accuracy: 80 },
  { month: 'May', total: 40, correct: 35, accuracy: 87 },
  { month: 'Jun', total: 45, correct: 40, accuracy: 89 },
];

const categoryData = [
  { name: 'Sports', value: 30 },
  { name: 'Health', value: 25 },
  { name: 'News', value: 20 },
  { name: 'Politics', value: 15 },
  { name: 'Science', value: 10 },
];

export default function Component() {
  return (
    <div className="p-6 space-y-6">
      {/* 최근 학습 강의 포인트 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle className="text-lg font-medium">
              최근 학습 강의
            </CardTitle>
            <button
              type="button"
              className="text-md text-muted-foreground hover:text-primary"
              onClick={() => {}}
            >
              학습 목록 <ChevronRight className="inline h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="flex items-center space-x-3">
              <PlayCircle className="h-8 w-8 text-primary" />
              <div>
                <p className="text-md font-medium leading-tight line-clamp-1">
                  Robert Irwin and Jimmy Bottle Feed a Baby Miniature Horse
                </p>
                <p className="text-sm text-muted-foreground">24.00%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle className="text-lg font-medium">내 포인트</CardTitle>
            <button
              type="button"
              className="text-md text-muted-foreground hover:text-primary"
              onClick={() => {}}
            >
              포인트 내역 <ChevronRight className="inline h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-primary" />
              <div className="text-xl font-bold">500 P</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 학습 캘린더 학습 카테고리 분포 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-medium">학습 캘린더</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <Calendar />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-medium">
              학습 카테고리 분포
            </CardTitle>
            <CardDescription className="text-md">
              카테고리별 학습 비율
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <ChartContainer
              config={{
                Sports: { label: 'Sports', color: 'hsl(var(--chart-1))' },
                Health: { label: 'Health', color: 'hsl(var(--chart-2))' },
                News: { label: 'News', color: 'hsl(var(--chart-3))' },
                Politics: { label: 'Politics', color: 'hsl(var(--chart-4))' },
                Science: { label: 'Science', color: 'hsl(var(--chart-5))' },
              }}
              className="w-[350px] h-[300px]"
            >
              <PieChart className="h-[300px] w-full">
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="var(--color-Grammar)"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* 퀴즈 성과 누적 */}
      <Card className="col-span-2">
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-medium">퀴즈 성과</CardTitle>
          <CardDescription className="text-md">
            월별 퀴즈 정답률 및 완료 현황
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <ChartContainer
            config={{
              total: { label: '총 문제', color: 'hsl(var(--primary))' },
              correct: { label: '정답', color: 'hsl(var(--success))' },
              accuracy: { label: '정답률', color: 'hsl(var(--warning))' },
            }}
            className="h-[300px]"
          >
            <BarChart data={quizData} className="h-[300px]">
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="total"
                fill="var(--color-total)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="correct"
                fill="var(--color-correct)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
