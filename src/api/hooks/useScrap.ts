import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  FetchScrapResponse,
  CreateScrapResponse,
  DeleteScrapResponse,
} from '@/types/Scrap';

import { useQueryLoginOnly } from './common';
import { fetchScrap, deleteScrap, createScrap } from '../queries/scrapQueries';

// 스크랩 조회 훅
export const useFetchScrap = () => {
  return useQueryLoginOnly<FetchScrapResponse>({
    queryKey: ['scrap'],
    queryFn: () => fetchScrap(),
  });
};

// 스크랩 생성 훅
export const useCreateScrap = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<CreateScrapResponse, Error>({
    mutationFn: () => createScrap(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scrap', contentId] });
    },
  });
};

// 스크랩 삭제 훅
export const useDeleteScrap = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<DeleteScrapResponse, Error>({
    mutationFn: () => deleteScrap(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scrap', contentId] });
    },
  });
};
