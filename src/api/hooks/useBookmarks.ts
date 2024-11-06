// src/api/hooks/useBookmarks.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ContentDetailResponse } from '@/types/ContentDetail';

import { useQueryLoginOnly } from './common';
import {
  BookmarkListResponse,
  Bookmark,
  BookmarkByContentId,
} from '../../types/Bookmark';
import {
  fetchAllBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} from '../queries/bookmarkQueries';

// 북마크 조회 훅

export const useFetchAllBookmarks = () => {
  return useQueryLoginOnly<BookmarkListResponse>({
    queryKey: ['bookmarks'],
    queryFn: () => fetchAllBookmarks(),
  });
};

// 북마크 생성 훅 : optimistic update적용
export const useCreateBookmark = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    Bookmark,
    Error,
    { sentenceIndex: number; wordIndex?: number; description?: string }
  >({
    mutationFn: (newBookmark) => createBookmark(contentId, newBookmark),
    // when mutation is called:
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries({
        queryKey: ['contentDetail', contentId],
      });
      // Snapshot the previous value
      const previousData = queryClient.getQueryData<ContentDetailResponse>([
        'contentDetail',
        contentId,
      ]);
      // 캐시에 optimistically update
      queryClient.setQueryData(['contentDetail', contentId], {
        ...previousData,
        data: {
          ...previousData?.data,
          scriptList:
            previousData?.data.scriptList.map((script, index) => {
              if (index === newBookmark.sentenceIndex) {
                return {
                  ...script,
                  isHighlighted: true, // 새로운 description으로 업데이트
                  description: newBookmark.description,
                };
              }
              return script; // 변동 없는 스크립트는 그대로 반환
            }) || [],
        },
      });

      return { previousData };
    },

    // 에러가 발생할 경우 onMute에서 보관한 캐시데이터가 있다면 복원
    onError: (err, newBookmark, context) => {
      const ctx = context as { previousData?: BookmarkByContentId[] };

      if (ctx.previousData) {
        queryClient.setQueryData(
          ['contentDetail', contentId],
          ctx.previousData,
        );
      }
    },

    // 성공 여부와 관계없이 항상 refetch
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['contentDetail', contentId],
      });
    },
  });
};

// 북마크 수정 훅 : optimistic update적용
export const useUpdateBookmark = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    Bookmark,
    Error,
    { bookmarkId: number; description: string }
  >({
    mutationFn: ({ bookmarkId, description }) =>
      updateBookmark(contentId, bookmarkId, description),
    // when mutation is called:
    onMutate: async ({ bookmarkId, description }) => {
      await queryClient.cancelQueries({
        queryKey: ['contentDetail', contentId],
      });
      const previousData = queryClient.getQueryData<ContentDetailResponse>([
        'contentDetail',
        contentId,
      ]);
      // 캐시에 optimistically update
      queryClient.setQueryData(['contentDetail', contentId], {
        ...previousData,
        data: {
          ...previousData?.data,
          scriptList:
            previousData?.data.scriptList.map((script) => {
              if (script.bookmarkId === bookmarkId) {
                return {
                  ...script,
                  description, // 새로운 description으로 업데이트
                };
              }
              return script; // 변동 없는 스크립트는 그대로 반환
            }) || [],
        },
      });
    },
    // 에러가 발생할 경우 onMute에서 보관한 데이터가 있다면 복원
    onError: (err, bookmarkId, context) => {
      const ctx = context as { previousData?: BookmarkByContentId[] };

      if (ctx.previousData) {
        queryClient.setQueryData(
          ['contentDetail', contentId],
          ctx.previousData,
        );
      }
    },
    // 성공 여부와 관계없이 항상 refetch
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['contentDetail', contentId] });
    },
  });
};

// 북마크 삭제 훅 : optimistic update적용
export const useDeleteBookmark = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (bookmarkId) => deleteBookmark(bookmarkId),
    // when mutation is called:
    onMutate: async (bookmarkId) => {
      await queryClient.cancelQueries({
        queryKey: ['contentDetail', contentId],
      });
      const previousData = queryClient.getQueryData<ContentDetailResponse>([
        'contentDetail',
        contentId,
      ]);
      // 캐시에 optimistically update
      queryClient.setQueryData(['contentDetail', contentId], {
        ...previousData,
        data: {
          ...previousData?.data,
          scriptList:
            previousData?.data.scriptList.map((script) => {
              if (script.bookmarkId === bookmarkId) {
                return {
                  ...script,
                  // bookmarkId: null,
                  isHighlighted: false, // isHighlighted를 false로 업데이트
                  description: null, // description을 빈 문자열로 업데이트
                };
              }
              return script; // 변동 없는 스크립트는 그대로 반환
            }) || [],
        },
      });
      return { previousData };
    },
    // 에러가 발생할 경우 onMute에서 보관한 캐시데이터가 있다면 복원
    onError: (err, bookmarkId, context) => {
      const ctx = context as { previousData?: BookmarkByContentId[] };

      if (ctx.previousData) {
        queryClient.setQueryData(
          ['contentDetail', contentId],
          ctx.previousData,
        );
      }
    },
    // 성공 여부와 관계없이 항상 refetch
    onSettled: async () => {
      const result = await queryClient.invalidateQueries({
        queryKey: ['contentDetail', contentId],
      });
      return result;
    },
  });
};
