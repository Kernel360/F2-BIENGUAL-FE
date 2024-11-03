/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createScrap, deleteScrap } from '@/api/queries/scrapQueries';

export const useScrapToggle = (
  contentId: number,
  initialIsScrapped: boolean,
  page?: number,
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

    // TODO(@smosco): 이렇게 모든 스크랩 요청에서 이전 데이터를 저장하고 성공을 가정해서 setQueryData를 하고 invalidate을 해야하는지 의문
    onMutate: () => {
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
      const previousPaginatedReadingPreview = queryClient.getQueryData([
        'paginatedReadingPreview',
        page,
      ]);
      const previousPaginatedListeningPreview = queryClient.getQueryData([
        'paginatedListeningPreview',
        page,
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

      // 리딩 페이지네이션 프리뷰 목록 낙관적 업데이트
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
                    ? { ...content, isScrapped: !initialIsScrapped }
                    : content,
                ),
              },
            };
          }

          return old;
        },
      );

      // 리스닝 페이지네이션 프리뷰 목록 낙관적 업데이트
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
                    ? { ...content, isScrapped: !initialIsScrapped }
                    : content,
                ),
              },
            };
          }

          return old;
        },
      );

      return {
        previousReadingPreview,
        previousListeningPreview,
        previousDetail,
        previousPaginatedReadingPreview,
        previousPaginatedListeningPreview,
      };
    },

    onError: (error, variables, context) => {
      // console.log(error);
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
      if (context?.previousPaginatedReadingPreview) {
        queryClient.setQueryData(
          ['paginatedReadingPreview', page],
          context.previousPaginatedReadingPreview,
        );
      }
      if (context?.previousPaginatedListeningPreview) {
        queryClient.setQueryData(
          ['paginatedListeningPreview', page],
          context.previousPaginatedListeningPreview,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['readingPreview'] });
      queryClient.invalidateQueries({ queryKey: ['listeningPreview'] });
      queryClient.invalidateQueries({ queryKey: ['contentDetail', contentId] });
      queryClient.invalidateQueries({
        queryKey: ['paginatedReadingPreview', page],
      });
      queryClient.invalidateQueries({
        queryKey: ['paginatedListeningPreview', page],
      });
    },
  });

  return { toggleScrap: mutation.mutate };
};
