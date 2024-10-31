// src/api/hooks/useBookmarks.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useQueryLoginOnly } from './common';
import {
  BookmarkListResponse,
  BookmarkByContentIdResponse,
  Bookmark,
  BookmarkByContentId,
} from '../../types/Bookmark';
import {
  fetchBookmarksByContentId,
  fetchAllBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} from '../queries/bookmarkQueries';

// 북마크 조회 훅

export const useFetchBookmarksByContendId = (contentId: number) => {
  return useQueryLoginOnly<BookmarkByContentIdResponse>({
    queryKey: ['bookmarks', contentId],
    queryFn: () => fetchBookmarksByContentId(contentId),
  });
};

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
      await queryClient.cancelQueries({ queryKey: ['bookmarks', contentId] });
      // Snapshot the previous value
      const previousBookmarks =
        queryClient.getQueryData<BookmarkByContentIdResponse>([
          'bookmarks',
          contentId,
        ]);
      // 캐시에 optimistically update
      queryClient.setQueryData(['bookmarks', contentId], {
        ...previousBookmarks,
        data: {
          bookmarkList: [
            ...(previousBookmarks?.data.bookmarkList || []),
            newBookmark,
          ],
        },
      });
      return { previousBookmarks };
    },

    // 에러가 발생할 경우 onMute에서 보관한 캐시데이터가 있다면 복원
    onError: (err, newBookmark, context) => {
      const ctx = context as { previousBookmarks?: BookmarkByContentId[] };

      if (ctx.previousBookmarks) {
        queryClient.setQueryData(
          ['bookmarks', contentId],
          ctx.previousBookmarks,
        );
      }
    },

    // 성공 여부와 관계없이 항상 refetch
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookmarks', contentId],
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
      await queryClient.cancelQueries({ queryKey: ['bookmarks', contentId] });
      const previousBookmarks =
        queryClient.getQueryData<BookmarkByContentIdResponse>([
          'bookmarks',
          contentId,
        ]);
      // 캐시에 optimistically update
      queryClient.setQueryData(['bookmarks', contentId], {
        ...previousBookmarks,
        data: {
          bookmarkList: [
            ...(previousBookmarks?.data.bookmarkList.map((bookmark) => {
              // 해당 bookmarkId에 해당하는 북마크의 description을 업데이트
              if (bookmark.bookmarkId === bookmarkId) {
                return {
                  ...bookmark, // 기존의 모든 속성 유지
                  description, // 새로운 description으로 업데이트
                };
              }
              return bookmark; // 변동 없는 북마크는 그대로 반환
            }) || []),
          ],
        },
      });
    },
    // 에러가 발생할 경우 onMute에서 보관한 데이터가 있다면 복원
    onError: (err, bookmarkId, context) => {
      const ctx = context as { previousBookmarks?: BookmarkByContentId[] };

      if (ctx.previousBookmarks) {
        queryClient.setQueryData(
          ['bookmarks', contentId],
          ctx.previousBookmarks,
        );
      }
    },
    // 성공 여부와 관계없이 항상 refetch
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', contentId] });
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
      await queryClient.cancelQueries({ queryKey: ['bookmarks', contentId] });
      const previousBookmarks =
        queryClient.getQueryData<BookmarkByContentIdResponse>([
          'bookmarks',
          contentId,
        ]);
      // 캐시에 optimistically update
      queryClient.setQueryData(['bookmarks', contentId], {
        ...previousBookmarks,
        data: {
          bookmarkList: [
            ...(previousBookmarks?.data.bookmarkList.filter(
              (bookmark) => bookmark.bookmarkId !== bookmarkId,
            ) || []),
          ],
        },
      });
      return { previousBookmarks };
    },
    // 에러가 발생할 경우 onMute에서 보관한 캐시데이터가 있다면 복원
    onError: (err, bookmarkId, context) => {
      const ctx = context as { previousBookmarks?: BookmarkByContentId[] };

      if (ctx.previousBookmarks) {
        queryClient.setQueryData(
          ['bookmarks', contentId],
          ctx.previousBookmarks,
        );
      }
    },
    // 성공 여부와 관계없이 항상 refetch
    onSettled: async () => {
      const result = await queryClient.invalidateQueries({
        queryKey: ['bookmarks', contentId],
      });
      return result;
    },
  });
};
