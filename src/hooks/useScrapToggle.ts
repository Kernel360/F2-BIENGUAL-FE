/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createScrap, deleteScrap } from '@/api/queries/scrapQueries';

interface UseScrapToggleProps {
  contentId: number;
  page?: number;
  target:
    | 'readingPreview'
    | 'listeningPreview'
    | 'contentDetail'
    | 'paginatedReadingPreview'
    | 'paginatedListeningPreview';
}

// TODO(@smosco): 추후 page 뿐만 아니라 sort, direction, search 가 추가되었을 때 props를 어떻게 받아야 할지 모르겠음
export const useScrapToggle = ({
  contentId,
  page,
  target,
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
        readingPreview: queryClient.getQueryData(['readingPreview']),
        listeningPreview: queryClient.getQueryData(['listeningPreview']),
        contentDetail: queryClient.getQueryData(['contentDetail', contentId]),
        paginatedReadingPreview: queryClient.getQueryData([
          'paginatedReadingPreview',
          page,
        ]),
        paginatedListeningPreview: queryClient.getQueryData([
          'paginatedListeningPreview',
          page,
        ]),
      };

      switch (target) {
        case 'readingPreview':
          queryClient.setQueryData(['readingPreview'], (old: any) => {
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
          queryClient.setQueryData(['listeningPreview'], (old: any) => {
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
          queryClient.setQueryData(['contentDetail', contentId], (old: any) =>
            old
              ? { ...old, data: { ...old.data, isScrapped: !isScrapped } }
              : old,
          );
          break;

        case 'paginatedReadingPreview':
          queryClient.setQueryData(
            ['paginatedReadingPreview', page],
            (old: any) => {
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
            },
          );
          break;

        case 'paginatedListeningPreview':
          queryClient.setQueryData(
            ['paginatedListeningPreview', page],
            (old: any) => {
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
            },
          );
          break;
      }

      return previousData;
    },
    onError: (error, isScrapped, context) => {
      if (context) {
        switch (target) {
          case 'readingPreview':
            queryClient.setQueryData(
              ['readingPreview'],
              context.readingPreview,
            );
            break;
          case 'listeningPreview':
            queryClient.setQueryData(
              ['listeningPreview'],
              context.listeningPreview,
            );
            break;
          case 'contentDetail':
            queryClient.setQueryData(
              ['contentDetail', contentId],
              context.contentDetail,
            );
            break;
          case 'paginatedReadingPreview':
            queryClient.setQueryData(
              ['paginatedReadingPreview', page],
              context.paginatedReadingPreview,
            );
            break;
          case 'paginatedListeningPreview':
            queryClient.setQueryData(
              ['paginatedListeningPreview', page],
              context.paginatedListeningPreview,
            );
            break;
        }
      }
    },
    onSettled: () => {
      switch (target) {
        case 'readingPreview':
          queryClient.invalidateQueries({ queryKey: ['readingPreview'] });
          break;
        case 'listeningPreview':
          queryClient.invalidateQueries({ queryKey: ['listeningPreview'] });
          break;
        case 'contentDetail':
          queryClient.invalidateQueries({
            queryKey: ['contentDetail', contentId],
          });
          break;
        case 'paginatedReadingPreview':
          if (page) {
            queryClient.invalidateQueries({
              queryKey: ['paginatedReadingPreview', page],
            });
          }
          break;
        case 'paginatedListeningPreview':
          if (page) {
            queryClient.invalidateQueries({
              queryKey: ['paginatedListeningPreview', page],
            });
          }
          break;
      }
    },
  });

  return { toggleScrap: (isScrapped: boolean) => mutation.mutate(isScrapped) };
};
