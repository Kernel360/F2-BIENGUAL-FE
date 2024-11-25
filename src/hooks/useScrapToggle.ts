/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createScrap, deleteScrap } from '@/api/queries/scrapQueries';

interface UseScrapToggleProps {
  contentId: number;
  queryKey: any[];
}

// TODO(@smosco): 추후 page 뿐만 아니라 sort, direction, search 가 추가되었을 때 props를 어떻게 받아야 할지 모르겠음
export const useScrapToggle = ({
  contentId,
  queryKey,
}: UseScrapToggleProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (isScrapped: boolean) => {
      if (isScrapped) {
        await deleteScrap(contentId);
      } else {
        await createScrap(contentId);
      }
      return !isScrapped;
    },
    onMutate: async (isScrapped: boolean) => {
      const previousData = {
        readingPreview: queryClient.getQueryData(queryKey),
        listeningPreview: queryClient.getQueryData(queryKey),
        contentDetail: queryClient.getQueryData(queryKey),
        paginatedReadingPreview: queryClient.getQueryData(queryKey),
        paginatedListeningPreview: queryClient.getQueryData(queryKey),
      };

      switch (queryKey[0]) {
        case 'readingPreview':
          queryClient.setQueryData(queryKey, (old: any) => {
            if (
              old?.data?.readingPreview &&
              Array.isArray(old.data.readingPreview)
            ) {
              return {
                ...old,
                data: {
                  ...old.data,
                  readingPreview: old.data.readingPreview.map((content: any) =>
                    content.contentId === contentId
                      ? { ...content, isScrapped: !isScrapped }
                      : content,
                  ),
                },
              };
            }
            return old;
          });
          break;

        case 'listeningPreview':
          queryClient.setQueryData(queryKey, (old: any) => {
            if (
              old?.data?.listeningPreview &&
              Array.isArray(old.data.listeningPreview)
            ) {
              return {
                ...old,
                data: {
                  ...old.data,
                  listeningPreview: old.data.listeningPreview.map(
                    (content: any) =>
                      content.contentId === contentId
                        ? { ...content, isScrapped: !isScrapped }
                        : content,
                  ),
                },
              };
            }
            return old;
          });
          break;

        case 'contentDetail':
          queryClient.setQueryData(queryKey, (old: any) =>
            old
              ? { ...old, data: { ...old.data, isScrapped: !isScrapped } }
              : old,
          );
          break;

        case 'paginatedReadingPreview':
          queryClient.setQueryData(queryKey, (old: any) => {
            if (old?.data?.contents && Array.isArray(old.data.contents)) {
              return {
                ...old,
                data: {
                  ...old.data,
                  contents: old.data.contents.map((content: any) =>
                    content.contentId === contentId
                      ? { ...content, isScrapped: !isScrapped }
                      : content,
                  ),
                },
              };
            }
            return old;
          });
          break;

        case 'paginatedListeningPreview':
          queryClient.setQueryData(queryKey, (old: any) => {
            if (old?.data?.contents && Array.isArray(old.data.contents)) {
              return {
                ...old,
                data: {
                  ...old.data,
                  contents: old.data.contents.map((content: any) =>
                    content.contentId === contentId
                      ? { ...content, isScrapped: !isScrapped }
                      : content,
                  ),
                },
              };
            }
            return old;
          });
          break;
      }

      return previousData;
    },
    onError: (error, isScrapped, context) => {
      if (context) {
        switch (queryKey[0]) {
          case 'readingPreview':
            queryClient.setQueryData(queryKey, context.readingPreview);
            break;
          case 'listeningPreview':
            queryClient.setQueryData(queryKey, context.listeningPreview);
            break;
          case 'contentDetail':
            queryClient.setQueryData(queryKey, context.contentDetail);
            break;
          case 'paginatedReadingPreview':
            queryClient.setQueryData(queryKey, context.paginatedReadingPreview);
            break;
          case 'paginatedListeningPreview':
            queryClient.setQueryData(
              queryKey,
              context.paginatedListeningPreview,
            );
            break;
        }
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['readingPreview'] });

      queryClient.invalidateQueries({ queryKey: ['listeningPreview'] });

      queryClient.invalidateQueries({
        queryKey: ['contentDetail', contentId],
      });

      // TODO(@smosco): paginated에 queryKey에 여러가지 담겨 있어서 어떻게 해야할지
      // 그리고 이게 이상한데...확인할 것 (쿼리키가 완전히 똑같아야하나)
      queryClient.invalidateQueries({
        queryKey: ['paginatedReadingPreview'],
      });

      queryClient.invalidateQueries({
        queryKey: ['paginatedListeningPreview'],
      });

      queryClient.invalidateQueries({
        queryKey: ['scrap'],
      });
    },
  });

  return { toggleScrap: (isScrapped: boolean) => mutation.mutate(isScrapped) };
};
