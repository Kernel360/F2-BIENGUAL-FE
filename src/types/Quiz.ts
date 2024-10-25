export interface QuestionAnswer {
  question: string;
  questionKo: string;
  answer: string;
  type: 'BLANK' | 'ORDER';
}

export interface FetchQuizResponse {
  code: string;
  message: string;
  data: {
    questionAnswer: QuestionAnswer[];
  };
}
