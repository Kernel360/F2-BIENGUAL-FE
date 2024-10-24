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
  page = 0,
  size = 5,
  sort = 'createdAt',
  direction = 'DESC',
  initialData?: ContentsResponse,
): UseQueryResult<ContentsResponse> => {
  return useQuery({
    queryKey: ['paginatedReadingPreview', page, size, sort, direction],
    queryFn: () => fetchPaginatedReadingPreview(page, size, sort, direction),
    initialData, // 서버에서 받은 데이터를 초기값으로 사용
  });
};

export const usePaginatedListeningPreview = (
  page = 0,
  size = 5,
  sort = 'createdAt',
  direction = 'DESC',
): UseQueryResult<ContentsResponse> => {
  return useQuery({
    queryKey: ['paginatedListeningPreview', page, size, sort, direction],
    queryFn: () => fetchPaginatedListeningPreview(page, size, sort, direction),
  });
};
