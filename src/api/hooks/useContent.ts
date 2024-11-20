import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { ContentDetailResponse } from '../../types/ContentDetail';
import { CreateContentsFeedbackResponse } from '../../types/CreateContents';
import {
  createContentsFeedback,
  fetchContentDetail,
} from '../queries/contentsQueries';

export const useContentDetail = (
  contentId: number,
): UseQueryResult<ContentDetailResponse> => {
  return useQuery({
    queryKey: ['contentDetail', contentId],
    queryFn: () => fetchContentDetail(contentId),
  });
};

export const useCreateContentsFeedback = (contentId: number) => {
  const queryClient = useQueryClient();
  return useMutation<
    CreateContentsFeedbackResponse,
    Error,
    'LOW' | 'MEDIUM' | 'HIGH'
  >({
    mutationFn: (contentLevel) =>
      createContentsFeedback(contentId, contentLevel),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentDetail', contentId] });
    },
  });
};
