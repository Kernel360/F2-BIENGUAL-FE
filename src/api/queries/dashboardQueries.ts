import { RecentLearningPreviewResponse } from '@/types/Dashboard';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard`;

export const fetchRecentLearningPreview =
  async (): Promise<RecentLearningPreviewResponse> => {
    const response = await fetch(`${BASE_URL}/learning/recent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };
