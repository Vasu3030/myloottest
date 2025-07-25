import { Request, Response } from 'express';
import { fetchTeamsList, fetchTeamStats, fetchTeamById } from '../services/teamServices';

// List all teams with pagination
export async function getTeamsList(req: Request, res: Response) {
    try {
        const page = Number(req.query.page)
        const pageSize = Number(req.query.pageSize)

        // Call the service to fetch teams list with pagination
        const data = await fetchTeamsList(page, pageSize);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Internal server error' });
    }
}

// Get team infos, name, total coins.
export async function getTeamInfo(req: Request, res: Response) {
    try {
        const teamId = Number(req.params.id);

        // Call the service to fetch team info
        const data = await fetchTeamById(teamId);

        // If team is not found, return 404
        if (data === null) return res.status(404).json({ status: 404, error: 'Invalid team ID' });

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Internal server error' });
    }
}

// Get team infos, name, total coins, team info.
export async function getTeamStats(req: Request, res: Response) {
    try {
        const teamId = Number(req.params.id);
        const page = Number(req.query.page)
        const pageSize = Number(req.query.pageSize)

        // Call the service to fetch team stats with pagination
        const data = await fetchTeamStats(teamId, page, pageSize);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Internal server error' });
    }
}

// Get team leaderboard with date range and pagination
export async function getTeamLeaderboard(req: Request, res: Response) {
    try {
        const teamId = Number(req.params.id);
        const page = Number(req.query.page);
        const pageSize = Number(req.query.pageSize);
        const { from, to } = (req as any).validatedDates; // récupère les dates validées

        // Call the service to fetch team stats with date range and pagination
        const data = await fetchTeamStats(teamId, page, pageSize, from, to);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Internal server error' });
    }
}
