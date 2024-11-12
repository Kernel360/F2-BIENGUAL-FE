import { apiClient } from '@/lib/apiClient';
import { FetchCategoryResponse } from '@/types/Category';

// 모든 카테고리 조회 (GET)
export const fetchAllCategories = async (): Promise<FetchCategoryResponse> => {
  return apiClient<FetchCategoryResponse>('/categories/all', {
    method: 'GET',
  });
};
