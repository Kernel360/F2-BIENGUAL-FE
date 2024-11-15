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

export interface MonthlyCategoryRatio {
  categoryId: number;
  categoryName: string;
  count: number;
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

export interface FetchMonthlyCategoryRatioResponse {
  code: string;
  message: string;
  data: { totalCount: number; categoryLearningList: MonthlyCategoryRatio[] };
}
