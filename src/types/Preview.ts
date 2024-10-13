export interface Preview {
  contentId: number;
  title: string;
  category: string;
  thumbnailUrl: string;
  preScripts: string;
  hits: number;
}

export interface ReadingPreviewResponse {
  code: string;
  message: string;
  data: { readingPreview: Preview[] };
}

export interface ListeningPreviewResponse {
  code: string;
  message: string;
  data: { listeningPreview: Preview[] };
}

export type ContentsResponse = {
  code: string;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totlaPages: number;
    totlaElements: number;
    contents: Preview[];
  };
};
