import { apiClient } from '@/lib/apiClient';
import { SearchResponse } from '@/types/Search';

// 검색 결과 조회 (GET)
export const fetchSearchResults = async (
  query: string,
): Promise<SearchResponse> => {
  return apiClient<SearchResponse>(
    `/contents/accurate-search?searchWords=${encodeURIComponent(query)}`,
    {
      method: 'GET',
    },
  );
};
