import { apiClient } from '@/lib/apiClient';
import { ContentDetailResponse } from '@/types/ContentDetail';
import { CreateContentsFeedbackResponse } from '@/types/CreateContents';
import {
  ReadingPreviewResponse,
  ListeningPreviewResponse,
  ContentsResponse,
} from '@/types/Preview';

// 리딩 프리뷰 조회 (GET)
export const fetchReadingPreview = async (
  customHeaders?: Record<string, string>,
): Promise<ReadingPreviewResponse> => {
  return apiClient<ReadingPreviewResponse>('/contents/preview/reading', {
    method: 'GET',
    customHeaders,
  });
};

// 리스닝 프리뷰 조회 (GET)
export const fetchListeningPreview = async (
  customHeaders?: Record<string, string>,
): Promise<ListeningPreviewResponse> => {
  return apiClient<ListeningPreviewResponse>('/contents/preview/listening', {
    method: 'GET',
    customHeaders,
  });
};

// 콘텐츠 상세 조회 (GET)
export const fetchContentDetail = async (
  contentId: number,
  customHeaders?: Record<string, string>,
): Promise<ContentDetailResponse> => {
  return apiClient<ContentDetailResponse>(`/contents/details/${contentId}`, {
    method: 'GET',
    customHeaders,
  });
};

// 리딩 프리뷰 페이징 조회 (GET)
export const fetchPaginatedReadingPreview = async (
  page?: number,
  size?: number,
  sort?: string,
  direction?: string,
  categoryId?: number,
): Promise<ContentsResponse> => {
  const queryParams = new URLSearchParams();
  if (sort) queryParams.append('sort', sort);
  if (direction) queryParams.append('direction', direction);
  if (page) queryParams.append('page', page.toString());
  if (size) queryParams.append('size', size.toString());
  if (categoryId !== undefined)
    queryParams.append('categoryId', categoryId.toString());

  return apiClient<ContentsResponse>(
    `/contents/preview/paginated-reading?${queryParams.toString()}`,
    {
      method: 'GET',
    },
  );
};

// 리스닝 프리뷰 페이징 조회 (GET)
export const fetchPaginatedListeningPreview = async (
  page?: number,
  size?: number,
  sort?: string,
  direction?: string,
  categoryId?: number,
): Promise<ContentsResponse> => {
  const queryParams = new URLSearchParams();
  if (sort) queryParams.append('sort', sort);
  if (direction) queryParams.append('direction', direction);
  if (page) queryParams.append('page', page.toString());
  if (size) queryParams.append('size', size.toString());
  if (categoryId !== undefined)
    queryParams.append('categoryId', categoryId.toString());

  return apiClient<ContentsResponse>(
    `/contents/preview/paginated-listening?${queryParams.toString()}`,
    {
      method: 'GET',
    },
  );
};

// 콘텐츠 난이도 평가 생성 (POST)
export const createContentsFeedback = async (
  contentId: number,
  contentLevel: 'LOW' | 'MEDIUM' | 'HIGH',
): Promise<CreateContentsFeedbackResponse> => {
  return apiClient('/contents/feedback/level', {
    method: 'POST',
    body: JSON.stringify({ contentId, contentLevel }),
  });
};
