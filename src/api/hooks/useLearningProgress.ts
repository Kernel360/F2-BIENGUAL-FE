import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  LearningProgressRequest,
  LearningProgressResponse,
} from '@/types/LearningProgress';

import { updateLearningProgress } from '../queries/learningProgressQueries';

export const useUpdateLearningProgress = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<LearningProgressResponse, Error, LearningProgressRequest>({
    mutationFn: (progressData) => updateLearningProgress(progressData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentDetail', contentId] });
    },
  });
};
