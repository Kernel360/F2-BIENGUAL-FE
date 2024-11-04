import {
  FetchMissionStatusResponse,
  UpdateMissionStatusResponse,
} from '@/types/Mission';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/missions`;

// 미션 상태 확인
export const fetchMissionStatus =
  async (): Promise<FetchMissionStatusResponse> => {
    const response = await fetch(`${BASE_URL}/status`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch mission status');
    }
    return response.json();
  };

// 미션 완료 요청
export const updateMissionStatus = async (missionStatusData: {
  oneContent: boolean;
  bookmark: boolean;
  quiz: boolean;
}): Promise<UpdateMissionStatusResponse> => {
  const response = await fetch(`${BASE_URL}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ missionStatusData }),
  });
  if (!response.ok) {
    throw new Error('Failed to update mission status');
  }
  return response.json();
};
