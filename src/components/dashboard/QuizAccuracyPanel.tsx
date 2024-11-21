'use client';

import { TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';

import { useWeeklyQuizAccuracy } from '@/api/hooks/useDashboard';
import {
  LoadingPanel,
  ErrorPanel,
  EmptyPanel,
} from '@/components/common/Panels';
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
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from '@/components/ui/chart';
import { formatDate } from '@/lib/formatDate';
import { processQuizAccuracyData } from '@/lib/processChartData';

export default function QuizAccuracyPanel() {
  const { data, isLoading, isError } = useWeeklyQuizAccuracy(
    formatDate(String(new Date()), 'YYYY-MM-DD'),
  );

  const chartData = data
    ? processQuizAccuracyData(data.data.questionSummaryList)
    : [];

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">최근 5주 퀴즈 정답율</CardTitle>
        <CardDescription className="text-base">Recent 5 Weeks</CardDescription>
      </CardHeader>

      {isLoading && (
        <LoadingPanel title="최근 5주 퀴즈 정답률" className="h-[250px]" />
      )}
      {isError && (
        <ErrorPanel title="최근 5주 퀴즈 정답률" className="h-[250px]" />
      )}
      {!isLoading && !isError && !data?.data && (
        <EmptyPanel
          title="최근 5주 퀴즈 정답률"
          message="최근 5주 학습한 퀴즈가 없습니다."
          className="h-[250px]"
        />
      )}
      {!isLoading && !isError && (
        <>
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="firstTryRate"
                  fill="hsl(var(--chart-2))"
                  radius={4}
                >
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
        </>
      )}
    </Card>
  );
}
