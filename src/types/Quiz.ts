export interface QuestionAnswer {
  questionId: string;
  question: string;
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

export interface ViewHintResponse {
  code: string;
  message: string;
  data: {
    hint: string;
  };
}
