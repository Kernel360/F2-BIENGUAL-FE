/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { useState } from 'react';

import {
  useFetchMissionStatus,
  useUpdateMissionStatus,
} from '@/api/hooks/useMission';
import { useCheckQuestionAnswer } from '@/api/hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { QuestionState, DomainEvent } from '@/lib/quizReducer';
import { cn } from '@/lib/utils';

interface OrderQuizProps {
  question: QuestionState;
  dispatch: React.Dispatch<DomainEvent>;
  onNext?: () => void;
}

export default function OrderQuiz({
  question,
  dispatch,
  onNext,
}: OrderQuizProps) {
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);

  const { mutate: checkAnswer } = useCheckQuestionAnswer();

  const { data: missionStatus } = useFetchMissionStatus();
  const { mutate: updateMissionStatus } = useUpdateMissionStatus();

  const toast = useToast();

  const handleSubmitAnswer = (questionId: string, answer: string) => {
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

  // 사용자가 선택한 순서를 저장하는 함수
  const handleSelect = (index: number) => {
    if (question.status !== 'ready') return;

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

    const userAnswer = selectedOrder.join(' ');

    handleSubmitAnswer(question.questionId, userAnswer);

    checkAnswer(
      { questionId: question.questionId, answer: userAnswer },
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

  const handleNext = () => {
    if (onNext) onNext();
    // 다음 문제 버튼 클릭하면 순서 초기화
    setSelectedOrder([]);
  };

  return (
    <div className="w-full">
      <CardHeader className="space-y-4">
        <CardTitle className="text-lg font-medium">
          {question.question}
        </CardTitle>
      </CardHeader>

      {/* 사용자 선택 순서를 보여주는 UI */}
      <div className="flex justify-center space-x-4 mb-6">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center text-xl',
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
              'w-full justify-start text-left h-auto p-4 rounded-sm cursor-pointer break-words whitespace-normal',
              question.status === 'ready' && 'hover:bg-gray-100',
              selectedOrder.includes(index) &&
                'bg-primary/10 border-primary text-black',
              question.status !== 'ready' &&
                question.status === 'correct' &&
                selectedOrder[index] === index &&
                'bg-green-500 text-white',
              question.status !== 'ready' &&
                question.status === 'wrong' &&
                'bg-red-100 border-red-300',
              'relative overflow-hidden',
            )}
          >
            {option}
          </div>
        ))}

        {/* 제출 버튼 또는 다음 문제 버튼 */}
        {question.status === 'ready' ? (
          <Button
            className="w-full mt-6"
            onClick={handleSubmit}
            disabled={selectedOrder.length !== 4}
          >
            제출
          </Button>
        ) : (
          <Button className="w-full mt-6" onClick={handleNext}>
            다음 문제
          </Button>
        )}

        {/* 정답 여부 표시 */}
        {question.status !== 'ready' && (
          <div
            className={cn(
              'text-center font-bold mt-2',
              question.status === 'correct' ? 'text-green-600' : 'text-red-600',
            )}
          >
            {question.status === 'correct' ? '정답입니다!' : '오답입니다!'}
          </div>
        )}
      </div>
    </div>
  );
}
