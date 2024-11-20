/* eslint-disable consistent-return */
/* eslint-disable default-case */
import { Reducer } from 'react';

import { QuestionAnswer } from '@/types/Quiz';

export type DomainEvent =
  | {
      type: 'download_quiz';
      questions: QuestionAnswer[];
    }
  | {
      type: 'submit_answer';
      questionId: string;
      answer: number | string;
    }
  | {
      type: 'response_question_result';
      questionId: string;
      ok: boolean;
    }
  | {
      type: 'end_quiz';
    }
  | {
      type: 'retry_quiz';
    };

export type QuestionState = QuestionAnswer & {
  status: 'ready' | 'submitting' | 'correct' | 'wrong';
};

export type State = {
  questions: QuestionState[];
};

export const quizReducer: Reducer<State, DomainEvent> = (prevState, event) => {
  switch (event.type) {
    case 'download_quiz': {
      return {
        questions: event.questions.map((question) => ({
          ...question,
          status: 'ready',
        })),
      };
    }

    case 'submit_answer': {
      return {
        questions: prevState.questions.map((question) => {
          if (question.questionId === event.questionId) {
            return {
              ...question,
              status: 'submitting',
            };
          }

          return question;
        }),
      };
    }

    case 'response_question_result': {
      return {
        questions: prevState.questions.map((question) => {
          if (question.questionId === event.questionId) {
            return {
              ...question,
              status: event.ok ? 'correct' : 'wrong',
            };
          }
          return question;
        }),
      };
    }

    case 'end_quiz': {
      if (prevState.questions.filter((q) => q.status === 'ready').length > 0) {
        return prevState;
      }

      return {
        questions: prevState.questions.filter((q) => q.status === 'wrong'),
      };
    }

    case 'retry_quiz': {
      return prevState;
    }
  }
};
