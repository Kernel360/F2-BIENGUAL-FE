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

    // TODO(@smosco): 현재 end_quiz가 retry_quiz의 역할을 하고 있음
    case 'end_quiz': {
      if (prevState.questions.filter((q) => q.status === 'ready').length > 0) {
        return prevState;
      }

      const filteredQuestions = prevState.questions.filter(
        (q) => q.status === 'wrong',
      );

      return {
        questions: filteredQuestions.map((q) => ({ ...q, status: 'ready' })),
      };
    }

    case 'retry_quiz': {
      return prevState;
    }
  }
};
