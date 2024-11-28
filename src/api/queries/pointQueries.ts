import { apiClient } from '@/lib/apiClient';
import { ReducePointResponse } from '@/types/Point';

// 포인트 차감 (POST)
export const reducePoints = async (
  contentId: number,
): Promise<ReducePointResponse> => {
  return apiClient<ReducePointResponse>('/point/payment/recent-content', {
    method: 'POST',
    body: JSON.stringify(contentId),
  });
};
