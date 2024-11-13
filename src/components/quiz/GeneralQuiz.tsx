'use client';

import { useState } from 'react';

import { useCheckQuestionAnswer } from '@/api/hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GeneralQuizProps {
  question: string;
  questionId: string;
  examples: string[];
  onNext?: () => void;
}

export default function GeneralQuiz({
  question,
  questionId,
  examples,
  onNext,
}: GeneralQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { mutate: checkAnswer } = useCheckQuestionAnswer();

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);

    checkAnswer(
      { questionId, answer },
      {
        onSuccess: (response) => {
          setIsCorrect(response.data);
        },
        onError: () => {
          setIsCorrect(false);
        },
      },
    );
  };

  return (
    <div className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Question 2 of 5</span>
        </div>
        <CardTitle className="text-xl font-medium">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {examples.map((example) => {
          const isSelected = selectedAnswer === example;
          const isCorrectAnswer = isSelected && isCorrect === true;
          const isWrongAnswer = isSelected && isCorrect === false;

          return (
            <Button
              key={example}
              onClick={() => handleAnswerSelect(example)}
              disabled={isCorrect !== null}
              className={cn(
                'w-full justify-start text-left h-auto p-4 text-base font-normal',
                isCorrectAnswer &&
                  'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700',
                isWrongAnswer && 'bg-red-500 text-white hover:bg-red-600',
                !isSelected && 'hover:bg-accent',
              )}
              variant="outline"
            >
              {example}
            </Button>
          );
        })}
        {isCorrect !== null && (
          <Button className="w-full mt-6" onClick={onNext} variant="default">
            다음 문제 풀기
          </Button>
        )}
      </CardContent>
    </div>
  );
}
