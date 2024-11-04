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
    ].filter((value) => value !== undefined),
    // TODO(@smosco): 외부 스크랩 할 때 setQueryData 또는 invalidate 하기 위해 정확한 queryKey가 필요함
    // null 값으로 오면 queryKey가 이상하므로 임시 방편으로 filter를 적용함
    // 다만 나중에 sort, direction, categoryId가 들어오는 경우 순서가 유지 되지 않으므로 문제 발생
    // 따라서 어디서든지 간에 default 값을 넘길 필요가 있음
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
    ].filter((value) => value !== undefined),
    // TODO(@smosco): 외부 스크랩 할 때 setQueryData 또는 invalidate 하기 위해 정확한 queryKey가 필요함
    // null 값으로 오면 queryKey가 이상하므로 임시 방편으로 filter를 적용함
    // 다만 나중에 sort, direction, categoryId가 들어오는 경우 순서가 유지 되지 않으므로 문제 발생
    // 따라서 어디서든지 간에 default 값을 넘길 필요가 있음
    queryFn: () =>
      fetchPaginatedListeningPreview(page, size, sort, direction, categoryId),
  });
};
