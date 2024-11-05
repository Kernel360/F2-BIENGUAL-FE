import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { FetchCategoryResponse } from '@/types/Category';

import { fetchAllCategories } from '../queries/fetchAllCategories';

export const useFetchAllCategories =
  (): UseQueryResult<FetchCategoryResponse> => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: () => fetchAllCategories(),
    });
  };
