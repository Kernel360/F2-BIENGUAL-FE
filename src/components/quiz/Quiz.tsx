import React from 'react';

import { QuestionAnswer } from '@/types/Quiz';

import GeneralQuiz from './GeneralQuiz';
import OrderQuiz from './OrderQuiz';

interface QuizProps {
  data: QuestionAnswer;
  onNext?: () => void;
}

export default function Quiz({ data, onNext }: QuizProps) {
  return (
    <div>
      {data.type === 'ORDER' ? (
        <OrderQuiz
          questionId={data.questionId}
          question={data.question}
          examples={data.examples}
          onNext={onNext}
        />
      ) : (
        <GeneralQuiz
          questionId={data.questionId}
          question={data.question}
          examples={data.examples}
          onNext={onNext}
        />
      )}
    </div>
  );
}
