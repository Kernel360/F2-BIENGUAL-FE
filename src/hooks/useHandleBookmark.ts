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

  const addBookmark = async (targetSubtitleIndex: number) => {
    if (targetSubtitleIndex !== null && targetSubtitleIndex !== undefined) {
      try {
        await createBookmarkMutation.mutateAsync({
          sentenceIndex: targetSubtitleIndex,
        });
        return true;
      } catch (error) {
        console.error('Bookmark creation failed', error);
        return false;
      }
    } else {
      toast({
        title: '이미 해당 시간에 북마크가 존재합니다.',
        duration: 1000,
      });
      return false;
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

  const addMemo = async (targetSubtitleIndex: number, description: string) => {
    try {
      await createBookmarkMutation.mutateAsync({
        sentenceIndex: targetSubtitleIndex,
        description,
      });
      return true;
    } catch (error) {
      console.error('메모 생성 실패', error);
      return false;
    }
  };

  const updateMemo = (bookmarkId: number, description: string) => {
    updateBookmarkMutation.mutateAsync({ bookmarkId, description });
  };

  return {
    addBookmark,
    removeBookmarkMemo,
    addMemo,
    updateMemo,
  };
}
