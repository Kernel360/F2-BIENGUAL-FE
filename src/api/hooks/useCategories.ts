import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { FetchCategoryResponse } from '@/types/Category';

import { fetchAllCategories } from '../queries/categoryQueries';

export const useFetchAllCategories =
  (): UseQueryResult<FetchCategoryResponse> => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: () => fetchAllCategories(),
    });
  };
