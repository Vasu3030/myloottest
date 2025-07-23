export interface ITeamStatsResponse {
  status: number;
  error?: string;
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
  totalCoins?: number;
  users?: {
    userId: number;
    pseudo: string;
    amount: number;
    percentage: number;
  }[];
}

export interface ITeamsListResponse {
  status: number;
  error?: string;
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
  teams?: {
    id: number;
    name: string;
    totalCoins: number;
    activeUsers: number;
  }[];
}

