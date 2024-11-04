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
