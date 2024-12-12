import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ReducePointResponse } from '@/types/Point';

import { reducePoints } from '../queries/pointQueries';

// 포인트 차감 훅
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useReducePoints = () => {
  const queryClient = useQueryClient();

  return useMutation<ReducePointResponse, Error, string>({
    mutationFn: (contentId: string) => reducePoints(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentPoints'] });
      queryClient.invalidateQueries({
        queryKey: ['paginatedListeningPreview'],
      });
      queryClient.invalidateQueries({
        queryKey: ['paginatedReadingPreview'],
      });
    },
  });
};
