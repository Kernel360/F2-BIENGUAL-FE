import React from 'react';

// import { ExtendedQuestion } from '@/stores/quizStore';
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
    <div>
      {question.type === 'ORDER' ? (
        <OrderQuiz question={question} dispatch={dispatch} onNext={onNext} />
      ) : (
        <GeneralQuiz question={question} dispatch={dispatch} onNext={onNext} />
      )}
    </div>
  );
}
