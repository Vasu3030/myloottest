import { useEffect, useState } from 'react';
import { fetchTeams, fetchTeamStats, type TeamsListResponse, type TeamStatsResponse } from '../services/team';

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
