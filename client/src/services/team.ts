import { apiFetch } from '../utils/apiClient';

export interface Team {
  id: number;
  name: string;
  totalCoins: number;
  activeUsers: number;
}

export interface User {
  userId: number;
  pseudo: string;
  amount: number;
  percentage: number;
}

export interface TeamsListResponse {
  status: number;
  error?: string;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  teams: Team[];
}

export interface TeamStatsResponse {
  status: number;
  error?: string;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  totalCoins: number;
  users?: User[];
}

export interface TeamInfoResponse {
  totalCoins: number;
  status: boolean;
  error?: string;
  name: string;
  users?: {
    id: number,
    pseudo: string
  }[];
}

// Fetch teams list with pagination
export const fetchTeams = (page = 1, pageSize = 10) =>
  apiFetch(`/teams?page=${page}&pageSize=${pageSize}`);

// Fetch team stats with pagination
export const fetchTeamById = (teamId: string) =>
  apiFetch(`/teams/${teamId}`);

// Fetch team stats with pagination
export const fetchTeamStats = (teamId: string, page = 1, pageSize = 10) =>
  apiFetch(`/teams/${teamId}/stats?page=${page}&pageSize=${pageSize}`);

// Fetch team leaderboard with optional date filter
export const fetchTeamLeaderboard = (teamId: string, dateFilter: string, page = 1, pageSize = 10) =>
  apiFetch(`/teams/${teamId}/leaderboard?${dateFilter}&page=${page}&pageSize=${pageSize}`);