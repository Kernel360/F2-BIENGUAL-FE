import { useState } from 'react';

import { useCreateContentsFeedback } from '@/api/hooks/useContent';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { LevelType } from '@/types/Level';

export default function DifficultyEvaluator({
  contentId,
  customLevel,
}: {
  contentId: number;
  customLevel?: LevelType;
}) {
  const createContentsFeedbackMutation = useCreateContentsFeedback(contentId);
  const [selectedLevel, setSelectedLevel] = useState<LevelType | null>(null);
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

  const getLevelLabel = (level: LevelType) => {
    const levelLabels: { [key in LevelType]: string } = {
      LOW: '하',
      MEDIUM: '중',
      HIGH: '상',
    };
    return levelLabels[level];
  };

  const renderLevelButtons = () => (
    <div className="flex justify-center items-center gap-10 p-4">
      {['HIGH', 'MEDIUM', 'LOW'].map((level) => (
        <Button
          key={level}
          type="button"
          variant="outline"
          className={`hover:bg-violet-200 ${
            selectedLevel === level && 'bg-violet-300 text-white'
          }`}
          onClick={() => setSelectedLevel(level as LevelType)}
          disabled={createContentsFeedbackMutation.status === 'pending'}
        >
          {getLevelLabel(level as LevelType)}
        </Button>
      ))}
    </div>
  );

  const renderSubmitButton = () =>
    selectedLevel &&
    !success && (
      <Button
        type="button"
        variant="default"
        className="flex justify-center items-center"
        onClick={() => handleSubmitRate(selectedLevel)}
        disabled={createContentsFeedbackMutation.status === 'pending'}
      >
        평가 등록하기
      </Button>
    );

  const renderSuccessMessage = () =>
    success && (
      <Button
        type="button"
        variant="outline"
        className="flex justify-center items-center"
        disabled
      >
        평가 등록이 완료되었습니다
      </Button>
    );

  const renderCustomLevel = () => (
    <div className="flex  justify-start items-center gap-3 p-4 border rounded bg-white">
      <h2 className="text-lg font-bold text-gray-700">내가 평가한 난이도</h2>
      <div className="flex justify-center items-center">
        <Button
          key={customLevel}
          type="button"
          variant="outline"
          className="bg-violet-100 text-violet-700 border-violet-300"
          disabled
        >
          {getLevelLabel(customLevel!)}
        </Button>
      </div>
    </div>
  );

  const renderEvaluationForm = () => (
    <div className="flex flex-col justify-start gap-3 p-4 border rounded">
      <h2 className="text-lg font-bold">컨텐츠 난이도 평가</h2>
      <h4 className="text-md font-medium">
        이 컨텐츠를 학습하면서 얼마나 어려웠나요?
      </h4>
      <div className="flex flex-col">
        {renderLevelButtons()}
        {renderSubmitButton()}
        {renderSuccessMessage()}
      </div>
    </div>
  );

  return (
    <div>{customLevel ? renderCustomLevel() : renderEvaluationForm()}</div>
  );
}
