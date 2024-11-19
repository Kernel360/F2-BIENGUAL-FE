'use client';

import { PieChart, Pie, LabelList } from 'recharts';

import { useMonthlyCategoryRatio } from '@/api/hooks/useDashboard';
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
  ChartConfig,
} from '@/components/ui/chart';
import { formatDate } from '@/lib/formatDate';
import { processCategoryData } from '@/lib/processChartData';

export default function CategoryDistributionPanel() {
  const { data, isLoading, isError } = useMonthlyCategoryRatio(
    formatDate(String(new Date()), 'YYYY-MM'),
  );

  if (isLoading) return <LoadingPanel title="학습 카테고리 분포" />;
  if (isError) return <ErrorPanel title="학습 카테고리 분포" />;
  if (!data?.data.categoryLearningList)
    return (
      <EmptyPanel title="학습 카테고리 분포" message="데이터가 없습니다." />
    );

  const chartData = processCategoryData(
    data.data.categoryLearningList,
    data.data.totalCount,
  );

  const chartConfig = {
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

  return (
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
        <ChartContainer config={chartConfig}>
          <PieChart className="h-[300px] w-full">
            <Pie
              data={chartData}
              dataKey="percent"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
            >
              <LabelList
                dataKey="category"
                position="inside"
                fill="#fff"
                className="text-md font-mono"
              />
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
