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

export const fetchContentDetail = async (
  contentId: number,
): Promise<ContentDetailResponse> => {
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

export const fetchPaginatedReadingPreview = async (
  page?: number,
  size?: number,
  sort?: string,
  direction?: string,
  categoryId?: number | undefined,
): Promise<ContentsResponse> => {
  const queryParams = new URLSearchParams();
  if (sort) queryParams.append('sort', sort);
  if (direction) queryParams.append('direction', direction);
  if (page) queryParams.append('page', page.toString());
  if (size) queryParams.append('size', size.toString());
  if (categoryId !== undefined)
    queryParams.append('categoryId', categoryId.toString());
  const response = await fetch(
    // TODO@godhyzzang : page 1부터 시작하도록 api 수정 요청필요
    `${BASE_URL}/preview/paginated-reading?${queryParams.toString()}`,
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

export const fetchPaginatedListeningPreview = async (
  page?: number,
  size?: number,
  sort?: string,
  direction?: string,
  categoryId?: number | undefined,
): Promise<ContentsResponse> => {
  const queryParams = new URLSearchParams();
  if (sort) queryParams.append('sort', sort);
  if (direction) queryParams.append('direction', direction);
  if (page) queryParams.append('page', page.toString());
  if (size) queryParams.append('size', size.toString());
  if (categoryId !== undefined)
    queryParams.append('categoryId', categoryId.toString());

  const response = await fetch(
    // TODO@godhyzzang : page 1부터 시작하도록 api 수정 요청필요
    `${BASE_URL}/preview/paginated-listening?${queryParams.toString()}`,

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
