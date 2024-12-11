/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { PieChart, Pie, Cell, LabelList } from 'recharts';

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

  const chartData = data
    ? processCategoryData(data.data.categoryLearningList, data.data.totalCount)
    : [];

  const chartConfig = chartData.reduce((acc, item) => {
    acc[item.category] = {
      label: item.category,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-medium">
          학습 카테고리 분포
        </CardTitle>
        <CardDescription className="text-base">
          내가 많이 학습한 카테고리 TOP 5
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        {isLoading && (
          <LoadingPanel title="학습 카테고리 TOP 5" className="h-[200px]" />
        )}
        {isError && (
          <ErrorPanel title="학습 카테고리 TOP 5" className="h-[200px]" />
        )}
        {!isLoading &&
          !isError &&
          data?.data.categoryLearningList.length === 0 && (
            <EmptyPanel message="학습한 카테고리가 없어요" />
          )}
        {!isLoading && !isError && (
          <ChartContainer
            config={chartConfig}
            className="aspect-square w-full max-w-lg"
          >
            <PieChart className="">
              <Pie
                data={chartData}
                dataKey="percent"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius="90%"
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
        )}
      </CardContent>
    </Card>
  );
}
