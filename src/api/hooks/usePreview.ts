import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  ContentsResponse,
  ListeningPreviewResponse,
  ReadingPreviewResponse,
} from '../../types/Preview';
import {
  fetchListeningContents,
  fetchListeningPreview,
  fetchReadingContents,
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

export const useReadingContents = (
  page = 0,
  size = 5,
  sort = 'createdAt',
  direction = 'DESC',
  initialData?: ContentsResponse,
): UseQueryResult<ContentsResponse> => {
  return useQuery({
    queryKey: ['readingContentsData', page, size, sort, direction],
    queryFn: () => fetchListeningContents(page, size, sort, direction),
    initialData, // 서버에서 받은 데이터를 초기값으로 사용
  });
};

export const useListeningContents = (
  page = 0,
  size = 5,
  sort = 'createdAt',
  direction = 'DESC',
): UseQueryResult<ContentsResponse> => {
  return useQuery({
    queryKey: ['listeningSortedContentsData', page, size, sort, direction],
    queryFn: () => fetchListeningContents(page, size, sort, direction),
  });
};
