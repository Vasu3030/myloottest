export interface ITeamStatsResponse {
  status: number;
  name?: string;
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

export interface ITeamInfoResponse {
  status: number;
  error?: string;
  teams?: {
    id: number;
    name: string;
    totalCoins: number;
    activeUsers: number;
  }[];
}

export interface ITeamWithUsers {
  id?: number;
  name?: string;
  status?: boolean;
  users?: {
    id: number;
    pseudo: string;
  }[];
  totalCoins?: number;
}