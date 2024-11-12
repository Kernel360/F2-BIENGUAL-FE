import { apiClient } from '@/lib/apiClient';
import {
  FetchScrapResponse,
  CreateScrapResponse,
  DeleteScrapResponse,
} from '@/types/Scrap';

// 스크랩 조회 (GET)
export const fetchScrap = async (): Promise<FetchScrapResponse> => {
  return apiClient<FetchScrapResponse>('/scrap/view', {
    method: 'GET',
  });
};

// 스크랩 생성 (POST)
export const createScrap = async (
  contentId: number,
): Promise<CreateScrapResponse> => {
  return apiClient<CreateScrapResponse>(`/scrap/create/${contentId}`, {
    method: 'POST',
  });
};

// 스크랩 삭제 (DELETE)
export const deleteScrap = async (
  contentId: number,
): Promise<DeleteScrapResponse> => {
  return apiClient<DeleteScrapResponse>(`/scrap/delete/${contentId}`, {
    method: 'DELETE',
  });
};
