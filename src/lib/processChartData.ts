import { MonthlyCategoryRatio, WeeklyQuizAccuracy } from '@/types/Dashboard';

const colorPalette = [
  'hsl(var(--chart-1))', // 보라색 계열
  'hsl(var(--chart-2))', // 보라색 계열
  'hsl(var(--chart-3))', // 보라색 계열
  'hsl(var(--chart-4))', // 보라색 계열
  'hsl(var(--chart-5))', // 보라색 계열
  'hsl(var(--chart-6))', // 회색 계열
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
  if (categoryData.length === 0) {
    return [];
  }

  // count로 내림차순 정렬
  const sortedData = categoryData.sort((a, b) => b.count - a.count);

  // 동률 포함 TOP5 선정
  const top5 = sortedData.slice(0, 5);
  const countOfFifth = top5[top5.length - 1]?.count;
  const top5WithTies = sortedData.filter((item) => item.count >= countOfFifth);

  // 이 외 나머지를 extra로 합산
  const extra = sortedData.slice(top5WithTies.length).reduce(
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

  // extra가 0일 경우 제외
  const chartData = [
    ...top5WithTies,
    ...(extra.count > 0 ? [extra] : []), // extra를 count가 0일 경우 추가하지 않음
  ].map((item, index) => ({
    category: item.categoryName,
    count: item.count,
    percent:
      totalCount > 0 ? Number(((item.count / totalCount) * 100).toFixed(1)) : 0, // totalCount가 0일 경우 비율 0
    fill:
      index < top5WithTies.length ? colorPalette[index % 5] : colorPalette[5], // top5는 보라색 계열, 나머지는 회색 계열
  }));

  return chartData;
};

export const processQuizAccuracyData = (data: WeeklyQuizAccuracy[]) => {
  if (data.length === 0) {
    return [];
  }

  return data.map((item) => ({
    week: `week ${item.weekNumber} (${item.weekStartDate})`,
    firstTryRate:
      item.totalFirstTry > 0
        ? Number(((item.firstTryCorrect / item.totalFirstTry) * 100).toFixed(0))
        : 0,
    reTryRate:
      item.totalReTry > 0
        ? Number(((item.reTryCorrect / item.totalReTry) * 100).toFixed(0))
        : 0,
  }));
};
