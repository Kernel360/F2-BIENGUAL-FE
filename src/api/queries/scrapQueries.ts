import {
  FetchScrapResponse,
  CreateScrapResponse,
  DeleteScrapResponse,
  CheckScrapResponse,
} from '@/types/Scrap';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/scrap`;

// 스크랩 조회
export const fetchScrap = async (): Promise<FetchScrapResponse> => {
  const response = await fetch(`${BASE_URL}/view`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch scrap');
  }
  return response.json();
};

// 스크랩 되었는지 확인
export const checkScrap = async (
  contentId: number,
): Promise<CheckScrapResponse> => {
  const response = await fetch(`${BASE_URL}/check?contentId=${contentId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch scrap');
  }
  return response.json();
};

// 스크랩 생성
export const createScrap = async (
  contentId: number,
): Promise<CreateScrapResponse> => {
  const response = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ contentId }),
  });
  if (!response.ok) {
    throw new Error('Failed to create scrap');
  }
  return response.json();
};

// 스크랩 삭제
export const deleteScrap = async (
  contentId: number,
): Promise<DeleteScrapResponse> => {
  const response = await fetch(`${BASE_URL}/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ contentId }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete scrap');
  }
  return response.json();
};
