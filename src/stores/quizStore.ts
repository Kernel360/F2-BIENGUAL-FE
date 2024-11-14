/* eslint-disable no-param-reassign */
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { QuestionAnswer } from '@/types/Quiz';

export type ExtendedQuestion = QuestionAnswer & { isCorrect: boolean };

type QuestionState = {
  contentId: number | null;
  questions: ExtendedQuestion[];
};

type QuestionActions = {
  setContentQuestions: (contentId: number, questions: QuestionAnswer[]) => void;
  setQuestionIsCorrect: (questionId: string, isCorrect: boolean) => void;
  reset: () => void;
};

const initialState: QuestionState = {
  contentId: null,
  questions: [],
};

export const useQuizStore = create<QuestionState & QuestionActions>()(
  immer((set) => ({
    ...initialState,
    setContentQuestions: (contentId: number, questions: QuestionAnswer[]) => {
      set((state) => {
        if (state.contentId !== contentId || state.questions.length === 0) {
          state.contentId = contentId;
          // NOTE(smosco): temporary code for slicing questions
          state.questions = questions.slice(0, 4).map((question) => {
            return { ...question, isCorrect: false };
          });
        }
      });
    },
    setQuestionIsCorrect: (questionId: string, isCorrect: boolean) => {
      set((state) => {
        const targetQuestion = state.questions.find(
          (question) => question.questionId === questionId,
        );
        if (targetQuestion) {
          targetQuestion.isCorrect = isCorrect;
        }
      });
    },
    reset: () => {
      set(initialState);
    },
  })),
);
