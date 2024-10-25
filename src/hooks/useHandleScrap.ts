import { useState, useEffect } from 'react';

import {
  useCheckScrap,
  useCreateScrap,
  useDeleteScrap,
} from '@/api/hooks/useScrap';

export default function useHandleScrap(contentId: number) {
  const [isScrapped, setIsScrapped] = useState<boolean | undefined>(undefined);
  const { data: checkScrapData } = useCheckScrap(contentId);
  const createScrapMutation = useCreateScrap(contentId);
  const deleteScrapMutation = useDeleteScrap(contentId);

  useEffect(() => {
    if (checkScrapData?.data !== undefined) {
      setIsScrapped(checkScrapData.data);
    }
  }, [checkScrapData]);

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
