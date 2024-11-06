import { useMutation } from '@tanstack/react-query';

import {
  LearningProgressRequest,
  LearningProgressResponse,
} from '@/types/LearningProgress';

import { updateLearningProgress } from '../queries/learningProgressQueries';

export const useUpdateLearningProgress = () => {
  return useMutation<LearningProgressResponse, Error, LearningProgressRequest>({
    mutationFn: (progressData) => updateLearningProgress(progressData),
  });
};
