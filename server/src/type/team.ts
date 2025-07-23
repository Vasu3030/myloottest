export interface ITeamStatsResponse {
  status: number;
  totalCoins?: number;
  users?: {
    userId: number;
    pseudo: string;
    amount: number;
    percentage: number;
  }[];
  error?: string;
}

export interface ITeamsListResponse {
  status: number;
  error?: string;
  teams?: {
    id: number;
    name: string;
    totalCoins: number;
    activeUsers: number;
  }[];
}
