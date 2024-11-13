export interface QuestionAnswer {
  question: string;
  questionId: string;
  examples: string[];
  type: 'MATCH' | 'WORD' | 'BLANK' | 'ORDER';
}

export interface FetchQuizResponse {
  code: string;
  message: string;
  data: {
    questionAnswer: QuestionAnswer[];
  };
}

export interface CheckQuizAnswerResponse {
  code: string;
  message: string;
  data: boolean;
}

export interface CheckAnswerRequest {
  questionId: string;
  answer: string;
}
