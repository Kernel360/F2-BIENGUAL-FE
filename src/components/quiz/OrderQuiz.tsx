/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { useState } from 'react';

import { useCheckQuestionAnswer } from '@/api/hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ExtendedQuestion, useQuizStore } from '@/stores/quizStore';

interface OrderQuizProps {
  question: ExtendedQuestion;
  onNext?: () => void;
}

export default function OrderQuiz({ question, onNext }: OrderQuizProps) {
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate: checkAnswer } = useCheckQuestionAnswer();
  const { setQuestionIsCorrect } = useQuizStore();

  const toast = useToast();

  // 사용자가 선택한 순서를 저장하는 함수
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

  // 정답 제출 함수
  const handleSubmit = async () => {
    if (selectedOrder.length !== 4) return;

    const userAnswer = selectedOrder.map((index) => index + 1).join(' ');

    checkAnswer(
      { questionId: question.questionId, answer: userAnswer },
      {
        onSuccess: (response) => {
          const correct = response.data;
          setIsSubmitted(true);
          setQuestionIsCorrect(question.questionId, correct);
          if (correct) toast.toast({ description: '5 포인트 획득!' });
        },
        onError: () => {
          setIsSubmitted(true);

          setQuestionIsCorrect(question.questionId, false);
        },
      },
    );
  };

  return (
    <div className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">2/5 Questions</span>
        </div>
        <CardTitle className="text-xl font-medium">
          {question.question}
        </CardTitle>
      </CardHeader>

      {/* 사용자 선택 순서를 보여주는 UI */}
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

      {/* 문제 선택 옵션 */}
      <div className="flex flex-col gap-2 px-4">
        {question.examples.map((option, index) => (
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
                question.isCorrect &&
                selectedOrder[index] === index &&
                'bg-green-500 text-white',
              isSubmitted && !question.isCorrect && 'bg-red-100 border-red-300',
              'relative overflow-hidden',
            )}
          >
            {option}
          </div>
        ))}

        {/* 제출 버튼 또는 다음 문제 버튼 */}
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

        {/* 정답 여부 표시 */}
        {isSubmitted && (
          <div
            className={cn(
              'text-center font-bold mt-4',
              question.isCorrect ? 'text-green-600' : 'text-red-600',
            )}
          >
            {question.isCorrect ? '정답입니다!' : '오답입니다!'}
          </div>
        )}
      </div>
    </div>
  );
}
