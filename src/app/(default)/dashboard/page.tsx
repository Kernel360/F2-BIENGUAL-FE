'use client';

import Link from 'next/link';

import { PlayCircle, ChevronRight, Trophy, TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';

import {
  useMonthlyCategoryRatio,
  useOneRecentLearningPreview,
  useWeeklyQuizAccuracy,
} from '@/api/hooks/useDashboard';
import Calendar from '@/components/common/DashboardCalendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { getFormattedDate } from '@/lib/formatDate';
import {
  processCategoryData,
  processQuizAccuracyData,
} from '@/lib/processChartData';

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

const chartConfig = {
  firstTryRate: {
    label: '첫 시도 (%)',
    color: 'hsl(var(--chart-2))',
  },
  reTryRate: {
    label: '재 시도 (%)',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const { data: oneRecentLearningContent } = useOneRecentLearningPreview();
  // TODO(@smosco): 월 선택 캐러셀 추가
  const { data: monthlyCategoryRatio } = useMonthlyCategoryRatio(
    getFormattedDate('month'),
  );

  const monthlyCategoryChartData = monthlyCategoryRatio
    ? processCategoryData(
        monthlyCategoryRatio.data.categoryLearningList,
        monthlyCategoryRatio.data.totalCount,
      )
    : [];

  const { data: weeklyQuizAccuracy } = useWeeklyQuizAccuracy(
    getFormattedDate('date'),
  );

  const chartData = weeklyQuizAccuracy
    ? processQuizAccuracyData(weeklyQuizAccuracy.data.questionSummaryList)
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
            <Calendar />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-medium">
              학습 카테고리 분포
            </CardTitle>
            <CardDescription className="text-base">
              카테고리별 학습 비율
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <ChartContainer config={categoryChartConfig}>
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
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">최근 5주 퀴즈 정답율</CardTitle>
          <CardDescription className="text-base">
            Recent 5 Weeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              className="text-base"
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 6)}
              />
              <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="firstTryRate" fill="hsl(var(--chart-2))" radius={4}>
                <LabelList
                  dataKey="firstTryRate"
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={14}
                />
              </Bar>
              <Bar dataKey="reTryRate" fill="hsl(var(--chart-1))" radius={4}>
                <LabelList
                  dataKey="reTryRate"
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={14}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2">
          <div className="flex gap-2 font-medium leading-none">
            Showing quiz accuracy rates for the last 5 weeks
            <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
