import { useQueryClient } from '@tanstack/react-query';

import {
  useCreateBookmark,
  useDeleteBookmark,
  useUpdateBookmark,
} from '@/api/hooks/useBookmarks';
import { useToast } from '@/hooks/use-toast';

export default function useHandleBookmark(contentId: number) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createBookmarkMutation = useCreateBookmark(contentId);
  const deleteBookmarkMutation = useDeleteBookmark(contentId);
  const updateBookmarkMutation = useUpdateBookmark(contentId);

  const refetchContentDetail = () => {
    queryClient.invalidateQueries({ queryKey: ['contentDetail', contentId] });
  };

  // const { data: bookmarkData, refetch: refetchBookmarks } =
  //   useFetchBookmarksByContendId(contentId);

  const addBookmark = (targetSubtitleIndex: number) => {
    if (targetSubtitleIndex !== null && targetSubtitleIndex !== undefined) {
      createBookmarkMutation.mutate(
        {
          sentenceIndex: targetSubtitleIndex,
        },
        {
          onSuccess: () => {
            refetchContentDetail(); // bookmark 추가 후 전체 디테일 데이터 refetch
          },
        },
      );
    } else {
      toast({
        title: '이미 해당 시간에 북마크가 존재합니다.',
        duration: 1000,
      });
    }
  };

  const removeBookmarkMemo = (
    bookmarkIdToDelete: number,
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: () => void;
      onError?: (error: unknown) => void;
    } = {},
  ) => {
    deleteBookmarkMutation.mutate(bookmarkIdToDelete, {
      onSuccess: () => {
        refetchContentDetail(); // bookmark 삭제 후 전체 디테일 데이터 refetch
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error) => {
        if (onError) {
          onError(error);
        }
      },
    });
  };

  const addMemo = (targetSubtitleIndex: number, description: string) => {
    createBookmarkMutation.mutate(
      {
        sentenceIndex: targetSubtitleIndex,
        description,
      },
      {
        onSuccess: () => {
          refetchContentDetail(); // memo 추가 후 전체 디테일 데이터 refetch
        },
      },
    );
  };

  const updateMemo = (bookmarkId: number, description: string) => {
    updateBookmarkMutation.mutate(
      { bookmarkId, description },
      {
        onSuccess: () => {
          refetchContentDetail(); // memo 업데이트 후 전체 디테일 데이터 refetch
        },
      },
    );
  };

  return {
    isAddBookmarkPending: createBookmarkMutation.isPending,
    addBookmark,
    isRemoveBookmarkMemoPending: deleteBookmarkMutation.isPending,
    removeBookmarkMemo,
    addMemo,
    updateMemo,
  };
}
