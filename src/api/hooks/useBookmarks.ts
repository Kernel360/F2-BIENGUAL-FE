// src/api/hooks/useBookmarks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BookmarkListResponse,
  BookmarkByContentIdResponse,
  Bookmark,
} from '../../types/Bookmark';
import {
  fetchBookmarksByContentId,
  fetchAllBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} from '../queries/bookmarkQueries';
import { useUserLoginStatus } from './useUserInfo';

// 북마크 조회 훅
export const useFetchBookmarksByContendId = (contentId: number) => {
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = !!isLoginData?.data;

  return useQuery<BookmarkByContentIdResponse>({
    queryKey: ['bookmarks', contentId],
    queryFn: () => fetchBookmarksByContentId(contentId),
    enabled: isLogin,
  });
};

export const useFetchAllBookmarks = () => {
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = !!isLoginData?.data;
  return useQuery<BookmarkListResponse>({
    queryKey: ['bookmarks'],
    queryFn: () => fetchAllBookmarks(),
    enabled: isLogin,
  });
};

// 북마크 생성 훅
export const useCreateBookmark = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    Bookmark,
    Error,
    { sentenceIndex: number; wordIndex?: number; description?: string }
  >({
    mutationFn: (newBookmark) => createBookmark(contentId, newBookmark),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', contentId] });
    },
  });
};

// 북마크 수정 훅
export const useUpdateBookmark = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    Bookmark,
    Error,
    { bookmarkId: number; description: string }
  >({
    mutationFn: ({ bookmarkId, description }) =>
      updateBookmark(contentId, bookmarkId, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', contentId] });
    },
  });
};

// 북마크 삭제 훅
export const useDeleteBookmark = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (bookmarkId) => deleteBookmark(bookmarkId),
    onSuccess: () => {
      // 북마크 삭제 후 북마크 목록을 갱신
      queryClient.invalidateQueries({ queryKey: ['bookmarks', contentId] });
    },
  });
};
