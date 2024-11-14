import React from 'react';

import { ExtendedQuestion } from '@/stores/quizStore';

import GeneralQuiz from './GeneralQuiz';
import OrderQuiz from './OrderQuiz';

interface QuizProps {
  data: ExtendedQuestion;
  onNext?: () => void;
}

export default function Quiz({ data, onNext }: QuizProps) {
  return (
    <div>
      {data.type === 'ORDER' ? (
        <OrderQuiz question={data} onNext={onNext} />
      ) : (
        <GeneralQuiz question={data} onNext={onNext} />
      )}
    </div>
  );
}
