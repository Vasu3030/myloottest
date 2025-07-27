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
  name?: string;
  error?: string;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  totalCoins: number;
  users?: User[];
}

export interface TeamTimelineDataResponse {
  status: number;
  month: string;
  year: number;
  data: {
    day: number;
    coins: number;
  }[];
}

// API Team list
export const fetchTeams = (page = 1, pageSize = 10) =>
  apiFetch(`/teams?page=${page}&pageSize=${pageSize}`);

// API Team stats
export const fetchTeamStats = (teamId: string, page = 1, pageSize = 10) =>
  apiFetch(`/teams/${teamId}/stats?page=${page}&pageSize=${pageSize}`);

// API Team leaderboard with date filter
export const fetchTeamLeaderboard = (teamId: string, dateFilter: string, page = 1, pageSize = 10) =>
  apiFetch(`/teams/${teamId}/leaderboard?${dateFilter}&page=${page}&pageSize=${pageSize}`);

// API Team timeline data
export const fetchTeamTimeline = (teamId: string, offset: number) =>
  apiFetch(`/teams/${teamId}/timeline?offset=${offset}`);