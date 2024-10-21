import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  fetchListeningContents,
  fetchListeningPreview,
  fetchReadingContents,
  fetchReadingPreview,
} from '../queries/contentsQueries';
import {
  ContentsResponse,
  ListeningPreviewResponse,
  ReadingPreviewResponse,
} from '../../types/Preview';

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
): UseQueryResult<ContentsResponse> => {
  return useQuery({
    queryKey: ['readingContentsData', page, size, sort, direction],
    queryFn: () => fetchReadingContents(page, size, sort, direction),
  });
};

export const useListeningContents = (
  page = 0,
  size = 5,
  sort = 'createdAt',
  direction = 'DESC',
): UseQueryResult<ContentsResponse> => {
  return useQuery({
    queryKey: ['listeningContentsData', page, size, sort, direction],
    queryFn: () => fetchListeningContents(page, size, sort, direction),
  });
};
