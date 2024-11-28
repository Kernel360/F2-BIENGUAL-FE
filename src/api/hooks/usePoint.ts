import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ReducePointResponse } from '@/types/Point';

import { reducePoints } from '../queries/pointQueries';

// 포인트 차감 훅
export const useReducePoints = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<ReducePointResponse, Error>({
    mutationFn: () => reducePoints(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentPoints'] });
    },
  });
};
