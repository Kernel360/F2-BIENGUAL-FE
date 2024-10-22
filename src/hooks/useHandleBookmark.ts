import {
  useFetchBookmarksByContendId,
  useCreateBookmark,
} from '@/api/hooks/useBookmarks';
import { useToast } from '@/hooks/use-toast';

export default function useHandleBookmark(contentId: number) {
  const { toast } = useToast();
  const { data: bookmarkData, refetch: refetchBookmarks } =
    useFetchBookmarksByContendId(contentId);
  const createBookmarkMutation = useCreateBookmark(contentId);

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

  return { addBookmark };
}
