export interface RecentLearningPreview {
  contentId: number;
  title: string;
  category: string;
  thumbnailUrl: string;
  contentType: 'READING' | 'LISTENING';
  preScripts: string;
  hits: number;
  isScrapped: boolean;
  learningRate: number;
}

export interface RecentLearningPreviewResponse {
  code: string;
  message: string;
  data: { recentLearningPreview: RecentLearningPreview[] };
}
