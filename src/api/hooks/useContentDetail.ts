import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { ContentDetailResponse } from '../../types/ContentDetail';
import { fetchContentDetail } from '../queries/contentsQueries';

export const useContentDetail = (
  contentId: number,
): UseQueryResult<ContentDetailResponse> => {
  return useQuery({
    queryKey: ['contentDetail', contentId],
    queryFn: () => fetchContentDetail({ contentId }),
  });
};
