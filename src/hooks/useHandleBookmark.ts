import {
  useFetchBookmarksByContendId,
  useCreateBookmark,
  useDeleteBookmark,
  useUpdateBookmark,
} from '@/api/hooks/useBookmarks';
import { useToast } from '@/hooks/use-toast';

export default function useHandleBookmark(contentId: number) {
  const { toast } = useToast();
  const { data: bookmarkData, refetch: refetchBookmarks } =
    useFetchBookmarksByContendId(contentId);
  const createBookmarkMutation = useCreateBookmark(contentId);
  const deleteBookmarkMutation = useDeleteBookmark(contentId);
  const updateBookmarkMutation = useUpdateBookmark(contentId);

  const addBookmark = (targetSubtitleIndex: number) => {
    if (targetSubtitleIndex !== null && targetSubtitleIndex !== undefined) {
      if (
        bookmarkData?.data.bookmarkList.find(
          (bookmark) => bookmark.sentenceIndex === targetSubtitleIndex,
        )
      ) {
        toast({
          title: '이미 해당 시간에 북마크가 존재합니다.',
          duration: 1000,
        });
        return;
      }

      createBookmarkMutation.mutate(
        {
          sentenceIndex: targetSubtitleIndex,
        },
        {
          onSuccess: () => {
            refetchBookmarks();
          },
        },
      );
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
        refetchBookmarks(); // 북마크 삭제 후 데이터 갱신
        if (onSuccess) {
          onSuccess(); // 성공 시 호출될 콜백 함수
        }
      },
      onError: (error) => {
        if (onError) {
          onError(error); // 에러 발생 시 호출될 콜백 함수
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
          refetchBookmarks(); // 메모 생성 후 목록 갱신
        },
      },
    );
  };

  const updateMemo = (bookmarkId: number, description: string) => {
    updateBookmarkMutation.mutate(
      { bookmarkId, description },
      {
        onSuccess: () => {
          refetchBookmarks(); // 메모 수정 후 목록 갱신
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
