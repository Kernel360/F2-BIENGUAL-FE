/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { useState } from 'react';

import { useCheckQuestionAnswer } from '@/api/hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface OrderQuizProps {
  question: string;
  questionId: string;
  examples: string[];
  onNext?: () => void;
}

export default function OrderQuiz({
  question,
  questionId,
  examples,
  onNext,
}: OrderQuizProps) {
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { mutate: checkAnswer } = useCheckQuestionAnswer();

  const handleSelect = (index: number) => {
    if (isSubmitted) return;

    setSelectedOrder((prev) => {
      const newOrder = [...prev];
      const existingIndex = newOrder.indexOf(index);

      if (existingIndex !== -1) {
        newOrder.splice(existingIndex, 1);
      } else if (newOrder.length < 4) {
        newOrder.push(index);
      }

      return newOrder;
    });
  };

  const handleSubmit = async () => {
    if (selectedOrder.length !== 4) return;

    const userAnswer = selectedOrder.map((index) => index + 1).join(' ');

    checkAnswer(
      { questionId, answer: userAnswer },
      {
        onSuccess: (response) => {
          setIsCorrect(response.data);
          setIsSubmitted(true);
        },
        onError: () => {
          setIsCorrect(false);
          setIsSubmitted(true);
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
      <div className="flex flex-col gap-2 px-4">
        <div className="flex justify-center space-x-4 mb-6">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold',
                selectedOrder[index] !== undefined
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground',
              )}
            >
              {selectedOrder[index] !== undefined
                ? selectedOrder[index] + 1
                : '-'}
            </div>
          ))}
        </div>
        {examples.map((item, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={() => handleSelect(index)}
            className={cn(
              'w-full justify-start text-left h-auto p-4 text-base font-normal rounded-sm cursor-pointer',
              !isSubmitted && 'hover:bg-gray-100',
              selectedOrder.includes(index) &&
                'bg-primary/10 border-primary text-black',
              isSubmitted &&
                isCorrect &&
                selectedOrder[index] === index &&
                'bg-green-500 text-white',
              isSubmitted && !isCorrect && 'bg-red-100 border-red-300',
              'relative overflow-hidden',
            )}
          >
            {item}
            {/* {selectedOrder.includes(index) && (
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {selectedOrder.indexOf(index) + 1}
              </span>
            )} */}
          </div>
        ))}
        {!isSubmitted ? (
          <Button
            className="w-full mt-6"
            onClick={handleSubmit}
            disabled={selectedOrder.length !== 4}
          >
            제출
          </Button>
        ) : (
          <Button className="w-full mt-6" onClick={onNext}>
            다음 문제
          </Button>
        )}
        {isSubmitted && (
          <div
            className={cn(
              'text-center font-bold',
              isCorrect ? 'text-green-600' : 'text-red-600',
            )}
          >
            {isCorrect ? '정답' : '오답'}
          </div>
        )}
      </div>
    </div>
  );
}
