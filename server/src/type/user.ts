export interface ITeamInfo {
  id: number;
  name: string;
  totalCoins: number;
  activeUsers: number;
}

export interface IUserWithTeam {
  id: number;
  pseudo: string;
  status: boolean;
  team: ITeamInfo;
}

export interface IUserWithEarnings extends IUserWithTeam {
  earningsSum: number;
  percentage: number;
}

export interface IApiError {
  status: number;
  error: string;
}
