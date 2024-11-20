import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { RecommendedContentsResponse } from '@/types/Preview';

import { fetchRecommendedContents } from '../queries/recommendQueries';

export const useRecommendedContents =
  (): UseQueryResult<RecommendedContentsResponse> => {
    return useQuery({
      queryKey: ['recommendedContens'],
      queryFn: () => fetchRecommendedContents(),
    });
  };
