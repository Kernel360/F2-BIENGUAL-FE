/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createScrap, deleteScrap } from '@/api/queries/scrapQueries';

export const useHandleScrap = (
  contentId: number,
  initialIsScrapped: boolean,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const newScrapState = !initialIsScrapped;
      if (newScrapState) {
        await createScrap(contentId);
      } else {
        await deleteScrap(contentId);
      }
      return newScrapState;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['content', contentId] });

      const previousReadingPreview = queryClient.getQueryData([
        'readingPreview',
      ]);
      const previousListeningPreview = queryClient.getQueryData([
        'listeningPreview',
      ]);
      const previousDetail = queryClient.getQueryData([
        'contentDetail',
        contentId,
      ]);

      // 리딩 프리뷰 목록 낙관 업데이트
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
                  ? { ...content, isScrapped: !initialIsScrapped }
                  : content,
              ),
            },
          };
        }
        return old;
      });

      // 리스닝 프리뷰 목록 낙관 업데이트
      queryClient.setQueryData(['listeningPreview'], (old: any) => {
        if (
          old?.data?.listeningPreview &&
          Array.isArray(old.data.listeningPreview)
        ) {
          return {
            ...old,
            data: {
              ...old.data,
              listeningPreview: old.data.listeningPreview.map((content: any) =>
                content.contentId === contentId
                  ? { ...content, isScrapped: !initialIsScrapped }
                  : content,
              ),
            },
          };
        }
        return old;
      });

      // 콘텐츠 디테일 낙관적 업데이트
      queryClient.setQueryData(['contentDetail', contentId], (old: any) => {
        if (old?.data) {
          return {
            ...old,
            data: {
              ...old.data,
              isScrapped: !initialIsScrapped,
            },
          };
        }
        return old;
      });

      return {
        previousReadingPreview,
        previousListeningPreview,
        previousDetail,
      };
    },

    onError: (error, variables, context) => {
      if (context?.previousReadingPreview) {
        queryClient.setQueryData(
          ['readingPreview'],
          context.previousReadingPreview,
        );
      }
      if (context?.previousListeningPreview) {
        queryClient.setQueryData(
          ['listeningPreview'],
          context.previousListeningPreview,
        );
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(
          ['contentDetail', contentId],
          context.previousDetail,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['readingPreview'] });
      queryClient.invalidateQueries({ queryKey: ['listeningPreview'] });
      queryClient.invalidateQueries({ queryKey: ['contentDetail', contentId] });
    },
  });

  return { toggleScrap: mutation.mutate };
};
