export interface CreateContentsRequest {
  contentType: 'LISTENING';
  url: string;
}

export interface CreateContentsResponse {
  code: 'string';
  message: 'string';
  data: {
    scriptId: 'string';
    contentId: number;
  };
}
