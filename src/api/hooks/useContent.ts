import {
  QueryClient,
  useQuery,
  UseQueryResult,
  useMutation,
} from '@tanstack/react-query';
import { createContentsFeedback } from '../queries/contentsQueries';
import { ContentDetailResponse } from '../../types/ContentDetail';
import { fetchContentDetail } from '../queries/contentsQueries';
import { CreateContentsFeedbackResponse } from '../../types/CreateContents';
export const useContentDetail = (
  contentId: number,
): UseQueryResult<ContentDetailResponse> => {
  return useQuery({
    queryKey: ['contentDetail', contentId],
    queryFn: () => fetchContentDetail(contentId),
  });
};

export const useCreateContentsFeedback = (contentId: number) => {
  const queryClient = new QueryClient();
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
