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


export const fetchTeams = (page = 1, pageSize = 10) =>
  apiFetch(`/teams?page=${page}&pageSize=${pageSize}`);

export const fetchTeamById = (teamId: string) =>
  apiFetch(`/teams/${teamId}`);

export const fetchTeamStats = (teamId: string, page = 1, pageSize = 10) =>
  apiFetch(`/teams/${teamId}/stats?page=${page}&pageSize=${pageSize}`);

export const fetchTeamLeaderboard = (teamId: string, from: string, to: string, page = 1, pageSize = 10) =>
  apiFetch(`/teams/${teamId}/leaderboard?from=${from}&to=${to}&page=${page}&pageSize=${pageSize}`);