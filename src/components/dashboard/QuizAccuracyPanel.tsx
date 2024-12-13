'use client';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

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
    formatDate(new Date(), 'YYYY-MM-DD'),
  );

  const chartData = data
    ? processQuizAccuracyData(data.data.questionSummaryList)
    : [];

  const chartConfig = {
    firstTryRate: {
      label: '첫 시도 (%)',
      color: 'hsl(var(--chart-6))',
    },
    reTryRate: {
      label: '재 시도 (%)',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-explicit-any
  function CustomLabel({ x, y, width, value }: any) {
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="currentColor"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: 'var(--chart-font-size, 12px)' }}
      >
        {value}
      </text>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">최근 5주 퀴즈 정답률</CardTitle>
        <CardDescription className="text-base">
          지난 5주, 당신의 퀴즈 성과는?
        </CardDescription>
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
          message="학습한 퀴즈가 없어요 퀴즈를 풀어 주세요!"
          className="h-[250px]"
        />
      )}
      {!isLoading && !isError && (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, left: -30, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                tickMargin={5}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 6)}
                style={{ fontSize: 'var(--chart-font-size, 12px)' }}
              />
              <YAxis
                tickLine={false}
                tickMargin={5}
                axisLine={false}
                domain={[0, 100]}
                style={{ fontSize: 'var(--chart-font-size, 12px)' }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="firstTryRate"
                fill="var(--color-firstTryRate)"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                label={<CustomLabel />}
              />
              <Bar
                dataKey="reTryRate"
                fill="var(--color-reTryRate)"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                label={<CustomLabel />}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
