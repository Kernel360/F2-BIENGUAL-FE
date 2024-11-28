import { apiClient } from '@/lib/apiClient';
import { ReducePointResponse } from '@/types/Point';

// 포인트 차감 (POST)
export const reducePoints = async (
  contentId: string,
): Promise<ReducePointResponse> => {
  return apiClient<ReducePointResponse>(
    `/point/payment/recent-content?contentId=${contentId}`,
    {
      method: 'POST',
    },
  );
};
