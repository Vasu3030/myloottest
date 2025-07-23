export interface ICreateCoinEarningResponse {
  status: number;
  error?: string;
  data?: {
    id: number;
    userId: number;
    teamId: number;
    amount: number;
    timestamp: string;
  };
}
