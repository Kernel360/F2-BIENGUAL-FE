'use client';

import Link from 'next/link';

import { PlayCircle, ChevronRight, Trophy } from 'lucide-react';
import { Bar, BarChart, Pie, PieChart } from 'recharts';

import {
  useMonthlyCategoryRatio,
  useOneRecentLearningPreview,
} from '@/api/hooks/useDashboard';
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
  ChartConfig,
} from '@/components/ui/chart';
import { getCurrentMonthWithPad } from '@/lib/formatDate';
import { processCategoryData } from '@/lib/processCategoryData';

const quizData = [
  { month: 'Jan', total: 20, correct: 15, accuracy: 75 },
  { month: 'Feb', total: 25, correct: 20, accuracy: 80 },
  { month: 'Mar', total: 30, correct: 25, accuracy: 83 },
  { month: 'Apr', total: 35, correct: 28, accuracy: 80 },
  { month: 'May', total: 40, correct: 35, accuracy: 87 },
  { month: 'Jun', total: 45, correct: 40, accuracy: 89 },
];

// TODO(@smosco): shadncn 차트 config 더 알아보고 수정 필요
const categoryChartConfig = {
  percent: {
    label: 'Percent',
  },
  sports: {
    label: 'Sports',
    color: 'hsl(var(--chart-1))',
  },
  health: {
    label: 'Health',
    color: 'hsl(var(--chart-2))',
  },
  news: {
    label: 'News',
    color: 'hsl(var(--chart-3))',
  },
  politics: {
    label: 'Politics',
    color: 'hsl(var(--chart-4))',
  },
  science: {
    label: 'Science',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

const quizChartConfig = {
  total: {
    label: '총 문제',
    color: 'hsl(var(--chart-1))',
  },
  correct: {
    label: '정답',
    color: 'hsl(var(--chart-2))',
  },
  accuracy: {
    label: '정답률',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const { data: oneRecentLearningContent } = useOneRecentLearningPreview();
  // TODO(@smosco): 월 선택 캐러셀 추가
  const { data: monthlyCategoryRatio } = useMonthlyCategoryRatio(
    getCurrentMonthWithPad(),
  );

  const monthlyCategoryChartData = monthlyCategoryRatio
    ? processCategoryData(
        monthlyCategoryRatio.data.categoryLearningList,
        monthlyCategoryRatio.data.totalCount,
      )
    : [];

  return (
    <div className="p-6 space-y-6">
      {/* 최근 학습 강의 포인트 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle className="text-lg font-medium">
              최근 학습 강의
            </CardTitle>
            <Link
              href="/dashboard/learning/recent"
              className="text-md text-muted-foreground hover:text-primary"
            >
              학습 목록 <ChevronRight className="inline h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="flex items-center space-x-3">
              <PlayCircle className="h-8 w-8 text-primary" />
              <div>
                <p className="text-md font-medium leading-tight line-clamp-1">
                  {oneRecentLearningContent?.data.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {oneRecentLearningContent?.data.learningRate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle className="text-lg font-medium">내 포인트</CardTitle>
            <Link
              href="/point"
              className="text-md text-muted-foreground hover:text-primary"
            >
              포인트 내역 <ChevronRight className="inline h-4 w-4" />
            </Link>
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
            <p className="text-center text-sm">
              🥹캘린더에는 오늘 데이터는 반영되지 않아요
            </p>
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
              config={categoryChartConfig}
              className="w-[350px] h-[300px]"
            >
              <PieChart className="h-[300px] w-full">
                <Pie
                  data={monthlyCategoryChartData}
                  dataKey="percent"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ category, percent }) =>
                    `${category}: ${percent.toFixed(1)}%`
                  }
                />
                <ChartTooltip content={<ChartTooltipContent />} />
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
          <ChartContainer config={quizChartConfig} className="h-[300px]">
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
