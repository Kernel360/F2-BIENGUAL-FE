export type LearningProgressRequest = {
  contentId: number;
  learningRate: number;
};

export type LearningProgressResponse = {
  code: string;
  message: string;
};
