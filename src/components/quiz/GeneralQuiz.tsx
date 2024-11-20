'use client';

import { useState } from 'react';

import {
  useFetchMissionStatus,
  useUpdateMissionStatus,
} from '@/api/hooks/useMission';
import { useCheckQuestionAnswer } from '@/api/hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { QuestionState, DomainEvent } from '@/lib/quizReducer';
import { cn } from '@/lib/utils';

interface GeneralQuizProps {
  question: QuestionState;
  dispatch: React.Dispatch<DomainEvent>;
  onNext?: () => void;
}

export default function GeneralQuiz({
  question,
  dispatch,
  onNext,
}: GeneralQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const { mutate: checkAnswer } = useCheckQuestionAnswer();

  const { data: missionStatus } = useFetchMissionStatus();
  const { mutate: updateMissionStatus } = useUpdateMissionStatus();

  const toast = useToast();

  const handleSubmitAnswer = (questionId: string, answer: number) => {
    const event: DomainEvent = {
      type: 'submit_answer',
      questionId,
      answer,
    };
    dispatch(event);
  };

  const handleAnswerResponse = (questionId: string, ok: boolean) => {
    const event: DomainEvent = {
      type: 'response_question_result',
      questionId,
      ok,
    };
    dispatch(event);
  };

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer);
    handleSubmitAnswer(question.questionId, answer);

    checkAnswer(
      { questionId: question.questionId, answer: `${answer}` },
      {
        onSuccess: (response) => {
          const ok = response.data;
          handleAnswerResponse(question.questionId, ok);
          if (ok) toast.toast({ description: '5 포인트 획득!' });
          if (!missionStatus?.data.quiz) {
            updateMissionStatus({ quiz: true });
          }
        },
        onError: () => {
          handleAnswerResponse(question.questionId, false);
        },
      },
    );
  };

  return (
    <div className="w-full">
      <CardHeader className="space-y-4">
        <CardTitle className="text-lg font-medium">
          {question.question}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {question.examples.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = isSelected && question.status === 'correct';
          const isWrongAnswer = isSelected && question.status === 'wrong';

          return (
            <Button
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={cn(
                'w-full justify-start text-left h-auto p-4 break-words whitespace-normal',
                isCorrectAnswer &&
                  'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:text-white',
                isWrongAnswer &&
                  'bg-red-500 text-white hover:bg-red-600 hover:text-white',
                !isSelected && 'hover:bg-accent',
              )}
              variant="outline"
            >
              {option}
            </Button>
          );
        })}

        {question.status !== 'ready' && (
          <Button className="w-full mt-6" onClick={onNext} variant="default">
            다음 문제 풀기
          </Button>
        )}
      </CardContent>
    </div>
  );
}
