import {
  ReadingPreviewResponse,
  ListeningPreviewResponse,
  ContentsResponse,
} from '@/types/Preview';

import { ContentDetailResponse } from '../../types/ContentDetail';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/contents`;

export const fetchReadingPreview =
  async (): Promise<ReadingPreviewResponse> => {
    const response = await fetch(`${BASE_URL}/preview/reading`, {
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

export const fetchListeningPreview =
  async (): Promise<ListeningPreviewResponse> => {
    const response = await fetch(`${BASE_URL}/preview/listening`, {
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

export const fetchContentDetail = async ({
  contentId,
}: {
  contentId: number;
}): Promise<ContentDetailResponse> => {
  const response = await fetch(`${BASE_URL}/details/${contentId}`, {
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

export const fetchReadingContents = async (
  page: number = 0,
  size: number = 5,
  sort: string = 'createdAt',
  direction: string = 'DESC',
): Promise<ContentsResponse> => {
  const response = await fetch(
    `${BASE_URL}/view/reading?sort=${sort}&direction=${direction}&page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const fetchListeningContents = async (
  page: number = 0,
  size: number = 5,
  sort: string = 'createdAt',
  direction: string = 'DESC',
): Promise<ContentsResponse> => {
  const response = await fetch(
    `${BASE_URL}/view/listening?sort=${sort}&direction=${direction}&page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
