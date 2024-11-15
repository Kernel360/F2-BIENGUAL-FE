export interface MissionStatus {
  oneContent: boolean;
  bookmark: boolean;
  quiz: boolean;
  count: number;
}

export interface FetchMissionStatusResponse {
  code: string;
  message: string;
  data: MissionStatus;
}

export interface UpdateMissionStatusResponse {
  code: string;
  message: string;
}

export interface RecentHistories {
  date: string;
  count: number;
}

export interface FetchRecentMissionHistoryResponse {
  code: string;
  message: string;
  data: { recentHistories: RecentHistories[] };
}
