import { MissionStatus } from '@/types/Mission';

export interface RecentLearningPreview {
  contentId: number;
  title: string;
  thumbnailUrl: string;
  contentType: 'READING' | 'LISTENING';
  preScripts: string;
  category: string;
  duration: string;
  hits: number;
  isScrapped: boolean;
  currentLearningRate: number;
  completedLearningRate: number;
}

export interface MonthlyCategoryRatio<
  T = { categoryId: number; categoryName: string; count: number },
> {
  categoryId: number;
  categoryName: string;
  count: number;
  extraData?: T;
}

export interface FetchMonthlyCategoryRatioResponse {
  code: string;
  message: string;
  data: { totalCount: number; categoryLearningList: MonthlyCategoryRatio[] };
}

export interface FetchRecentLearningPreviewResponse {
  code: string;
  message: string;
  data: { recentLearningPreview: RecentLearningPreview[] };
}

export interface FetchOneRecentLearningPreviewResponse {
  code: string;
  message: string;
  data: { title: string; learningRate: number };
}

export interface MonthlyHistoryList {
  date: string;
  missionStatus: MissionStatus;
}

export interface MissonCalendarResponse {
  code: string;
  message: string;
  data: { monthlyHistoryList: MonthlyHistoryList[] };
}

export interface WeeklyQuizAccuracy {
  weekStartDate: string;
  weekNumber: number;
  firstTryCorrect: number;
  reTryCorrect: number;
  totalFirstTry: number;
  totalReTry: number;
}

export interface FetchWeeklyQuizAccuracyResponse {
  code: string;
  message: string;
  data: { questionSummaryList: WeeklyQuizAccuracy[] };
}

export interface FetchCurrentPointsResponse {
  code: string;
  message: string;
  data: {
    currentPoint: number;
  };
}

export interface PointHistory {
  reason: string;
  point: number;
}
export interface MonthlyHistory {
  date: string;
  pointsHistory: PointHistory[];
}

export interface FetchMonthlyPointsHistoryResponse {
  code: string;
  message: string;
  data: {
    currentPoint: number;
    monthlyHistoryList: MonthlyHistory[];
  };
}
