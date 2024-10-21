export interface AdminCreateContentsRequest {
  contentType: 'LISTENING';
  url: string;
}

export interface AdminCreateContentsResponse {
  code: 'string';
  message: 'string';
  data: {
    scriptId: 'string';
    contentId: number;
  };
}
