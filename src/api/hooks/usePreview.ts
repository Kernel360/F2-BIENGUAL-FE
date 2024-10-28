import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  ContentsResponse,
  ListeningPreviewResponse,
  ReadingPreviewResponse,
} from '../../types/Preview';
import {
  fetchPaginatedReadingPreview,
  fetchListeningPreview,
  fetchPaginatedListeningPreview,
  fetchReadingPreview,
} from '../queries/contentsQueries';

export const useReadingPreview = (): UseQueryResult<ReadingPreviewResponse> => {
  return useQuery({
    queryKey: ['readingPreviewData'],
    queryFn: () => fetchReadingPreview(),
  });
};

export const useListeningPreview =
  (): UseQueryResult<ListeningPreviewResponse> => {
    return useQuery({
      queryKey: ['listeningPreviewData'],
      queryFn: () => fetchListeningPreview(),
    });
  };

export const usePaginatedReadingPreview = (
  page?: number,
  size?: number,
  sort?: string,
  direction?: string,
  categoryId?: number | undefined,
  initialData?: ContentsResponse,
): UseQueryResult<ContentsResponse> => {
  return useQuery({
    queryKey: [
      'paginatedReadingPreview',
      page,
      size,
      sort,
      direction,
      categoryId,
    ],
    queryFn: () =>
      fetchPaginatedReadingPreview(page, size, sort, direction, categoryId),
    initialData, // 서버에서 받은 데이터를 초기값으로 사용
  });
};

export const usePaginatedListeningPreview = (
  page?: number,
  size?: number,
  sort?: string,
  direction?: string,
  categoryId?: number | undefined,
): UseQueryResult<ContentsResponse> => {
  return useQuery({
    queryKey: [
      'paginatedListeningPreview',
      page,
      size,
      sort,
      direction,
      categoryId,
    ],
    queryFn: () =>
      fetchPaginatedListeningPreview(page, size, sort, direction, categoryId),
  });
};
