import { apiClient } from '@/lib/apiClient';

import {
  Bookmark,
  BookmarkListResponse,
  BookmarkByContentIdResponse,
} from '../../types/Bookmark';

// 모든 북마크 조회 (GET)
export const fetchAllBookmarks = async (): Promise<BookmarkListResponse> => {
  return apiClient<BookmarkListResponse>('/bookmark/view', {
    method: 'GET',
  });
};

// 특정 콘텐츠 ID로 북마크 조회 (GET)
export const fetchBookmarksByContentId = async (
  contentId: number,
): Promise<BookmarkByContentIdResponse> => {
  return apiClient<BookmarkByContentIdResponse>(`/bookmark/view/${contentId}`, {
    method: 'GET',
  });
};

// 북마크 생성 (POST)
export const createBookmark = async (
  contentId: number,
  bookmark: { sentenceIndex: number; wordIndex?: number; description?: string },
): Promise<Bookmark> => {
  return apiClient<Bookmark>(`/bookmark/create/${contentId}`, {
    method: 'POST',
    body: JSON.stringify(bookmark),
  });
};

// 북마크 메모 수정 (PUT)
export const updateBookmark = async (
  contentId: number,
  bookmarkId: number,
  description: string,
): Promise<Bookmark> => {
  return apiClient<Bookmark>(`/bookmark/update/${contentId}`, {
    method: 'PUT',
    body: JSON.stringify({ bookmarkId, description }),
  });
};

// 북마크 삭제 (DELETE)
export const deleteBookmark = async (bookmarkId: number): Promise<void> => {
  return apiClient<void>(`/bookmark/delete/${bookmarkId}`, {
    method: 'DELETE',
  });
};
