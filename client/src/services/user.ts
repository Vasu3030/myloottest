import { apiFetch, apiPost } from '../utils/apiClient';

export interface UserInfoResponse {
  id: number,
  pseudo: string,
  status: boolean,
  team: {
    id: number,
    name: string,
    totalCoins: number,
    activeUsers: number
  },
  earningsSum: number,
  percentage: number
}

// API User information by ID
export const fetchUserById = (userId: string) =>
  apiFetch(`/users/${userId}`);

// API Add coins to a user
export const addCoinsToUser = (userId: number, teamId: number, amount: number) =>
  apiPost('/coins', { userId, teamId, amount });