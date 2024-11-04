// src/types/Scrap.ts
export interface ScrapListItem {
  scrapId: number;
  contentId: number;
  title: string;
  createdAt: string;
  preScripts: string;
  thumbnailUrl: string;
  contentType: 'READING' | 'LISTENING';
}

export interface FetchScrapResponse {
  code: string;
  message: string;
  data: {
    scrapList: ScrapListItem[];
  };
}

export interface CreateScrapResponse {
  code: string;
  message: string;
  data: {
    contentId: number;
  };
}

export interface DeleteScrapResponse {
  code: string;
  message: string;
}
