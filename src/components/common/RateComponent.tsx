import { useState } from 'react';

import { useCreateContentsFeedback } from '@/api/hooks/useContent';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { LevelType } from '@/types/Level';
/* TODO(@godhyzzang)내가 이전에 등록했던 customLevel이 있으면 선택한 값과 함께 등록 완료 컴포넌트 보여줘야함 */

export default function RateComponent({ contentId }: { contentId: number }) {
  const createContentsFeedbackMutation = useCreateContentsFeedback(contentId);
  const [selectedLevel, setSelectedLevel] = useState<
    'LOW' | 'MEDIUM' | 'HIGH' | null
  >(null);

  const [success, setSuccess] = useState(false);

  const handleSubmitRate = (level: LevelType) => {
    createContentsFeedbackMutation.mutate(level, {
      onSuccess: () => {
        setSuccess(true);
        toast({ description: '평가가 성공적으로 제출되었습니다.' });
      },
      onError: () => {
        toast({ description: '평가를 제출하지 못했습니다.' });
      },
    });
  };
  const getLevel = (level: LevelType) => {
    if (level === 'LOW') return '하';
    if (level === 'MEDIUM') return '중';
    if (level === 'HIGH') return '상';
    return '';
  };
  return (
    <div className="flex flex-col justify-start gap-3 p-4 border rounded">
      <h2 className="text-lg font-bold">컨텐츠 난이도 평가</h2>
      <h4 className="text-md font-medium">
        이 컨텐츠를 학습하면서 얼마나 어려웠나요?
      </h4>
      <div className="flex flex-col">
        <div className="flex justify-center items-center gap-10 p-4">
          {['HIGH', 'MEDIUM', 'LOW'].map((level) => (
            <Button
              key={level}
              type="button"
              variant="outline"
              className={`hover:bg-violet-200 ${
                selectedLevel === level && 'bg-violet-300 text-white'
              }`}
              onClick={() => {
                setSelectedLevel(level as 'LOW' | 'MEDIUM' | 'HIGH');
              }}
              disabled={createContentsFeedbackMutation.status === 'pending'}
            >
              {getLevel(level as LevelType)}
            </Button>
          ))}
        </div>
        {selectedLevel && !success && (
          <Button
            type="button"
            variant="default"
            className="flex justify-center items-center"
            onClick={() => {
              handleSubmitRate(selectedLevel);
            }}
            disabled={createContentsFeedbackMutation.status === 'pending'}
          >
            평가 등록하기
          </Button>
        )}
        {success && (
          <Button
            type="button"
            variant="outline"
            className="flex justify-center items-center"
            disabled
          >
            평가 등록이 완료되었습니다
          </Button>
        )}
      </div>
    </div>
  );
}
