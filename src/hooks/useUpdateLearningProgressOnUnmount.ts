import { useEffect, useRef } from 'react';

import { useUpdateLearningProgress } from '@/api/hooks/useLearningProgress';

export const useUpdateLearningProgressOnUnmount = (
  contentId: number,
  progress: number,
) => {
  const { mutate: updateLearningProgress } =
    useUpdateLearningProgress(contentId);
  const scrollProgressRef = useRef<number>(progress);

  useEffect(() => {
    if (scrollProgressRef.current < progress) {
      scrollProgressRef.current = progress;
    }
  }, [progress]);

  useEffect(() => {
    return () => {
      // 학습률이 0보다 크면 기록
      if (scrollProgressRef.current > 0) {
        // console.log('학습율 업데이트', scrollProgressRef.current);
        updateLearningProgress({
          contentId,
          learningRate: scrollProgressRef.current,
        });
      }
    };
  }, []);
};
