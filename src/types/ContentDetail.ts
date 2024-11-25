import { LevelType } from '@/types/Level';

// src/types/ContentDetail.ts
export type Script = {
  startTimeInSecond: number;
  durationInSecond: number;
  enScript: string;
  koScript: string;
  bookmarkId: number;
  isHighlighted: boolean;
  description: string;
};

export type ContentDetail = {
  contentId: number;
  contentType: string;
  category: string;
  title: string;
  thumbnailUrl: string;
  videoUrl?: string;
  duration: string;
  hits: number;
  customLevel: LevelType;
  calculatedLevel: LevelType;
  isScrapped: boolean;
  currentLearningRate: number;
  completedLearningRate: number;
  scriptList: Script[];
};

export type ContentDetailResponse = {
  code: string;
  message: string;
  data: ContentDetail;
};
