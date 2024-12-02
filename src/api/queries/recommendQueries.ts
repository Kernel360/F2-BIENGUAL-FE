import { apiClient } from '@/lib/apiClient';
import {
  RecommendedContentsResponse,
  RecommendedBookmarksResponse,
} from '@/types/Preview';

// 추천 콘텐츠 프리뷰 조회 (GET)
export const fetchRecommendedContents = async (
  customHeaders?: Record<string, string>,
): Promise<RecommendedContentsResponse> => {
  return apiClient<RecommendedContentsResponse>('/recommender/category', {
    method: 'GET',
    customHeaders,
  });
};

export const fetchRecommendedBookmarks =
  async (): Promise<RecommendedBookmarksResponse> => {
    return apiClient<RecommendedBookmarksResponse>('/recommender/bookmark', {
      method: 'GET',
    });
  };
