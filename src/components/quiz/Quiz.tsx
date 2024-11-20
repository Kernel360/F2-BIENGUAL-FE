import React from 'react';

import { QuestionState, DomainEvent } from '@/lib/quizReducer';

import GeneralQuiz from './GeneralQuiz';
import OrderQuiz from './OrderQuiz';

interface QuizProps {
  question: QuestionState;
  dispatch: React.Dispatch<DomainEvent>;
  onNext?: () => void;
}

export default function Quiz({ question, dispatch, onNext }: QuizProps) {
  return (
    <div className="w-full">
      {question.type === 'ORDER' ? (
        <OrderQuiz question={question} dispatch={dispatch} onNext={onNext} />
      ) : (
        <GeneralQuiz question={question} dispatch={dispatch} onNext={onNext} />
      )}
    </div>
  );
}
