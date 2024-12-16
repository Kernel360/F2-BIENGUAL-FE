import { apiClient } from '@/lib/apiClient';
import { FetchCategoryResponse } from '@/types/Category';

// 모든 카테고리 조회 (GET)
export const fetchAllCategories = async (
  customHeaders?: Record<string, string>,
): Promise<FetchCategoryResponse> => {
  return apiClient<FetchCategoryResponse>('/categories/all', {
    method: 'GET',
    customHeaders,
  });
};

export const fetchCategoriesByContentType = async (
  contentType: 'LISTENING' | 'READING',
): Promise<FetchCategoryResponse> => {
  return apiClient<FetchCategoryResponse>(`/categories/type/${contentType}`, {
    method: 'GET',
  });
};
