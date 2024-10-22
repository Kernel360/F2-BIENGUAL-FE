import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  FetchScrapResponse,
  CreateScrapResponse,
  DeleteScrapResponse,
  CheckScrapResponse,
} from '@/types/Scrap';

import {
  fetchScrap,
  deleteScrap,
  createScrap,
  checkScrap,
} from '../queries/scrapQueries';

import { useQueryLoginOnly } from './common';

// 스크랩 조회 훅
export const useFetchScrap = () => {
  return useQueryLoginOnly<FetchScrapResponse>({
    queryKey: ['scrap'],
    queryFn: () => fetchScrap(),
  });
};

// 스크랩 확인 훅
export const useCheckScrap = (contentId: number) => {
  return useQueryLoginOnly<CheckScrapResponse>({
    queryKey: ['scrap', contentId],
    queryFn: () => checkScrap(contentId),
  });
};

// 스크랩 생성 훅
export const useCreateScrap = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<CreateScrapResponse, Error>({
    mutationFn: () => createScrap(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scrap'] });
    },
  });
};

// 스크랩 삭제 훅
export const useDeleteScrap = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<DeleteScrapResponse, Error>({
    mutationFn: () => deleteScrap(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scrap'] });
    },
  });
};
