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

export const useReadingContents = ({
  page,
  size,
  sort,
  direction,
}: {
  page?: number;
  size?: number;
  sort?: string;
  direction?: string;
}): UseQueryResult<ContentsResponse> => {
  return useQuery({
    queryKey: ['readingContentsData', { page, size, sort, direction }],
    queryFn: () => fetchReadingContents({ page, size, sort, direction }),
  });
};

export const useListeningContents = ({
  page,
  size,
  sort,
  direction,
}: {
  page?: number;
  size?: number;
  sort?: string;
  direction?: string;
}): UseQueryResult<ContentsResponse> => {
  return useQuery({
    queryKey: ['listeningContentsData', { page, size, sort, direction }],
    queryFn: () => fetchListeningContents({ page, size, sort, direction }),
  });
};
