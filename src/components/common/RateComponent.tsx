import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useCreateContentsFeedback } from '@/api/hooks/useContent';
import { toast } from '@/hooks/use-toast';

export default function RateComponent({ contentId }: { contentId: number }) {
  const createContentsFeedbackMutation = useCreateContentsFeedback(contentId);
  const [clickedButton, setClickedButton] = useState<
    'LOW' | 'MEDIUM' | 'HIGH' | null
  >(null);
  const [contentLevel, setContentLevel] = useState<
    'LOW' | 'MEDIUM' | 'HIGH' | null
  >(null);
  const [success, setSuccess] = useState(false);

  const handleSubmitRate = (contentLevel: 'LOW' | 'MEDIUM' | 'HIGH') => {
    createContentsFeedbackMutation.mutate(contentLevel, {
      onSuccess: () => {
        setSuccess(true);
        toast({ description: '평가가 성공적으로 제출되었습니다.' });
      },
      onError: () => {
        toast({ description: '평가를 제출하지 못했습니다.' });
      },
    });
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
                clickedButton === level && 'bg-violet-300 text-white'
              }`}
              onClick={() => {
                setClickedButton(level as 'LOW' | 'MEDIUM' | 'HIGH');
                setContentLevel(level as 'LOW' | 'MEDIUM' | 'HIGH');
              }}
              disabled={createContentsFeedbackMutation.status === 'pending'}
            >
              {level === 'HIGH' ? '상' : level === 'MEDIUM' ? '중' : '하'}
            </Button>
          ))}
        </div>
        {clickedButton && !success && (
          <Button
            type="button"
            variant="default"
            className="flex justify-center items-center"
            onClick={() => {
              if (contentLevel) {
                handleSubmitRate(contentLevel);
              }
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
