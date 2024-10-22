import { CircleCheck, CircleX } from 'lucide-react';
import React, { useState } from 'react';

import { QuestionAnswer } from '@/types/Quiz';

import { BlankQuiz } from './BlankQuiz';
import OrderQuiz from './OrderQuiz';

interface QuizProps {
  data: QuestionAnswer;
  onNext?: () => void;
}

export default function Quiz({ data, onNext }: QuizProps) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = (check: boolean) => {
    setIsCorrect(check);

    if (onNext) {
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full p-10 h-fit">
      {data.type === 'BLANK' ? (
        <BlankQuiz
          questionKo={data.questionKo}
          question={data.question}
          answer={data.answer}
          onSubmit={handleSubmit}
        />
      ) : (
        <OrderQuiz
          questionKo={data.questionKo}
          question={data.question}
          answer={data.answer}
          onSubmit={handleSubmit}
        />
      )}

      {/* 정답/오답 여부 표시 */}
      <div className="flex h-12">
        {isCorrect !== null && (
          <div className={`${isCorrect !== null ? 'visible' : 'hidden'}`}>
            {isCorrect ? (
              <div className="flex">
                <CircleCheck color="green" />
                <p className="text-green-600 font-bold ml-1">정답입니다!</p>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex">
                  <CircleX color="red" />
                  <p className="text-red-600 font-bold ml-1">오답입니다</p>
                </div>
                <p className="text-red-600 font-bold">정답 : {data.answer}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
