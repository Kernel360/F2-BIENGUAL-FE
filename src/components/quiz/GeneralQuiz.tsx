'use client';

import { useState } from 'react';

import { useCheckQuestionAnswer } from '@/api/hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useQuizStore, ExtendedQuestion } from '@/stores/quizStore';

interface GeneralQuizProps {
  question: ExtendedQuestion;
  onNext?: () => void;
}

export default function GeneralQuiz({ question, onNext }: GeneralQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const { mutate: checkAnswer } = useCheckQuestionAnswer();
  const { setQuestionIsCorrect } = useQuizStore();

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer);

    checkAnswer(
      { questionId: question.questionId, answer: `${answer}` },
      {
        onSuccess: (response) => {
          const correct = response.data;

          setQuestionIsCorrect(question.questionId, correct);
        },
        onError: () => {
          setQuestionIsCorrect(question.questionId, false);
        },
      },
    );
  };

  return (
    <div className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Question</span>
        </div>
        <CardTitle className="text-xl font-medium">
          {question.question}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {question.examples.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = isSelected && question.isCorrect;
          const isWrongAnswer = isSelected && !question.isCorrect;

          return (
            <Button
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => handleAnswerSelect(index)}
              // disabled={question.isCorrect !== null}
              className={cn(
                'w-full justify-start text-left h-auto p-4 text-base font-normal',
                isCorrectAnswer &&
                  'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700',
                isWrongAnswer && 'bg-red-500 text-white hover:bg-red-600',
                !isSelected && 'hover:bg-accent',
              )}
              variant="outline"
            >
              {option}
            </Button>
          );
        })}

        {question.isCorrect !== null && (
          <Button className="w-full mt-6" onClick={onNext} variant="default">
            다음 문제 풀기
          </Button>
        )}
      </CardContent>
    </div>
  );
}
