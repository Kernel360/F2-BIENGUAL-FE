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

export const processCategoryData = (
  categoryData: MonthlyCategoryRatio[],
  totalCount: number,
) => {
  return categoryData.map((item: MonthlyCategoryRatio, index: number) => ({
    category: item.categoryName,
    percent: (item.count / totalCount) * 100,
    fill: colorPalette[index % colorPalette.length],
  }));
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
