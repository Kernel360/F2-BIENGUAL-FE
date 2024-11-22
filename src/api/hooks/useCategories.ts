import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { FetchCategoryResponse } from '@/types/Category';

import {
  fetchAllCategories,
  fetchCategoriesByContentType,
} from '../queries/categoryQueries';

export const useFetchAllCategories =
  (): UseQueryResult<FetchCategoryResponse> => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: () => fetchAllCategories(),
    });
  };

export const useFetchCategoriesByContentType = (
  contentType: 'LISTENING' | 'READING',
): UseQueryResult<FetchCategoryResponse> => {
  return useQuery({
    queryKey: ['categories', contentType],
    queryFn: () => fetchCategoriesByContentType(contentType),
  });
};
