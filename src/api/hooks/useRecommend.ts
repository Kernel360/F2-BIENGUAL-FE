import { UseQueryResult, useQuery } from '@tanstack/react-query';

import {
  RecommendedBookmarksResponse,
  RecommendedContentsResponse,
} from '@/types/Preview';

import { useQueryLoginOnly } from './common';
import {
  fetchRecommendedBookmarks,
  fetchRecommendedContents,
} from '../queries/recommendQueries';

export const useRecommendedContents =
  (): UseQueryResult<RecommendedContentsResponse> => {
    return useQueryLoginOnly({
      queryKey: ['recommendedContents'],
      queryFn: () => fetchRecommendedContents(),
    });
  };

export const useRecommendedBookmarks =
  (): UseQueryResult<RecommendedBookmarksResponse> => {
    return useQuery({
      queryKey: ['recommendedBookmarks'],
      queryFn: () => fetchRecommendedBookmarks(),
    });
  };
