export interface CreateContentsResponse {
  code: 'string';
  message: 'string';
  data: {
    scriptId: 'string';
    contentId: number;
  };
}

export interface CreateContentsFeedbackResponse {
  code: string;
  message: string;
}
