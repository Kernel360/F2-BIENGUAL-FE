import { useState, useEffect } from 'react';

import { useCreateScrap, useDeleteScrap } from '@/api/hooks/useScrap';

export default function useHandleScrap(
  contentId: number,
  isScrappedData?: boolean,
) {
  const [isScrapped, setIsScrapped] = useState<boolean | undefined>(
    isScrappedData, // props로 받아온 isScrappedData를 넘겨주어서 useState로 isScrapped생성
  );

  const createScrapMutation = useCreateScrap(contentId);
  const deleteScrapMutation = useDeleteScrap(contentId);

  useEffect(() => {
    if (isScrappedData !== undefined) {
      setIsScrapped(isScrappedData);
    }
  }, [isScrappedData]);

  const toggleScraped = () => {
    if (isScrapped) {
      deleteScrapMutation.mutate(undefined, {
        onSuccess: () => {
          setIsScrapped(false);
        },
      });
    } else {
      createScrapMutation.mutate(undefined, {
        onSuccess: () => {
          setIsScrapped(true);
        },
      });
    }
  };

  return { isScrapped, toggleScraped };
}
