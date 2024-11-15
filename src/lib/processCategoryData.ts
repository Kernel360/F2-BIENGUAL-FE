import { MonthlyCategoryRatio } from '@/types/Dashboard';

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
