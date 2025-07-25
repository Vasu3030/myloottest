import { useEffect, useState } from 'react';
import { fetchTeamById, fetchTeams, fetchTeamStats, type TeamsListResponse, type TeamStatsResponse, type TeamInfoResponse, fetchTeamLeaderboard } from '../services/team';

// Custom hook to fetch teams list with pagination
export const getTeams = (initialPage = 1, initialPageSize = 10) => {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [data, setData] = useState<TeamsListResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchTeams(page, pageSize)
            .then(setData)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [page, pageSize]);

   return { data, page, setPage, setPageSize, loading, error };
};

// Custom hook to fetch team stats with pagination
export const getTeamStats = (teamId: string, initialPage = 1, initialPageSize = 10) => {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [data, setData] = useState<TeamStatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchTeamStats(teamId, page, pageSize)
            .then(setData)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [page, pageSize]);

   return { data, page, setPage, setPageSize, loading, error };
};

// Custom hook to fetch team leaderboard with date filter
export const getTeamLeaderboard = (teamId: string, dateFilter: string, initialPage = 1, initialPageSize = 10
) => {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [data, setData] = useState<TeamStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTeamLeaderboard(teamId, dateFilter, page, pageSize)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [teamId, dateFilter, page, pageSize]);

  return { data, page, setPage, setPageSize, loading, error };
};


// Custom hook to fetch team information by ID
export const getTeamInfo = (teamId: string) => {
    const [teamInfo, setTeamInfo] = useState<TeamInfoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchTeamById(teamId)
            .then(setTeamInfo)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

   return { teamInfo, loading, error };
};