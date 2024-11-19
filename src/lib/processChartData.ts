import { MonthlyCategoryRatio, WeeklyQuizAccuracy } from '@/types/Dashboard';

const colorPalette = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
  'hsl(var(--chart-7))',
  'hsl(var(--chart-8))',
];

interface ProcessedCategoryData {
  category: string;
  count: number;
  percent: number; // 숫자 형식으로 변경
  fill: string;
}

export const processCategoryData = <T>(
  categoryData: MonthlyCategoryRatio<T>[],
  totalCount: number,
): ProcessedCategoryData[] => {
  // Sort categories by count
  const sortedData = categoryData.sort((a, b) => b.count - a.count);

  // Get top 3 categories
  const top3 = sortedData.slice(0, 3);

  // Group the rest into "extra"
  const extra = sortedData.slice(3).reduce(
    (acc, item) => {
      acc.count += item.count;
      return acc;
    },
    {
      categoryId: 0,
      categoryName: 'extra',
      count: 0,
    } as MonthlyCategoryRatio<T>,
  );

  // Calculate percentages and assign colors
  const chartData = [...top3, extra].map((item, index) => ({
    category: item.categoryName,
    count: item.count,
    percent: (item.count / totalCount) * 100, // 숫자 형식으로 변환
    fill: colorPalette[index % colorPalette.length],
  }));

  return chartData;
};

export const processQuizAccuracyData = (data: WeeklyQuizAccuracy[]) =>
  data.map((item) => ({
    week: `week ${item.weekNumber} (${item.weekStartDate})`,
    firstTryRate:
      item.totalFirstTry > 0
        ? ((item.firstTryCorrect / item.totalFirstTry) * 100).toFixed(2)
        : 0,
    reTryRate:
      item.totalReTry > 0
        ? ((item.reTryCorrect / item.totalReTry) * 100).toFixed(2)
        : 0,
  }));
