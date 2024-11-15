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

export interface FetchRecentLearningPreviewResponse {
  code: string;
  message: string;
  data: { recentLearningPreview: RecentLearningPreview[] };
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
