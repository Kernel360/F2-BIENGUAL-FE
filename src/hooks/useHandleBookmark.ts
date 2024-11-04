import {
  useCreateBookmark,
  useDeleteBookmark,
  useUpdateBookmark,
} from '@/api/hooks/useBookmarks';
import { useToast } from '@/hooks/use-toast';

export default function useHandleBookmark(contentId: number) {
  const { toast } = useToast();

  const createBookmarkMutation = useCreateBookmark(contentId);
  const deleteBookmarkMutation = useDeleteBookmark(contentId);
  const updateBookmarkMutation = useUpdateBookmark(contentId);

  const addBookmark = (targetSubtitleIndex: number) => {
    if (targetSubtitleIndex !== null && targetSubtitleIndex !== undefined) {
      createBookmarkMutation.mutate({
        sentenceIndex: targetSubtitleIndex,
      });
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
    createBookmarkMutation.mutate({
      sentenceIndex: targetSubtitleIndex,
      description,
    });
  };

  const updateMemo = (bookmarkId: number, description: string) => {
    updateBookmarkMutation.mutate({ bookmarkId, description });
  };

  return {
    addBookmark,
    removeBookmarkMemo,
    addMemo,
    updateMemo,
  };
}
